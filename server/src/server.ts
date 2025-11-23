import express from 'express'
import 'dotenv/config'
import { connectDB } from '@/config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from '@/router/auth.router'
import userRouter from '@/router/user.router'
import { authenticate } from '@/middlewares/auth.middleware'

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app