import { Configuration, Service } from '@tsed/di'
import { Types } from 'mongoose'
import Person from '../models/person.model'

@Service()
export class PersonService {
  constructor(@Configuration() configuration: Configuration) {}

  async get(query: any) {
    if (query && query._id) {
      return await Person.findOne({ _id: Types.ObjectId(query._id) })
    }
    return await Person.find({})
  }

  async upsert(body: any) {
    if (body._id) {
      await Person.findByIdAndUpdate(body._id,{ $set: body }, { new: false })
    } else {
      await new Person(body).save()
    }
    return true
  }

  async delete(_id: string) {
    const response = await Person.findByIdAndDelete({ _id: Types.ObjectId(_id) })
    return response ? true : false
  }

}
