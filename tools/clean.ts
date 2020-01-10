import path from 'path'
const mongoose = require('mongoose')
import fs from 'fs'

require('dotenv').config({ path: path.resolve(__dirname, `../environment/${process.env.NODE_ENV}.env`)})

function getModelName(name) {
  return name.split('.')[0]
}

async function clean() {
  try {
    for (const name of fs.readdirSync('./src/models')) {
      const model = getModelName(name)
      if (model && model !== 'base' ) {
        if (mongoose.connection.db.collection(model)) {
          await mongoose.connection.db.collection(model).deleteMany({})
        }
      }
    }
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.once('open', async () => {
  console.log('Connected to: ' + process.env.MONGO_URI)
  clean()
})