import path from 'path'
import mongoose from 'mongoose'
import fs from 'fs'
import { Seeder } from'mongo-seeding'

require('dotenv').config({ path: path.resolve(__dirname, `../environment/${process.env.NODE_ENV}.env`)})

const config = {
  database: process.env.MONGO_URI,
  inputPath: path.resolve(__dirname, './data'),
  dropDatabase: false
}
const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(path.resolve('./data'))

function initMongo() {
  try {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('Connected to: ' + process.env.MONGO_URI)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

async function main() {
  try {
    await seeder.import(collections)
    console.log('Seed complete!')
  } catch (err) {
    console.log(err)
  }
  process.exit(0)
}

main()