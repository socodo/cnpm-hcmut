import { getMe } from '@/controller/user.controller'
import express from 'express'
const router = express.Router()

router.get('/get-me', getMe)

export default router