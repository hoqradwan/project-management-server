import { Schema, model } from 'mongoose'
import { UserRole, UserStatus } from '../../enums/user'



const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STAFF,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    invitedAt: Date,
  },
  { timestamps: true }
)

export const User = model('User', userSchema)
