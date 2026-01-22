import { Router } from 'express'
import { auth } from '../../middlewares/auth'
import { changeUserRole, changeUserStatus, getAllUsers, inviteUser, login, registerViaInvite } from './user.controller'


const router = Router()

router.post('/login', login)
router.post('/invite', auth('ADMIN'), inviteUser)
router.post('/register-via-invite', registerViaInvite)
router.patch('/:id/role', auth('ADMIN'), changeUserRole)
router.patch('/:id/status', auth('ADMIN'), changeUserStatus)
router.get('/', auth('ADMIN'), getAllUsers)

export const userRoutes = router
