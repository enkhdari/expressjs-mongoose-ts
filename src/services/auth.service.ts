import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { JWT_EXPIRATION, JWT_SECRET } from '../constant/environment.constant'
import User from '../models/user.model'

export class AuthService {
  generateToken(user) {
    const expiration = Math.floor(Date.now() / 1000) + 60 * JWT_EXPIRATION
    return jwt.sign({ data: user, exp: expiration }, JWT_SECRET)
  }
  async login(req: Request, res: Response) {
    try {
      if (req.query._id) {
        return res.status(200).send(await Person.findOne({ _id: Types.ObjectId(req.query._id) }))
      }
      return res.status(200).send(await Person.find({}))
    } catch (error) {
      return res.status(401).send({ success: false, error: error.message })
    }
  }
}