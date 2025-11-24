
import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { User, UserRole } from '@/models/user.model'
import { MentoringRequest, PreferredMode, SessionType } from '@/models/mentoring-request.model'
import { Semester } from '@/models/semester.model'

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
      return
    }

    const user = await User.findById(userId).select('-passwordHash')

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Get user profile successfully',
      data: {
        user: {
          _id: user._id,
          displayName: user.displayName,
          email: user.email,
          roles: user.roles,
          status: user.status,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          sex: user.sex,
          avatarUrl: user.avatarUrl,
          student: user.student,
          tutor: user.tutor,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    })
  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}


/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
export const postProgram = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
      return
    }

    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    const activeSemester = await Semester.findOne({ status: 'ACTIVE' })
    const semesterId = activeSemester?._id

    const {
      problem,
      problemDetail,
      preferredMode,
      sessionType,
      reason,
      learningGoals
    } = req.body

    // Validate required fields
    if (!problem || !preferredMode || !sessionType) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }



    // Validate enum values
    if (!Object.values(PreferredMode).includes(preferredMode)) {
      res.status(400).json({
        success: false,
        message: 'Invalid preferred mode'
      })
      return
    }

    if (!Object.values(SessionType).includes(sessionType)) {
      res.status(400).json({
        success: false,
        message: 'Invalid session type'
      })
      return
    }

    const semester = await Semester.findById(semesterId)
    if (!semester) {
      res.status(404).json({
        success: false,
        message: 'Semester not found'
      })
      return
    }

    const mentoringRequest = await MentoringRequest.create({
      studentId: userId,
      semesterId,
      problem,
      problemDetail,
      preferredMode,
      sessionType,
      reason,
      learningGoals
    })


    res.status(201).json({
      success: true,
      message: 'Mentoring request created successfully',
      data: {
        mentoringRequest
      }
    })
  } catch (error) {
    console.error('PostProgram error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}