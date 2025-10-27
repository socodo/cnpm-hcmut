import { Request, Response } from 'express'

export const GetHello = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello World',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  })
}