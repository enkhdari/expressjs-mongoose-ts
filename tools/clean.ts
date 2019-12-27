import path from 'path'
import mongoose from 'mongoose'
import fs from 'fs'

require('dotenv').config({ path: path.resolve(__dirname, `../environment/${process.env.NODE_ENV}.env`)})

const models = fs.readdirSync('./src/models').filter(file => {
  return removeExtensionFromFile(file)
})

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

function removeExtensionFromFile(filename: string) {
  return filename.split('.').slice(0, -1).join('.').toString()
}

function deleteModelFromDB(modelName: any) {
  return new Promise((resolve, reject) => {
    const model = require(`../src/models/${modelName}`).default
    console.log(model)
    model.deleteMany({}, (err: Error, row: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

async function clean() {
  try {
    const promiseArray = models.map(
      async model => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

initMongo()
clean()