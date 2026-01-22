import { z } from "zod";
import { ProjectStatus } from "../../enums/project";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be at most 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),

  status: z.nativeEnum(ProjectStatus).optional(),
})
