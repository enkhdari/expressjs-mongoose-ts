import * as Express from 'express'
import { Controller, Get, Authenticated } from '@tsed/common'

@Controller('/')
export class ApplicationController {

  @Get('/')
  async hello(request: Express.Request, response: Express.Response) {
    return { id: request.params.id, name: 'Hello World!' };
  }

  @Get('/profile')
  @Authenticated()
  async profile(request: Express.Request, response: Express.Response) {
    return { id: request.params.id, name: 'Hello World!' };
  }

  @Get('/admin')
  @Authenticated({ role: 'admin' })
  async admin(request: Express.Request, response: Express.Response) {
    return { id: request.params.id, name: 'Hello Admin!' };
  }
}