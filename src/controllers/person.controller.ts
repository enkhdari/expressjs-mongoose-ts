import { Application } from 'express'
import { PersonService } from '../services/person.service'

export class PersonController {
  private personService: PersonService

  constructor(private app: Application) {
    this.personService = new PersonService()
    this.routes()
  }

  public routes() {
    this.app.route('/person').get(this.personService.get)
    this.app.route('/person').post(this.personService.post)
    this.app.route('/person').delete(this.personService.delete)
  }
}