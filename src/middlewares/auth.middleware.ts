import { EndpointInfo, Next, OverrideMiddleware, AuthenticatedMiddleware, Middleware, IMiddleware , Req, Request } from '@tsed/common'
import { Forbidden, Unauthorized } from 'ts-httpexceptions'
import CustomError from '../interfaces/error'
import * as Express from 'express'
import * as Passport from 'passport'
import { $log } from 'ts-log-debug'

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware implements IMiddleware  {

  public use(@Req() request: Express.Request, @EndpointInfo() endpoint: EndpointInfo, @Next() next: Express.NextFunction) {
    const options = endpoint.get(AuthenticatedMiddleware) || {}
    // Passport.authenticate('jwt', async function(err, val) {
    //   $log.info(err, val)
    // })
    if(!request.isAuthenticated()) {
      throw new CustomError('Unauthorized', false, 401)
    }

    if (options.role && request.user.role !== options.role) {
      throw new CustomError('Forbidden', false, 403)
    }
    next()
  }
}
