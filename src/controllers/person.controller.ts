import { Application } from 'express'
import { PersonService } from '../services/person.service'

const URL_CONTEXT = '/person'

export class PersonController {
  private personService: PersonService

  constructor(private app: Application) {
    this.personService = new PersonService()
    this.routes()
  }

  public routes() {
    this.app.routes = [
      this.app.route(`${URL_CONTEXT}`).get(this.personService.get),
      this.app.route(`${URL_CONTEXT}`).post(this.personService.post),
      this.app.route(`${URL_CONTEXT}`).delete(this.personService.delete)
    ]
  }
}