import { Err, GlobalErrorHandlerMiddleware, OverrideProvider, Req, Res } from '@tsed/common'
import { Exception } from 'ts-httpexceptions'
import CustomError from '../interfaces/error'
import { $log } from 'ts-log-debug'

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class ErrorMiddleware extends GlobalErrorHandlerMiddleware {

  use(@Err() error: any, @Req() request: Req, @Res() response: Res ): any {
    if (response.headersSent) {
      throw error
    }
    $log.error('' + error)

    if (error instanceof CustomError) {
      response.status(error.status).send({ error: error.message })
      return
    }

    if (typeof error === 'string') {
      response.status(400).send({ error: error })
      return
    }

    response.status(error.status || 500).send({ error: 'Internal server error' })

    return
  }

}