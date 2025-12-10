import express from 'express'
import { signUp, signIn, refreshAccessToken, logout } from '@/controller/auth.controller'
import { authenticate, authorize } from '@/middlewares/auth.middleware'
import { UserRole } from '@/models'


const router = express.Router()

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup', authenticate, authorize(UserRole.ADMIN), signUp)

/**
 * @route   POST /api/auth/signin
 * @desc    Sign in user
 * @access  Public
 */
router.post('/signin', signIn)

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh-token', refreshAccessToken)

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post('/logout', logout)

export default router
