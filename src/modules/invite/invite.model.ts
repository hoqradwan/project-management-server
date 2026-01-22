import { Schema, model } from 'mongoose'
import { UserRole } from '../../enums/user'

const inviteSchema = new Schema(
  {
    email: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
    },
    token: { type: String },
    expiresAt: { type: Date },
    acceptedAt: { type: Date },
  },
  { timestamps: true }
)

export const Invite = model('Invite', inviteSchema)
