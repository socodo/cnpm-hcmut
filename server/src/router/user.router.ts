import express from 'express'
import { GetHello } from '@/controller/user.controller'

const router = express.Router()

// GET /api/test
router.get('/test', GetHello)

export default router