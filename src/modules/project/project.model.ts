import { Schema, model, Types } from 'mongoose'
import { ProjectStatus } from '../../enums/project'

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ProjectStatus,
      default: ProjectStatus.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export const Project = model('Project', projectSchema)
