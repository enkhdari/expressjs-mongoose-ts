import express, { Application } from 'express'
import { ApplicationController } from './controllers/app.controller'
import { PersonController } from './controllers/person.controller'
import { MONGO_URI } from './constant/environment.constant'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

class App {
  public app: Application
  public personController: PersonController;
  public applicationController: ApplicationController;

  constructor() {
    this.app = express()
    this.setConfig()
    this.setMongoConfig()
    this.personController = new PersonController(this.app)
    this.applicationController = new ApplicationController(this.app)
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}))
    this.app.use(cors())
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB running on: ' + MONGO_URI)
  }
}

export default new App().app