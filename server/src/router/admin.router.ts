import {
    createSemester,
    getAllUser,
    updateUserStatus, updateSemesterStatus, getAllSemester,
    createSubject,
    getAllSubject, getSemesterInfor, getSubjectInfor,
    assignTutorToSubject, removeTutorFromSubject
} from '@/controller/admin.controller'
import express from 'express'
const router = express.Router()

router.post('/create-semester', createSemester)
router.get('/get-all-user', getAllUser)
router.patch('/update-user-status/:id', updateUserStatus)
router.post('/create-subject/:id', createSubject)
router.get('/get-all-subject/:id', getAllSubject)
router.get('/get-all-semester', getAllSemester)
router.patch('/update-semester-status/:id', updateSemesterStatus)
router.get('/get-semester/:id', getSemesterInfor)
router.get('/get-subject/:id', getSubjectInfor)
router.post('/assign-tutor/:id', assignTutorToSubject)
router.delete('/remove-tutor/:id', removeTutorFromSubject)

export default router