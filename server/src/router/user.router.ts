import { getMe, postProgram, updateUserInfor } from '@/controller/user.controller'
import express from 'express'
const router = express.Router()

router.get('/get-me', getMe)

router.post('/post-reqprogram', postProgram)
router.patch('/update-user-infor', updateUserInfor)

export default router