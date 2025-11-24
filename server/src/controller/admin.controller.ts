import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { error } from 'console'
import { success } from 'zod'
import { Semester, User } from '@/models'

export const createSemester = async (req: AuthRequest, res: Response): Promise<void> => {
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
      res.status(400).json({
        success: false,
        message: 'Missing user data'
      })
      return
    }

    const { code, name, academicYear, semesterNumber, startDate, endDate, startDateSurvey, endDateSurvey } =
      req.body

    if (
      !code ||
      !name ||
      !academicYear ||
      !semesterNumber ||
      !startDate ||
      !endDate ||
      !startDateSurvey ||
      !endDateSurvey
    ) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }

    const semesterRequest = await Semester.create({
      code,
      name,
      academicYear,
      semesterNumber,
      startDate,
      endDate,
      startDateSurvey,
      endDateSurvey
    })

    res.status(201).json({
      success: true,
      message: 'Semester created successfully',
      data: semesterRequest
    })


  }
  catch (error) {
    console.error('CreateSemester error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }


}