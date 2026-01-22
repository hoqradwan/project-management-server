import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createProjectSchema } from './project.validation';
import { createProject, deleteProject, getAllProjects, updateProject } from './project.controller';

const router = express.Router();

router.post('/', auth("ADMIN", "MANAGER", "STAFF"), validateRequest(createProjectSchema), createProject)
router.patch('/:id', auth("ADMIN"), updateProject);
router.delete('/:id', auth("ADMIN"), deleteProject);
router.get('/', auth("ADMIN", "MANAGER", "STAFF"), getAllProjects);

export const projectRoutes = router;