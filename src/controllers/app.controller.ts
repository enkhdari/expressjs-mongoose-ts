import { Application, Request, Response } from 'express'

export class ApplicationController {
  constructor(private app: Application) {
    this.routes()
  }

  public routes() {
    this.app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Go to /person'
      })
    })
  }
}