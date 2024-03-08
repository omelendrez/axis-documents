require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { log } = require('./helpers/log')
const logger = require('morgan')
const { listEndpoints } = require('./helpers/routes')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  logger('dev', {
    skip: () => process.env.NODE_ENV === 'production'
  })
)

require('./routes')(app)

app.use(express.static('exports/opito/csv'))

app.get('*', (req, res) => {
  res.send({ message: 'Welcome to axis-documents api 👌' })
})

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

if (process.env.NODE_ENV !== 'production') {
  listEndpoints(app, '')
  log.info(process.env.NODE_ENV || 'development')
} else {
  log.error(process.env.NODE_ENV)
}
