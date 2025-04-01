import express, { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import projectRoutes from './routes/projects'
import cartRoutes from './routes/cart'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res): void => {
  res.json({ status: 'ok' })
})
app.use('/api/projects', projectRoutes)
app.use('/api/cart', cartRoutes)

// Basic 404 Handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode).json({ message: err.message || 'Internal Server Error' })
})

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`)
})
