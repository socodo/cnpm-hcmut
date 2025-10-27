import express from 'express'
import 'dotenv/config'
import userRouter from '@/router/user.router'
import { connectDB } from '@/config/db'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

// Middleware
app.use(express.json())

//Connect Database
connectDB()
// Routes
app.use('/api', userRouter)

// Static files
app.use(express.static('public'))

// Root route
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app