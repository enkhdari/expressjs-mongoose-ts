import { Default, Format, Property } from '@tsed/common'
import { ObjectID, Schema } from '@tsed/mongoose'

@Schema()
export class InfoSchema {
  @Property()
  @Format('date-time')
  at: string

  @Property()
  @ObjectID()
  by: string
}

export class BaseModel {
  @Property()
  @Default(null)
  deleted: InfoSchema

  @Property()
  created: InfoSchema

  @Property()
  @Default(null)
  updated: InfoSchema

}