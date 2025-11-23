import mongoose, { Schema, Document, Types } from 'mongoose'

export enum NotificationType {
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  SLOT_REMINDER = 'SLOT_REMINDER',
  NEW_SLOT_AVAILABLE = 'NEW_SLOT_AVAILABLE'
}

export interface INotification extends Document {
  userId: Types.ObjectId
  type: NotificationType
  title: string
  message: string
  relatedEntity?: {
    type: string
    id: Types.ObjectId
  }
  isRead: boolean
  readAt?: Date
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    relatedEntity: {
      type: {
        type: { type: String, required: true },
        id: { type: Schema.Types.ObjectId, required: true }
      }
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
)

// Indexes
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })
NotificationSchema.index({ createdAt: -1 })

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema)
