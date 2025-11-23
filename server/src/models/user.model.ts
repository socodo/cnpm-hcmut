import mongoose, { Schema, Document } from 'mongoose'

export enum UserRole {
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED'
}

export interface IUser extends Document {
  displayName: string
  email: string
  passwordHash: string
  avatarUrl?: string
  roles: UserRole[]
  status: UserStatus
  phone?: string,
  dateOfBirth?: Date,
  sex?: string,
  student?: {
    faculty: string
    class: string
    year: number
    gpa: number
  }
  tutor?: {
    title: string
    department: string
    bio: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    displayName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      default: new Date('2005-10-10')
    },
    passwordHash: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/boy'
    },

    sex: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other'
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.STUDENT]
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE
    },
    phone: {
      type: String,
      trim: true
    },
    student: {
      type: {
        faculty: { type: String, required: true, default: 'Unknown' },
        class: { type: String, required: true, default: 'Unknown' },
        year: { type: Number, required: true, default: 1 },
        gpa: { type: Number, min: 0, max: 10, default: 0 }
      },
      default: null
    },
    tutor: {
      type: {
        title: { type: String, required: true, default: 'Tutor' },
        department: { type: String, required: true, default: 'General' },
        bio: { type: String, default: '' }
      },
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Indexes
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ roles: 1 })
UserSchema.index({ status: 1 })

export const User = mongoose.model<IUser>('User', UserSchema)