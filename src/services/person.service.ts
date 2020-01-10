import { Inject, Service } from '@tsed/common'
import { MongooseModel } from '@tsed/mongoose'
import { Person } from '../models/person.model'
import { BaseService } from './base.service'

@Service()
export class PersonService extends BaseService {
  @Inject(Person) protected model: MongooseModel<Person>
}
