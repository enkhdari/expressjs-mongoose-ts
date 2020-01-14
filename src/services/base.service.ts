import { MongooseModel } from '@tsed/mongoose'

export class BaseService {

  constructor(protected model: MongooseModel<any>) { }

  async list(query: any) : Promise<any[]> {
    query['deleted.at'] = { $exists: false }
    return await this.model.find(query)
  }
  
  async get(query: any, populate: string = '') : Promise<any> {
    query['deleted.at'] = { $exists: false }
    return await this.model.findOne(query).populate(populate).exec()
  }

  async upsert(data: any) : Promise<any> {
    if (data._id) {
      await this.model.findByIdAndUpdate(data._id,{ $set: data }, { new: false })
    } else {
      const newData =  await this.model.create(data)
      return newData
    }
    return data
  }

  async delete(_id: String, userId = null) : Promise<boolean> {
    // await this.model.findByIdAndUpdate(model, { $set: { deleted: { at: new Date (), by: userId }}}, { new: false })
    const result = await this.model.deleteOne({ _id: _id })
    console.log(result)
    return true
  }

}