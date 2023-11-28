const assert = require('assert').strict
const nodemailer = require('nodemailer')

assert.ok(
  process.env.SMTP_SERVER_DOMAIN,
  'The "SMTP_SERVER_DOMAIN" environment variable is required'
)

assert.ok(
  process.env.SMTP_SERVER_PORT,
  'The "SMTP_SERVER_PORT" environment variable is required'
)

assert.ok(
  process.env.SMTP_SERVER_USERNAME,
  'The "SMTP_SERVER_USERNAME" environment variable is required'
)

assert.ok(
  process.env.SMTP_SERVER_PASSWORD,
  'The "SMTP_SERVER_PASSWORD" environment variable is required'
)

assert.ok(
  process.env.SMTP_SERVER_FROM,
  'The "SMTP_SERVER_FROM" environment variable is required'
)

const poolTransporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_SERVER_DOMAIN,
  port: process.env.SMTP_SERVER_PORT,
  secure: true, // use TLS
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD
  }
})

exports.sendEmailHandler = (email) => {
  return new Promise((resolve, reject) => {
    const from = process.env.SMTP_SERVER_FROM

    const newEmail = { ...email, from }

    poolTransporter.sendMail(newEmail, (err, info) => {
      if (err) {
        reject(err)
      }

      resolve(info)
    })
  })
}
