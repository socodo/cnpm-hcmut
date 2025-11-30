import express from 'express'
import {
  createSlot,
  getMySlots,
  updateSlot,
  deleteSlot,
  toggleSlotStatus,
  getMySubjects
} from '@/controller/tutor.controller'
import { authorize } from '@/middlewares/auth.middleware'
import { UserRole } from '@/models'

const router = express.Router()

// Tất cả routes đều yêu cầu role TUTOR

// GET /api/tutor/my-subjects - Lấy danh sách môn học được phân công
router.get('/my-subjects', getMySubjects)

// POST /api/tutor/slots - Tạo lịch rảnh mới
router.post('/slots', createSlot)

router.get('/slots', getMySlots)

router.put('/slots/:slotId', updateSlot)

router.delete('/slots/:slotId', deleteSlot)

router.patch('/slots/:slotId/toggle', toggleSlotStatus)

export default router