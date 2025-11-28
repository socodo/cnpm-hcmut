import {
    createSemester,
    getAllUser,
    updateUserStatus, updateSemesterStatus, getAllSemester,
    createSubject,
    getAllSubject
} from '@/controller/admin.controller'
import express from 'express'

const router = express.Router()


router.post('/create-semester', createSemester)
router.get('/get-all-user', getAllUser)
router.patch('/update-user-status/:id', updateUserStatus)

export default router