import { Service, Inject } from '@tsed/common'
import * as jwt from 'jsonwebtoken'
import { UserService } from './user.service'
import CustomError from '../interfaces/error'

@Service()
export class AuthService {
  @Inject()
  userService: UserService

  async validatePassword (email: string, password: string) {
    const user = await this.userService.get({ email: email })
    if (!user) throw new CustomError('User not found', false, 401)

    try {
      await user.comparePassword(password)
    } catch (error) {
      throw new CustomError(error)
    }

    return user
  }

  validateJWT(headerToken): Promise<any> {
    return new Promise((resolve, reject) => {
      if (headerToken) {
        const token = headerToken.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) reject(err)
          const user = await this.userService.get({ _id: decoded.data._id })
          if (!user) reject('User not found')
          resolve({ isAuthenticated: true, user })
        })
      } else {
        reject('Token required')
      }
    })
  }

  async generateJWT(user) {
    const expiration = Math.floor(Date.now() / 1000) + (60 * Number(process.env.JWT_EXPIRATION))
    return jwt.sign({ data: user, exp: expiration }, process.env.JWT_SECRET)
  }

} 