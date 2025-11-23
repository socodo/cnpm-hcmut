import mongoose, { Schema, Document, Types } from 'mongoose'

export enum PreferredMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  HYBRID = 'HYBRID'
}

export enum SessionType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP'
}

export enum MentoringRequestStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export interface IMentoringRequest extends Document {
  studentId: Types.ObjectId
  semesterId: Types.ObjectId
  problem: string
  problemDetail?: string
  preferredMode: PreferredMode
  sessionType: SessionType
  reason?: string
  learningGoals?: string
  startDate: Date
  endDate: Date
  status: MentoringRequestStatus
  createdAt: Date
  updatedAt: Date
}

const MentoringRequestSchema = new Schema<IMentoringRequest>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true
    },
    problem: {
      type: String,
      required: true,
      trim: true
    },
    problemDetail: {
      type: String,
      trim: true
    },
    preferredMode: {
      type: String,
      enum: Object.values(PreferredMode),
      required: true
    },
    sessionType: {
      type: String,
      enum: Object.values(SessionType),
      required: true
    },
    reason: {
      type: String,
      trim: true
    },
    learningGoals: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(MentoringRequestStatus),
      default: MentoringRequestStatus.OPEN
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Indexes
MentoringRequestSchema.index({ studentId: 1, status: 1 })
MentoringRequestSchema.index({ semesterId: 1 })
MentoringRequestSchema.index({ status: 1, createdAt: -1 })

export const MentoringRequest = mongoose.model<IMentoringRequest>('MentoringRequest', MentoringRequestSchema)
