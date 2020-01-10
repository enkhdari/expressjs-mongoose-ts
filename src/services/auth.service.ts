import { Service } from '@tsed/common'
import { User } from '../models/user.model'
import * as jwt from 'jsonwebtoken'

@Service()
export class AuthService {

  generateToken(user: User) {
    const expiration = Math.floor(Date.now() / 1000) + (60 * Number(process.env.JWT_EXPIRATION))
    return jwt.sign({ data: user, exp: expiration }, process.env.JWT_SECRET)
  }
}