import { createSemester, getAllUser, updateUserStatus, updateSemesterStatus, getAllSemester } from '@/controller/admin.controller'
import express from 'express'

const router = express.Router()


router.post('/create-semester', createSemester)
router.get('/get-all-user', getAllUser)
router.patch('/update-user-status/:id', updateUserStatus)
router.patch('/update-semester-status/:id', updateSemesterStatus)
router.get('/get-all-semester', getAllSemester)

export default router