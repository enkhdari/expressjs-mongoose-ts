import { Inject, Service } from '@tsed/common'
import { MongooseModel } from '@tsed/mongoose'
import { BaseService } from './base.service'
import { User } from '../models/user.model'

@Service()
export class UserService extends BaseService {
  @Inject(User) protected model: MongooseModel<User>
}