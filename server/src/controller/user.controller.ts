
import { Response } from 'express'
import { AuthRequest } from '@/middlewares/auth.middleware'
import { User, UserRole } from '@/models/user.model'
import { MentoringRequest, PreferredMode, SessionType } from '@/models/mentoring-request.model'
import { Semester } from '@/models/semester.model'
import { Slot, SlotStatus } from '@/models/slot.model'
import { Booking, BookingStatus } from '@/models/booking.model'
import bcrypt from 'bcrypt'

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
    console.error('UpdateUserInfor error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

/**
 * @route   POST /api/users/change-password
 * @desc    Change user password
 * @access  Private
 */
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId
    const { currentPassword, newPassword } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
      return
    }

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      })
      return
    }

    // Check if email is @hcmut.edu.vn domain
    if (user.email.endsWith('@hcmut.edu.vn')) {
      res.status(403).json({
        success: false,
        message: 'Tài khoản HCMUT không được phép đổi mật khẩu'
      })
      return
    }

    // Validate input
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới'
      })
      return
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự'
      })
      return
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      })
      return
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    user.passwordHash = newPasswordHash
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    })
  } catch (error) {
    console.error('ChangePassword error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId
    const { bookingId, reason } = req.body

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
      return
    }

    if (!bookingId) {
      res.status(400).json({ success: false, message: 'Missing bookingId' })
      return
    }

    // 1. Find booking
    const booking = await Booking.findOne({ _id: bookingId, studentId: userId })
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' })
      return
    }

    if (booking.status === BookingStatus.CANCELLED) {
      res.status(400).json({ success: false, message: 'Booking is already cancelled' })
      return
    }

    // 2. Update booking
    booking.status = BookingStatus.CANCELLED
    booking.cancellationReason = reason
    booking.cancelledAt = new Date()
    booking.cancelledBy = userId as any
    await booking.save()

    // 3. Update slot
    if (booking.slotId) {
      const slot = await Slot.findById(booking.slotId)
      if (slot) {
        slot.bookedCount = Math.max(0, slot.bookedCount - 1)
        if (slot.bookedCount < slot.capacity) {
          slot.status = SlotStatus.AVAILABLE
        }
        await slot.save()
      }
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    })

  } catch (error) {
    console.error('CancelBooking error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const bookSlot = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId
    const { slotId, studentNote } = req.body

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
      return
    }

    if (!slotId) {
      res.status(400).json({ success: false, message: 'Missing slotId' })
      return
    }

    // 1. Check slot existence and status
    const slot = await Slot.findById(slotId)
    if (!slot) {
      res.status(404).json({ success: false, message: 'Slot not found' })
      return
    }

    if (slot.status !== SlotStatus.AVAILABLE) {
      res.status(400).json({ success: false, message: 'Slot is not available' })
      return
    }

    if (slot.bookedCount >= slot.capacity) {
      res.status(400).json({ success: false, message: 'Slot is full' })
      return
    }

    // 2. Check if user already booked this slot
    const existingBooking = await Booking.findOne({
      studentId: userId,
      slotId: slotId,
      status: { $ne: BookingStatus.CANCELLED }
    })

    if (existingBooking) {
      res.status(400).json({ success: false, message: 'You have already booked this slot' })
      return
    }

    // 3. Create booking
    const booking = await Booking.create({
      studentId: userId,
      tutorId: slot.tutorId,
      subjectId: slot.subjectId,
      semesterId: slot.semesterId,
      slotId: slot._id,
      status: BookingStatus.CONFIRMED, // Auto confirm for now
      studentNote,
      bookedAt: new Date()
    })

    // 4. Update slot
    slot.bookedCount += 1
    if (slot.bookedCount >= slot.capacity) {
      slot.status = SlotStatus.FULL
    }
    await slot.save()

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    })

  } catch (error) {
    console.error('BookSlot error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
      return
    }

    const bookings = await Booking.find({ studentId: userId })
      .populate('tutorId', 'displayName email avatarUrl')
      .populate('subjectId', 'name code')
      .populate('slotId')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: bookings
    })
  } catch (error) {
    console.error('GetMyBookings error:', error)
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

    const {
      semesterId,
      problem,
      problemDetail,
      preferredMode,
      sessionType,
      reason,
      learningGoals
    } = req.body

    // Validate required fields
    if (!semesterId || !problem || !preferredMode || !sessionType) {
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

export const updateUserInfor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Không Có User Hợp Lệ'
      })
      return
    }

    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      })
      return
    }

    const { phone, avatarUrl, tutor, student } = req.body

    // Cập nhật các trường chung được phép
    if (phone !== undefined) user.phone = phone
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl

    // Cập nhật thông tin student - chỉ cho phép chỉnh year
    if (student !== undefined && user.roles.includes(UserRole.STUDENT)) {
      user.student = {
        faculty: user.student?.faculty ?? 'Unknown',
        class: user.student?.class ?? 'Unknown',
        year: student.year ?? user.student?.year ?? 1,
        gpa: user.student?.gpa ?? 0
      }
    }

    // Cập nhật thông tin tutor
    if (tutor !== undefined && user.roles.includes(UserRole.TUTOR)) {
      user.tutor = {
        title: tutor.title ?? user.tutor?.title ?? 'Tutor',
        department: tutor.department ?? user.tutor?.department ?? 'General',
        bio: tutor.bio ?? user.tutor?.bio ?? ''
      }
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công',
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
          updatedAt: user.updatedAt
        }
      }
    })
  } catch (error) {
    console.error('UpdateUserInfor error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}