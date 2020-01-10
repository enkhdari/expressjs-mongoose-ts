import { Required, Property } from '@tsed/common'
import { Model, ObjectID } from '@tsed/mongoose'
import { BaseModel } from './base.model'

@Model({ collection: 'person' })
export class Person extends BaseModel {
  @ObjectID()
  @Property()
  _id: string

  @Property()
  email: string

  @Property()
  country: string

  @Property()
  firstName: string

  @Property()
  lastName: string

  @Property()
  phone: string

  @Property()
  birthDate: string

  @Property()
  name: string
}