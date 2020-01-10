import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import { $log, ServerLoader, ServerSettings } from '@tsed/common'
import '@tsed/mongoose'

require('dotenv').config({ path: path.resolve(__dirname, `../environment/${process.env.NODE_ENV}.env`)})

// const session = require('express-session')
const ROOT_DIR = path.resolve(__dirname)
@ServerSettings({
  rootDir: ROOT_DIR,
  port: process.env.PORT,
  mount: {
    '/': `${ROOT_DIR}/controllers/**/*.ts`
  },
  passport: {},
  mongoose: {
    url: process.env.MONGO_URI,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  debug: false, // process.env.NODE_ENV === 'development'
  acceptMimes: ['application/json']
})
export class Server extends ServerLoader {
  public $beforeRoutesInit(): void|Promise<any> {
    const methodOverride = require('method-override')

    this
      .use(methodOverride())
      .use(cors())
      .use(bodyParser.json({ limit: '50mb' }))
      .use(bodyParser.urlencoded({ limit: '50mb', extended:true}))
      // .use(session({
      //   secret: process.env.JWT_SECRET,
      //   resave: true,
      //   saveUninitialized: true,
      //   maxAge: process.env.JWT_EXPIRATION,
      //   cookie: {}
      // }))

    return
  }
}

async function bootstrap() {
  try {
    $log.debug('Start server...')
    const server = await ServerLoader.bootstrap(Server)
    await server.listen()
    $log.debug('Server initialized')
  } catch (er) {
    $log.error(er)
  }
}

bootstrap()