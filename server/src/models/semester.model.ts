import mongoose, { Schema, Document } from 'mongoose'

export enum SemesterStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface ISemester extends Document {
  code: string
  name: string
  academicYear: string
  semesterNumber: number
  startDate: Date
  endDate: Date
  status: SemesterStatus
  createdAt: Date
  updatedAt: Date
  startDateSurvey: Date
  endDateSurvey: Date
}

const SemesterSchema = new Schema<ISemester>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    academicYear: {
      type: String,
      required: true,
      trim: true
    },
    semesterNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 3
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
      enum: Object.values(SemesterStatus),
      default: SemesterStatus.COMPLETED
    },
    startDateSurvey: {
      type: Date,
      required: true
    },

    endDateSurvey: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Indexes
SemesterSchema.index({ code: 1 })
SemesterSchema.index({ academicYear: 1, semesterNumber: 1 })
SemesterSchema.index({ status: 1 })
SemesterSchema.index({ startDate: 1, endDate: 1 })

export const Semester = mongoose.model<ISemester>('Semester', SemesterSchema)
