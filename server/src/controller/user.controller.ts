
import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { User } from '@/models/user.model'

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