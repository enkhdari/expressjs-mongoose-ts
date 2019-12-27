import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Person } from '../models/person.model'

export class PersonService {
  public async get(req: Request, res: Response) {
    try {
      if (req.query._id) {
        return res.status(200).send(await Person.findOne({ _id: Types.ObjectId(req.query._id) }))
      }
      return res.status(200).send(await Person.find({}))
    } catch (error) {
      return res.status(401).send({ success: false, error: error.message })
    }
  }
  public async post(req: Request, res: Response) {
    try {
      if (req.body._id) {
        await Person.findByIdAndUpdate(req.body._id,{ $set: req.body }, { new: false })
      } else {
        await new Person(req.body).save()
      }
    } catch (error) {
      return res.status(401).send({ success: false, error: error.message })
    }
    return res.status(200).send({ success: true })
  }
  public async delete(req: Request, res: Response) {
    try {
      const response = await Person.findByIdAndDelete({ _id: Types.ObjectId(req.query._id) })
      return res.status(200).send({ success: response ? true : false })
    } catch (error) {
      return res.status(401).send({ success: false, error: error.message })
    }
  }
}