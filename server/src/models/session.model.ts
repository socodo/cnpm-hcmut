import mongoose, { Document } from 'mongoose'

export type ISession = Document & {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  refreshToken: string
  isActive: boolean
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Indexes
SessionSchema.index({ refreshToken: 1 }, { unique: true })
SessionSchema.index({ userId: 1 })


SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

SessionSchema.index({ userId: 1, isActive: 1 })

export const Session = mongoose.model<ISession>('Session', SessionSchema)
