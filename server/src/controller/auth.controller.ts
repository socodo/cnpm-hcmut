import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Request, Response } from 'express'
import { User, UserRole } from '@/models/user.model'
import { Session } from '@/models/session.model'
import { sendAccountCredentials } from '@/services/email.service'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-key'
const REFRESH_TOKEN_EXPIRES_DAYS = 7

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 * @access  Public
 */
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      displayName,
      email,
      password,
      phone,
      dateOfBirth,
      roles,
      avatarUrl,
      student,
      tutor,
      sex
    } = req.body

    // 1. Validate input
    if (!displayName || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide displayName, email and password'
      })
      return
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
      return
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // 4. Create new user
    const newUser = await User.create({
      displayName,
      email,
      passwordHash,
      phone,
      dateOfBirth,
      roles,
      avatarUrl,
      student,
      tutor,
      sex
    })

    // 5. Generate tokens
    const tokenPayload = {
      userId: newUser._id.toString(),
      email: newUser.email,
      roles: newUser.roles
    }

    const accessToken = jwt.sign(tokenPayload, JWT_ACCESS_SECRET, {
      expiresIn: 60 * 60
    })


    const refreshToken = crypto.randomBytes(64).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS)

    // 6. Save refresh token to session
    await Session.create({
      userId: newUser._id,
      refreshToken,
      expiresAt
    })

    // 7. Set refresh token cookie (session cookie - xóa khi đóng browser)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    // 8. Send email with credentials
    try {
      // Chỉ gửi email nếu đã cấu hình EMAIL_USER và EMAIL_PASSWORD
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        await sendAccountCredentials(
          email,
          displayName,
          email,
          password // Gửi mật khẩu gốc (chưa hash)
        )
        console.log(`✅ Credentials email sent to ${email}`)
      } else {
        console.log('⚠️ Email not configured. Skipping credential email.')
      }
    } catch (emailError) {
      console.error('❌ Failed to send credentials email:', emailError)
      // Không throw error, vẫn tạo user thành công
    }

    // 9. Return response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          _id: newUser._id,
          displayName: newUser.displayName,
          email: newUser.email,
          roles: newUser.roles,
          status: newUser.status,
          phone: newUser.phone,
          dateOfBirth: newUser.dateOfBirth,
          avatarUrl: newUser.avatarUrl,
          student: newUser.student,
          tutor: newUser.tutor,
          createdAt: newUser.createdAt
        },
        accessToken
      }
    })
  } catch (error) {
    console.error('SignUp error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

/**
 * @route   POST /api/auth/signin
 * @desc    Sign in user
 * @access  Public
 */
export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // 1. Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
      return
    }

    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
      return
    }

    // 3. Check if account is active
    if (user.status === 'BANNED') {
      res.status(401).json({
        success: false,
        message: 'Account has been banned. Please contact support.'
      })
      return
    }

    // 4. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
      return
    }

    // 5. Generate access token
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles
    }

    const accessToken = jwt.sign(tokenPayload, JWT_ACCESS_SECRET, {
      expiresIn: 60 * 60
    })

    // 6. Check existing refresh token in cookie
    let refreshToken = req.cookies.refreshToken
    let needNewRefreshToken = true

    if (refreshToken) {
      // Check if refresh token still valid in database
      const existingSession = await Session.findOne({
        refreshToken,
        userId: user._id
      })

      if (existingSession) {
        needNewRefreshToken = false
      }
    }

    // 7. Create new refresh token if needed
    if (needNewRefreshToken) {
      refreshToken = crypto.randomBytes(64).toString('hex')
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS)

      await Session.create({
        userId: user._id,
        refreshToken,
        expiresAt
      })

      // Set new cookie (session cookie - xóa khi đóng browser)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
        // Không có maxAge → session cookie → tự động xóa khi đóng browser
      })
    }

    // 8. Return response
    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: {
        user: {
          _id: user._id,
          displayName: user.displayName,
          email: user.email,
          roles: user.roles,
          status: user.status,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
          dateOfBirth: user.dateOfBirth,
          student: user.student,
          tutor: user.tutor
        },
        accessToken
      }
    })
  } catch (error) {
    console.error('SignIn error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken
    console.log('Received refresh token:', refreshToken)

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      })
      return
    }

    console.log('Found session for refresh token:', refreshToken)

    // Find session (TTL index tự động xóa session hết hạn)
    const session = await Session.findOne({ refreshToken })

    if (!session) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      })
      return
    }

    // Get user
    const user = await User.findById(session.userId)

    if (!user || user.status === 'BANNED') {
      res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      })
      return
    }

    // Generate new tokens
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles
    }

    const newAccessToken = jwt.sign(tokenPayload, JWT_ACCESS_SECRET, {
      expiresIn: '1h'
    })



    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (refreshToken) {
      await Session.deleteOne({ refreshToken })
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    res.status(200).json({
      success: true,
      message: 'Logout successfully'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
