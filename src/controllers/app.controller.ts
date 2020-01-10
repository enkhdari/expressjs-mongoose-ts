import * as Express from 'express'
import { Controller, Get, Authenticated } from '@tsed/common'

@Controller('/')
export class ApplicationController {

  @Get('/')
  async hello() {
    return { name: 'Hello World!' };
  }

  @Get('/user')
  @Authenticated({ role: 'user' })
  async profile() {
    return { name: 'Hello User!' };
  }

  @Get('/admin')
  @Authenticated({ role: 'admin' })
  async admin() {
    return { name: 'Hello Admin!' };
  }
}