import express from 'express'
import 'dotenv/config'
import { connectDB } from '@/config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from '@/router/auth.router'
import userRouter from '@/router/user.router'
import { authenticate, authorize } from '@/middlewares/auth.middleware'
import { UserRole } from './models'
import adminRouter from '@/router/admin.router'
import tutorRouter from '@/router/tutor.router'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  })
)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

// Connect Database
connectDB()

// PUBLIC ROUTES - No authentication required
app.use('/api/auth', authRouter)

// PROTECTED ROUTES - Authentication required
app.use('/api/users', authenticate, userRouter)

// Admin routes - authenticate required, authorize per route
app.use('/api/admin', authenticate, adminRouter)

app.use('/api/tutor', authenticate, authorize(UserRole.TUTOR), tutorRouter)



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app