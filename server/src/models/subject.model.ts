import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ISubject extends Document {
  code: string
  name: string
  semesterId: Types.ObjectId
  department: string
  faculty: string
  credits: number
  isActive: boolean
  description?: string
  tutorIds: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const SubjectSchema = new Schema<ISubject>(
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
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    faculty: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    credits: {

      type: Number,

      required: [true, 'Số tín chỉ là bắt buộc'],

      min: [1, 'Số tín chỉ phải lớn hơn 0'],

    },
    description: {
      type: String,
      trim: true
    },
    tutorIds: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Indexes
SubjectSchema.index({ code: 1 })
SubjectSchema.index({ semesterId: 1 })
SubjectSchema.index({ department: 1, faculty: 1 })
SubjectSchema.index({ isActive: 1 })
SubjectSchema.index({ tutorIds: 1 })

export const Subject = mongoose.model<ISubject>('Subject', SubjectSchema)
