import {
    createSemester,
    deleteSemester,
    getAllUser,
    updateUserStatus, updateSemesterStatus, getAllSemester, getActiveSemester,
    createSubject,
    deleteSubject,
    getAllSubject, getSemesterInfor, getSubjectInfor,
    assignTutorToSubject, removeTutorFromSubject, getTutorsBySubject, getTutorSlotsBySubject,
    getActiveSemesterRequests
} from '@/controller/admin.controller'
import { authorize } from '@/middlewares/auth.middleware'
import { UserRole } from '@/models'
import express from 'express'
const router = express.Router()

// ============== PUBLIC APIs (chỉ cần authenticate) ==============
// Ai đăng nhập cũng có thể xem
router.get('/get-all-semester', getAllSemester)
router.get('/get-active-semester', getActiveSemester)
router.get('/get-active-semester-requests', getActiveSemesterRequests)
router.get('/get-semester/:id', getSemesterInfor)
router.get('/get-all-subject/:id', getAllSubject)
router.get('/get-subject/:id', getSubjectInfor)
router.get('/get-tutors-by-subject/:id', getTutorsBySubject)
router.get('/get-tutor-slots', getTutorSlotsBySubject)



// ============== ADMIN ONLY APIs ==============
// Chỉ Admin mới có quyền
router.post('/create-semester', authorize(UserRole.ADMIN), createSemester)
router.delete('/delete-semester/:id', authorize(UserRole.ADMIN), deleteSemester)
router.patch('/update-semester-status/:id', authorize(UserRole.ADMIN), updateSemesterStatus)
router.post('/create-subject/:id', authorize(UserRole.ADMIN), createSubject)
router.delete('/delete-subject/:id', authorize(UserRole.ADMIN), deleteSubject)
router.get('/get-all-user', authorize(UserRole.ADMIN), getAllUser)
router.patch('/update-user-status/:id', authorize(UserRole.ADMIN), updateUserStatus)
router.post('/assign-tutor/:id', authorize(UserRole.ADMIN), assignTutorToSubject)
router.delete('/remove-tutor/:id', authorize(UserRole.ADMIN), removeTutorFromSubject)

export default router