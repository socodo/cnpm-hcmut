import { getMe, postProgram, updateUserInfor, bookSlot, getMyBookings, cancelBooking, changePassword } from '@/controller/user.controller'
import express from 'express'
const router = express.Router()

router.get('/get-me', getMe)
router.get('/my-bookings', getMyBookings)

router.post('/post-reqprogram', postProgram)
router.patch('/update-user-infor', updateUserInfor)
router.post('/change-password', changePassword)
router.post('/book-slot', bookSlot)
router.post('/cancel-booking', cancelBooking)


export default router