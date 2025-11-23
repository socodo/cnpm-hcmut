import mongoose, { Schema, Document, Types } from 'mongoose'

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface IBooking extends Document {
  studentId: Types.ObjectId
  tutorId: Types.ObjectId
  subjectId: Types.ObjectId
  semesterId: Types.ObjectId
  slotId: Types.ObjectId
  cancelledBy?: Types.ObjectId
  status: BookingStatus
  studentNote?: string
  feedback?: {
    rating: number
    comment: string
    submittedAt: Date
  }
  tutorFeedback?: {
    note: string
    submittedAt: Date
  }
  bookedAt: Date
  confirmedAt?: Date
  completedAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true
    },
    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING
    },
    studentNote: {
      type: String,
      trim: true
    },
    feedback: {
      type: {
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, trim: true },
        submittedAt: { type: Date, default: Date.now }
      }
    },
    tutorFeedback: {
      type: {
        note: { type: String, trim: true, required: true },
        submittedAt: { type: Date, default: Date.now }
      }
    },
    bookedAt: {
      type: Date,
      default: Date.now
    },
    confirmedAt: {
      type: Date
    },
    completedAt: {
      type: Date
    },
    cancelledAt: {
      type: Date
    },
    cancellationReason: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Indexes
BookingSchema.index({ studentId: 1, status: 1 })
BookingSchema.index({ tutorId: 1, status: 1 })
BookingSchema.index({ slotId: 1 })
BookingSchema.index({ semesterId: 1 })
BookingSchema.index({ status: 1, bookedAt: -1 })

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema)
