import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { Semester, User, Subject, SemesterStatus, UserRole, Slot, MentoringRequest } from '@/models'

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
      .populate('tutorIds', 'email displayName role')
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

export const deleteSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id

    const subject = await Subject.findById(subjectId)
    if (!subject) {
      res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
      return
    }

    await Subject.findByIdAndDelete(subjectId)

    res.status(200).json({
      success: true,
      message: 'Subject deleted successfully'
    })
  } catch (error) {
    console.error('DeleteSubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteSemester = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesterId = req.params.id

    const semester = await Semester.findById(semesterId)
    if (!semester) {
      res.status(404).json({
        success: false,
        message: 'Semester not found'
      })
      return
    }

    // Delete all subjects associated with this semester
    await Subject.deleteMany({ semesterId })

    // Delete the semester
    await Semester.findByIdAndDelete(semesterId)

    res.status(200).json({
      success: true,
      message: 'Semester deleted successfully'
    })
  } catch (error) {
    console.error('DeleteSemester error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getActiveSemesterRequests = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Find active semester
    const activeSemester = await Semester.findOne({ status: SemesterStatus.ACTIVE })
    if (!activeSemester) {
      res.status(404).json({
        success: false,
        message: 'No active semester found'
      })
      return
    }

    // Get all mentoring requests for active semester
    const requests = await MentoringRequest.find({ semesterId: activeSemester._id })
      .populate('studentId', 'email displayName student')
      .populate('semesterId', 'code name')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: 'Mentoring requests retrieved successfully',
      data: {
        semester: activeSemester,
        requests: requests,
        total: requests.length
      }
    })
  } catch (error) {
    console.error('GetActiveSemesterRequests error:', error)
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

export const getActiveSemester = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semester = await Semester.findOne({ status: SemesterStatus.ACTIVE })
    if (!semester) {
      res.status(404).json({
        success: false,
        message: 'No active semester found'
      })
      return
    }
    res.status(200).json({
      success: true,
      message: 'Active semester retrieved successfully',
      data: semester
    })
  } catch (error) {
    console.error('GetActiveSemester error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get Active Semester'
    })
  }
}

export const getSemesterInfor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const semesterId = req.params.id
    const semester = await Semester.findById(semesterId)
    if (!semester) {
      res.status(404).json({
        success: false,
        message: 'Semester not found'
      })

      return
    }
    res.status(200).json({
      success: true,
      message: 'Semester retrieved successfully',
      data: semester
    })

  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get Semester Infor'
    })

  }

}

export const getSubjectInfor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id

    const subject = await Subject.findById(subjectId)
      .populate('semesterId', 'code name academicYear semesterNumber startDate endDate status')
      .populate('tutorIds', 'email displayName role')

    if (!subject) {
      res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Subject retrieved successfully',
      data: subject
    })

  } catch (error) {
    console.error('GetSubjectInfor error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not Get Subject Infor'
    })
  }
}

export const assignTutorToSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id
    const { tutorId } = req.body

    // Validate input
    if (!tutorId) {
      res.status(400).json({
        success: false,
        message: 'Tutor ID is required'
      })
      return
    }

    // Kiểm tra subject có tồn tại không
    const subject = await Subject.findById(subjectId)
    if (!subject) {
      res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
      return
    }

    // Kiểm tra user có tồn tại và có role là TUTOR không
    const tutor = await User.findById(tutorId)
    if (!tutor) {
      res.status(404).json({
        success: false,
        message: 'Tutor not found'
      })
      return
    }

    if (!tutor.roles.includes(UserRole.TUTOR)) {
      res.status(400).json({
        success: false,
        message: 'User is not a tutor'
      })
      return
    }

    if (subject.tutorIds.includes(tutorId)) {
      res.status(400).json({
        success: false,
        message: 'Giảng viên đã được gán cho môn học này'
      })
      return
    }

    subject.tutorIds.push(tutorId)
    await subject.save()

    const updatedSubject = await Subject.findById(subjectId)
      .populate('semesterId', 'code name academicYear semesterNumber')
      .populate('tutorIds', 'email displayName role')

    res.status(200).json({
      success: true,
      message: 'Thêm giảng viên thành công',
      data: updatedSubject
    })

  } catch (error) {
    console.error('AssignTutorToSubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not assign tutor to subject'
    })
  }
}

export const removeTutorFromSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id
    const { tutorId } = req.body

    // Validate input
    if (!tutorId) {
      res.status(400).json({
        success: false,
        message: 'Tutor ID is required'
      })
      return
    }

    // Kiểm tra subject có tồn tại không
    const subject = await Subject.findById(subjectId)
    if (!subject) {
      res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
      return
    }

    // Kiểm tra tutor có trong danh sách không
    const tutorIndex = subject.tutorIds.findIndex(id => id.toString() === tutorId)
    if (tutorIndex === -1) {
      res.status(400).json({
        success: false,
        message: 'Giảng viên không có trong môn học này'
      })
      return
    }

    // Xóa tutor khỏi danh sách
    subject.tutorIds.splice(tutorIndex, 1)
    await subject.save()

    // Populate lại thông tin để trả về
    const updatedSubject = await Subject.findById(subjectId)
      .populate('semesterId', 'code name academicYear semesterNumber')
      .populate('tutorIds', 'email displayName role')

    res.status(200).json({
      success: true,
      message: 'Xóa giảng viên thành công',
      data: updatedSubject
    })

  } catch (error) {
    console.error('RemoveTutorFromSubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not remove tutor from subject'
    })
  }
}

export const getTutorsBySubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id

    const subject = await Subject.findById(subjectId)
      .populate({
        path: 'tutorIds',
        select: 'displayName email avatarUrl roles tutor',
      })

    if (!subject) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy môn học'
      })
      return
    }

    // Map dữ liệu tutors
    const tutors = subject.tutorIds.map((tutor: any) => ({
      _id: tutor._id,
      displayName: tutor.displayName,
      email: tutor.email,
      avatarUrl: tutor.avatarUrl,
      title: tutor.tutor?.title || 'Giảng viên',
      department: tutor.tutor?.department || subject.department,
      bio: tutor.tutor?.bio || ''
    }))

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách giảng viên thành công',
      data: {
        subject: {
          _id: subject._id,
          code: subject.code,
          name: subject.name,
          department: subject.department
        },
        tutors: tutors,
        total: tutors.length
      }
    })

  } catch (error) {
    console.error('GetTutorsBySubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Can not get tutors by subject'
    })
  }
}

export const getTutorSlotsBySubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { tutorId, subjectId } = req.query

    if (!tutorId || !subjectId) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: tutorId and subjectId'
      })
      return
    }

    // Lấy semester đang active
    const activeSemester = await Semester.findOne({ status: SemesterStatus.ACTIVE })
    if (!activeSemester) {
      res.status(200).json({
        success: true,
        message: 'No active semester found',
        data: []
      })
      return
    }

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const slots = await Slot.find({
      tutorId,
      subjectId,
      semesterId: activeSemester._id,
      status: 'AVAILABLE',
      date: { $gte: currentDate }
    })
      .sort({ date: 1, startTime: 1 })
      .populate('tutorId', 'displayName email avatar')
      .populate('subjectId', 'name code')

    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const slotsWithDay = slots.map((slot) => ({
      ...slot.toObject(),
      dayOfWeek: days[new Date(slot.date).getDay()]
    }))

    res.status(200).json({
      success: true,
      message: 'Slots retrieved successfully',
      data: slotsWithDay
    })

  } catch (error) {
    console.error('GetTutorSlotsBySubject error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}


