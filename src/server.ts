import app from './app'
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, `../environment/${process.env.NODE_ENV}.env`)})

app.listen(process.env.PORT || '3000', () => {
  console.log(`Listening on port ${process.env.PORT}`)
})