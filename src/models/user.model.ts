import { Enum, Required, Property, IgnoreProperty  } from '@tsed/common'
import * as bcrypt from 'bcrypt-nodejs'
import { Ref, Model } from '@tsed/mongoose'
import { BaseModel } from './base.model'
import { Person } from './person.model'

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
  @IgnoreProperty()
  password: string

  @Ref(Person)
  @Property()
  personId: Ref<Person>
  
  comparePassword(passwordAttempt: string) {
    return new Promise((resolve, reject) => {
      const password = JSON.parse(JSON.stringify(this)).password
      bcrypt.compare(passwordAttempt, password, (err, isMatch) => {
        if (err) reject(err)
        if (!isMatch) reject('Invalid password')
        resolve(true)
      })
    })
  }
}