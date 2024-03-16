const EmailService = require('../services/EmailService')
const strategy = require('../services/emailHandler')

const sendError = (controller, error) => {
  const err = JSON.stringify(error, null, 2)
  const body = `<p>Dear <b>Omar</b>,</p>
  <p>The server has detected the following error:</b></p>
  <p>Controller: <code>${controller}<code></p>
  <p><code>${err}<code></p>
  <br/><br/>
  <p><b>From Documents Microservice</b></p>
  `

  const emailService = new EmailService(strategy.sendErrorEmailHandler)

  const email = {
    to: process.env.SMTP_SERVER_FROM,
    subject: 'Axis Documents Microservice error found',
    html: body
  }

  emailService.sendEmail(email)
}

module.exports = { sendError }
