require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { log } = require('./helpers/log')
const logger = require('morgan')
const { listEndpoints } = require('./helpers/routes')
const EmailService = require('./services/EmailService')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  logger('dev', {
    skip: () => process.env.NODE_ENV === 'production'
  })
)

app.use(express.static('uploads'))
app.use(express.static('exports'))

require('./routes')(app)

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}.`)
})

const emailService = new EmailService()

if (process.env.NODE_ENV !== 'production') {
  listEndpoints(app, '')
  console.log(process.env.NODE_ENV)
}

emailService.on('emailSent', (email) => {
  const { to, subject } = email
  console.log(`Email sent to ${to} with subject ${subject}`)
})
