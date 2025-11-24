import { createSemester } from '@/controller/admin.controller'
import { getMe, postProgram } from '@/controller/user.controller'
import express from 'express'

const router = express.Router()


router.post('/create-semester', createSemester)

export default router