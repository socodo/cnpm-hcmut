import mongoose, { Schema, Document, Types } from 'mongoose'

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  FULL = 'FULL',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface ISlot extends Document {
  tutorId: Types.ObjectId
  subjectId: Types.ObjectId
  semesterId: Types.ObjectId
  date: Date
  startTime: string
  endTime: string
  location: {
    type: string
    room: string
  }
  capacity: number
  bookedCount: number
  status: SlotStatus
  note?: string
  createdAt: Date
  updatedAt: Date
}

const SlotSchema = new Schema<ISlot>(
  {
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
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: { type: String, required: true },
        room: { type: String, required: true }
      },
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    bookedCount: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: Object.values(SlotStatus),
      default: SlotStatus.AVAILABLE
    },
    note: {
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
SlotSchema.index({ tutorId: 1, date: 1 })
SlotSchema.index({ subjectId: 1, status: 1 })
SlotSchema.index({ semesterId: 1 })
SlotSchema.index({ date: 1, startTime: 1 })
SlotSchema.index({ status: 1 })

export const Slot = mongoose.model<ISlot>('Slot', SlotSchema)
