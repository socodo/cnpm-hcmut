import express from 'express'
import {
  createSlot,
  getMySlots,
  updateSlot,
  deleteSlot,
  toggleSlotStatus,
  getMySubjects,
  getTutorBookings,
  cancelBookingByTutor,
  completeBookingByTutor
} from '@/controller/tutor.controller'
import { authorize } from '@/middlewares/auth.middleware'
import { UserRole } from '@/models'

const router = express.Router()

// Tất cả routes đều yêu cầu role TUTOR

// GET /api/tutor/my-subjects - Lấy danh sách môn học được phân công
router.get('/my-subjects', getMySubjects)

// GET /api/tutor/my-bookings - Lấy danh sách lịch dạy
router.get('/my-bookings', getTutorBookings)

// POST /api/tutor/cancel-booking - Hủy lịch dạy
router.post('/cancel-booking', cancelBookingByTutor)

// POST /api/tutor/complete-booking - Hoàn thành lịch dạy
router.post('/complete-booking', completeBookingByTutor)

// POST /api/tutor/slots - Tạo lịch rảnh mới
router.post('/slots', createSlot)

router.get('/slots', getMySlots)

router.put('/slots/:slotId', updateSlot)

router.delete('/slots/:slotId', deleteSlot)

router.patch('/slots/:slotId/toggle', toggleSlotStatus)


export default router