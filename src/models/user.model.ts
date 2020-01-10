import { Enum, Required, Property } from '@tsed/common'
import { Ref, Model } from '@tsed/mongoose'
import { BaseModel } from './base.model'
import { Person } from './person.model';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

@Model({ collection: 'user' })
export class User extends BaseModel {
  @Property()
  _id: string

  @Required()
  @Property()
  email: string

  @Enum(Roles)
  @Property()
  role: Roles

  @Required()
  @Property()
  password: string

  @Ref(Person)
  @Property()
  personId: Ref<Person>
}