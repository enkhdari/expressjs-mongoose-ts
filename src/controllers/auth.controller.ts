import { Controller, Post, Inject, BodyParams } from '@tsed/common'
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../interfaces/request/auth'

@Controller('/auth')
export class ApplicationController {
  @Inject() authService: AuthService

  @Post('/login')
  async login(@BodyParams() body: LoginRequest) {
    const user = await this.authService.validatePassword(body.email, body.password)
    const token = await this.authService.generateJWT(user)
    return { data: user, token };
  }
}