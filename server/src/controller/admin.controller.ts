import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { Semester, User, Subject, SemesterStatus } from '@/models'

export const getAllSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesterId = req.params.id

    // Kiểm tra semester có tồn tại không
    const semester = await Semester.findById(semesterId)
    if (!semester) {
      res.status(404).json({
        success: false,
        message: 'Semester not found'
      })
      return
    }

    // Lấy tất cả subjects của semester này và populate thông tin semester
    const subjects = await Subject.find({ semesterId })
      .populate('semesterId', 'code name academicYear semesterNumber startDate endDate status')
      .populate('tutorIds', 'email fullName role')
      .sort({ code: 1 })

    res.status(200).json({
      success: true,
      message: 'Subjects retrieved successfully',
      data: {
        semester: semester,
        subjects: subjects,
        total: subjects.length
      }
    })

  }
  catch (error) {
    console.error('GetAllSubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get All Subject'
    })
  }
}

export const createSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesterId = req.params.id
    const { code, name, description } = req.body
    if (!code || !name) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }
    const semester = await Semester.findById(semesterId)
    if (!semester && semester.status !== 'ACTIVE') {
      res.status(404).json({
        success: false,
        message: 'Semester not found'
      })
    }

    const newSubject = await Subject.create({
      semesterId,
      code,
      name,
      description
    })
    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: newSubject
    })

  }
  catch (error) {
    console.error('CreateSubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

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

export const getAllUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const Users = await User.find().select('-passwordHash')
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: Users
    })
  }

  catch (error) {
    console.error('GetAllUser error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get All User'
    })
  }

}

export const updateUserStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const { status } = req.body

    // Validate status
    if (!status || !['ACTIVE', 'BANNED'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status. Must be ACTIVE or BANNED'
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

    user.status = status
    await user.save()

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: {
        userId: user._id,
        status: user.status
      }
    })
  }

  catch (error) {
    console.error('UpdateUserStatus error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Update User Status'
    })
  }

}

export const updateSemesterStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesterId = req.params.id
    const { status } = req.body

    // Validate status
    if (!status || !Object.values(SemesterStatus).includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status'
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

    // Logic: If opening a semester (setting to ACTIVE), check if all other semesters are closed
    if (status === SemesterStatus.ACTIVE) {
      const activeSemester = await Semester.findOne({
        status: SemesterStatus.ACTIVE,
        _id: { $ne: semesterId }
      })

      if (activeSemester) {
        res.status(400).json({
          success: false,
          message: 'Hiện Đang Có Kỳ Học Mở. Vui Lòng Đóng Kỳ Học Này Trước Khi Mở Kỳ Học Khác.'
        })
        return
      }
    }

    semester.status = status
    await semester.save()

    res.status(200).json({
      success: true,
      message: 'Đã Mở Kỳ Thành Công',
      data: {
        semesterId: semester._id,
        status: semester.status
      }
    })
  }

  catch (error) {
    console.error('UpdateSemesterStatus error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Update Semester Status'
    })
  }
}

export const getAllSemester = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesters = await Semester.find()
    res.status(200).json({
      success: true,
      message: 'Semesters retrieved successfully',
      data: semesters
    })
  }

  catch (error) {
    console.error('GetAllSemester error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get All Semester'
    })
  }
}
