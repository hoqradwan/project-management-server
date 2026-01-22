import crypto from 'crypto'
import bcrypt from 'bcryptjs'

export const generateInviteToken = () =>
  crypto.randomBytes(32).toString('hex')


export const hashPassword = (password: string) =>
  bcrypt.hash(password, 10)

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash)
