import * as Express from 'express'
import { Controller, Get, Post, Delete } from '@tsed/common'
import { PersonService } from '../services/person.service'
import CustomError from '../interfaces/error'

const END_POINT = '/person'

@Controller('/')
export class PersonController {

  constructor(private readonly personService: PersonService) {}

  @Get(END_POINT)
  async get(request: Express.Request, response: Express.Response) {
    return await this.personService.get(request.query)
  }

  @Post(END_POINT)
  async upsert(request: Express.Request, response: Express.Response) {
    return { success: await this.personService.upsert(request.body) }
  }

  @Delete(END_POINT)
  async delete(request: Express.Request, response: Express.Response) {
    if (!request.query._id) throw new CustomError('_id required')
    return { success: await this.personService.delete(request.query._id) }
  }
}