import { Types } from 'mongoose'
import { ProjectStatus } from '../../enums/project'

export interface IProject {
  _id?: Types.ObjectId
  name: string
  description?: string
  status: ProjectStatus
  isDeleted: boolean
  createdBy: Types.ObjectId
}
