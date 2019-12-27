import { Configuration, Service } from '@tsed/di'
import { Types } from 'mongoose'
import User from '../models/user.model'
import * as jwt from 'jsonwebtoken'

@Service()
export class AuthService {
  constructor(@Configuration() configuration: Configuration) {}

  generateToken(user: any) {
    const expiration = Math.floor(Date.now() / 1000) + (60 * Number(process.env.JWT_EXPIRATION))
    return jwt.sign({ data: user, exp: expiration }, process.env.JWT_SECRET)
  }
}