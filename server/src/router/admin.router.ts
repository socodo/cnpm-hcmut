import {
    createSemester,
    getAllUser,
    updateUserStatus, updateSemesterStatus, getAllSemester,
    createSubject,
    getAllSubject, getSemesterInfor, getSubjectInfor,
    assignTutorToSubject, removeTutorFromSubject, getTutorsBySubject
} from '@/controller/admin.controller'
import { authorize } from '@/middlewares/auth.middleware'
import { UserRole } from '@/models'
import express from 'express'
const router = express.Router()

// ============== PUBLIC APIs (chỉ cần authenticate) ==============
// Ai đăng nhập cũng có thể xem
router.get('/get-all-semester', getAllSemester)
router.get('/get-semester/:id', getSemesterInfor)
router.get('/get-all-subject/:id', getAllSubject)
router.get('/get-subject/:id', getSubjectInfor)
router.get('/get-tutors-by-subject/:id', getTutorsBySubject)


// ============== ADMIN ONLY APIs ==============
// Chỉ Admin mới có quyền
router.post('/create-semester', authorize(UserRole.ADMIN), createSemester)
router.patch('/update-semester-status/:id', authorize(UserRole.ADMIN), updateSemesterStatus)
router.post('/create-subject/:id', authorize(UserRole.ADMIN), createSubject)
router.get('/get-all-user', authorize(UserRole.ADMIN), getAllUser)
router.patch('/update-user-status/:id', authorize(UserRole.ADMIN), updateUserStatus)
router.post('/assign-tutor/:id', authorize(UserRole.ADMIN), assignTutorToSubject)
router.delete('/remove-tutor/:id', authorize(UserRole.ADMIN), removeTutorFromSubject)

export default router