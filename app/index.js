require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const helmet = require('helmet')

const { log } = require('./helpers/log')
const logger = require('morgan')
const { listEndpoints } = require('./helpers/routes')

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

app.use(limiter)

app.disable('x-powered-by')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  logger('dev', {
    skip: () => process.env.NODE_ENV === 'production'
  })
)

app.use(express.static('exports'))
app.use(express.static('uploads'))

require('./routes')(app)

app.get('*', (req, res) => {
  res.send({ message: 'Welcome to axis-documents api 👌' })
})

app.use(helmet())

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
