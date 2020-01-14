import { Controller, Get, Post, Delete, BodyParams, PathParams, QueryParams, Inject } from '@tsed/common'
import { PersonService } from '../services/person.service'
import { Person } from '../models/person.model'
import { BaseController } from './base.controller'
import CustomError from '../interfaces/error'


@Controller('/person')
export class PersonController extends BaseController {
  @Inject() personService: PersonService

  @Get()
  async list(@QueryParams() query: any) {
    return await this.personService.list(query)
  }

  @Post()
  async upsert(@BodyParams() person: Person) {
    const data = await this.personService.upsert(person)
    return this.returnData(data)
  }

  @Get('/:id')
  async get(@PathParams('id') id: string) {
    const data = await this.personService.get(id)
    return this.returnData(data)
  }

  @Delete('/:id')
  async delete(@PathParams('id') id: string) {
    const result = await this.personService.delete(id)
    return this.returnSuccess(result)
  }
}