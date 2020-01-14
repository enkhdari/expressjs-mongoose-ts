import { EndpointInfo, Next, OverrideMiddleware, AuthenticatedMiddleware, IMiddleware , Req, Inject, $log } from '@tsed/common'
import CustomError from '../interfaces/error'
import * as Express from 'express'
import { AuthService } from '../services/auth.service';

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware implements IMiddleware  {
  @Inject() authService: AuthService

  public async use(@Req() request: Express.Request, @EndpointInfo() endpoint: EndpointInfo, @Next() next: Express.NextFunction) {
    const options = endpoint.get(AuthenticatedMiddleware) || {}
    
    let auth = { isAuthenticated: false, user: null }
    try {
      auth = await this.authService.validateJWT(request.headers.authorization)
    } catch(error) {
      throw new CustomError(error, false, 401)
    }
    if(!auth.isAuthenticated) {
      throw new CustomError('Unauthorized', false, 401)
    }
    if (options && options.role && auth.user.role !== options.role) {
      throw new CustomError('Forbidden', false, 403)
    }
    next()
  }
}
