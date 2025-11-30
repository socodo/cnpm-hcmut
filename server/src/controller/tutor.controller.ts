import { Request, Response } from 'express'
import { Slot, SlotStatus } from '@/models/slot.model'
import { Subject } from '@/models/subject.model'
import { Semester, SemesterStatus } from '@/models/semester.model'
import { UserRole } from '@/models'

// Hàm helper để lấy thứ trong tuần từ ngày
const getDayOfWeek = (date: Date): string => {
  const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  return days[date.getDay()]
}

// Tạo slot lịch rảnh mới
export const createSlot = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId

    // Kiểm tra user có phải là tutor không
    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể tạo lịch rảnh'
      })
    }

    const {
      subjectId,
      date,
      startTime,
      endTime,
      type, // 'online' | 'offline'
      link,
      location,
      capacity,
      isRecurring,
      note
    } = req.body

    // Validate required fields
    if (!subjectId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: môn học, ngày, giờ bắt đầu, giờ kết thúc'
      })
    }

    // Validate time
    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: 'Giờ kết thúc phải sau giờ bắt đầu'
      })
    }

    // Kiểm tra subject có tồn tại và tutor có được assign không
    const subject = await Subject.findById(subjectId)
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy môn học'
      })
    }

    // Kiểm tra tutor có được assign vào môn học này không
    const isTutorAssigned = subject.tutorIds.some(
      (id) => id.toString() === tutorId?.toString()
    )
    if (!isTutorAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không được phân công dạy môn học này'
      })
    }

    // Lấy semester đang active
    const activeSemester = await Semester.findOne({ status: SemesterStatus.ACTIVE })
    if (!activeSemester) {
      return res.status(400).json({
        success: false,
        message: 'Không có học kỳ đang hoạt động'
      })
    }

    // Kiểm tra xung đột thời gian với các slot khác của tutor
    const slotDate = new Date(date)
    const existingSlot = await Slot.findOne({
      tutorId,
      date: slotDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ],
      status: { $ne: SlotStatus.CANCELLED }
    })

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: 'Thời gian này đã có lịch khác, vui lòng chọn thời gian khác'
      })
    }

    // Tạo slot mới
    const newSlot = new Slot({
      tutorId,
      subjectId,
      semesterId: activeSemester._id,
      date: slotDate,
      startTime,
      endTime,
      location: {
        type: type || 'online',
        room: type === 'online' ? (link || '') : (location || '')
      },
      capacity: capacity || 1,
      bookedCount: 0,
      status: SlotStatus.AVAILABLE,
      note
    })

    await newSlot.save()

    // Nếu isRecurring = true, tạo thêm các slot cho 4 tuần tiếp theo
    const createdSlots = [newSlot]
    if (isRecurring) {
      for (let week = 1; week <= 4; week++) {
        const recurringDate = new Date(slotDate)
        recurringDate.setDate(recurringDate.getDate() + week * 7)

        // Kiểm tra xung đột cho ngày lặp lại
        const conflictSlot = await Slot.findOne({
          tutorId,
          date: recurringDate,
          $or: [
            {
              startTime: { $lt: endTime },
              endTime: { $gt: startTime }
            }
          ],
          status: { $ne: SlotStatus.CANCELLED }
        })

        if (!conflictSlot) {
          const recurringSlot = new Slot({
            tutorId,
            subjectId,
            semesterId: activeSemester._id,
            date: recurringDate,
            startTime,
            endTime,
            location: {
              type: type || 'online',
              room: type === 'online' ? (link || '') : (location || '')
            },
            capacity: capacity || 1,
            bookedCount: 0,
            status: SlotStatus.AVAILABLE,
            note
          })
          await recurringSlot.save()
          createdSlots.push(recurringSlot)
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: `Đã tạo ${createdSlots.length} lịch rảnh thành công`,
      data: createdSlots
    })
  } catch (error) {
    console.error('Error creating slot:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo lịch rảnh'
    })
  }
}

// Lấy danh sách lịch rảnh của tutor
export const getMySlots = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId

    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể xem lịch rảnh của mình'
      })
    }

    const { status, subjectId } = req.query

    const filter: any = { tutorId }
    if (status) {
      filter.status = status
    }
    if (subjectId) {
      filter.subjectId = subjectId
    }

    const slots = await Slot.find(filter)
      .populate('subjectId', 'name code')
      .populate('semesterId', 'name')
      .sort({ date: 1, startTime: 1 })

    // Map thêm thông tin thứ trong tuần
    const slotsWithDay = slots.map((slot) => ({
      ...slot.toObject(),
      dayOfWeek: getDayOfWeek(new Date(slot.date))
    }))

    return res.status(200).json({
      success: true,
      data: slotsWithDay
    })
  } catch (error) {
    console.error('Error getting slots:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách lịch rảnh'
    })
  }
}

// Cập nhật slot
export const updateSlot = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId
    const { slotId } = req.params

    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể cập nhật lịch rảnh'
      })
    }

    const slot = await Slot.findById(slotId)
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lịch rảnh'
      })
    }

    // Kiểm tra slot có phải của tutor này không
    if (slot.tutorId.toString() !== tutorId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền cập nhật lịch rảnh này'
      })
    }

    // Không cho phép cập nhật slot đã có booking
    if (slot.bookedCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể cập nhật lịch đã có người đặt'
      })
    }

    const {
      date,
      startTime,
      endTime,
      type,
      link,
      location,
      capacity,
      status,
      note
    } = req.body

    // Validate time nếu có thay đổi
    const newStartTime = startTime || slot.startTime
    const newEndTime = endTime || slot.endTime
    if (newStartTime >= newEndTime) {
      return res.status(400).json({
        success: false,
        message: 'Giờ kết thúc phải sau giờ bắt đầu'
      })
    }

    // Kiểm tra xung đột thời gian nếu thay đổi ngày/giờ
    if (date || startTime || endTime) {
      const slotDate = date ? new Date(date) : slot.date
      const existingSlot = await Slot.findOne({
        _id: { $ne: slotId },
        tutorId,
        date: slotDate,
        $or: [
          {
            startTime: { $lt: newEndTime },
            endTime: { $gt: newStartTime }
          }
        ],
        status: { $ne: SlotStatus.CANCELLED }
      })

      if (existingSlot) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian này đã có lịch khác, vui lòng chọn thời gian khác'
        })
      }
    }

    // Cập nhật slot
    if (date) slot.date = new Date(date)
    if (startTime) slot.startTime = startTime
    if (endTime) slot.endTime = endTime
    if (type || link || location) {
      slot.location = {
        type: type || slot.location.type,
        room: type === 'online' ? (link || slot.location.room) : (location || slot.location.room)
      }
    }
    if (capacity) slot.capacity = capacity
    if (status) slot.status = status
    if (note !== undefined) slot.note = note

    await slot.save()

    return res.status(200).json({
      success: true,
      message: 'Cập nhật lịch rảnh thành công',
      data: slot
    })
  } catch (error) {
    console.error('Error updating slot:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật lịch rảnh'
    })
  }
}

// Xóa slot
export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId
    const { slotId } = req.params

    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể xóa lịch rảnh'
      })
    }

    const slot = await Slot.findById(slotId)
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lịch rảnh'
      })
    }

    // Kiểm tra slot có phải của tutor này không
    if (slot.tutorId.toString() !== tutorId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xóa lịch rảnh này'
      })
    }

    // Không cho phép xóa slot đã có booking
    if (slot.bookedCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể xóa lịch đã có người đặt. Hãy hủy lịch thay vì xóa.'
      })
    }

    await Slot.findByIdAndDelete(slotId)

    return res.status(200).json({
      success: true,
      message: 'Xóa lịch rảnh thành công'
    })
  } catch (error) {
    console.error('Error deleting slot:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa lịch rảnh'
    })
  }
}

// Toggle trạng thái slot (mở/đóng)
export const toggleSlotStatus = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId
    const { slotId } = req.params

    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể thay đổi trạng thái lịch'
      })
    }

    const slot = await Slot.findById(slotId)
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lịch rảnh'
      })
    }

    if (slot.tutorId.toString() !== tutorId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thay đổi trạng thái lịch này'
      })
    }

    // Toggle giữa AVAILABLE và CANCELLED
    slot.status = slot.status === SlotStatus.AVAILABLE 
      ? SlotStatus.CANCELLED 
      : SlotStatus.AVAILABLE

    await slot.save()

    return res.status(200).json({
      success: true,
      message: `Đã ${slot.status === SlotStatus.AVAILABLE ? 'mở' : 'đóng'} lịch thành công`,
      data: slot
    })
  } catch (error) {
    console.error('Error toggling slot status:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi thay đổi trạng thái lịch'
    })
  }
}

// Lấy danh sách môn học mà tutor được phân công
export const getMySubjects = async (req: Request, res: Response) => {
  try {
    const tutorId = (req as any).user?.userId

    if (!(req as any).user?.roles?.includes(UserRole.TUTOR)) {
      return res.status(403).json({
        success: false,
        message: 'Chỉ tutor mới có thể xem môn học của mình'
      })
    }

    // Lấy semester đang active
    const activeSemester = await Semester.findOne({ status: SemesterStatus.ACTIVE })
    if (!activeSemester) {
      return res.status(200).json({
        success: true,
        data: []
      })
    }

    // Lấy các môn học mà tutor được assign trong semester hiện tại
    const subjects = await Subject.find({
      tutorIds: tutorId,
      semesterId: activeSemester._id
    }).select('name code')

    return res.status(200).json({
      success: true,
      data: subjects
    })
  } catch (error) {
    console.error('Error getting tutor subjects:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách môn học'
    })
  }
}
