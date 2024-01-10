const EmailService = require('../services/EmailService')

const sendError = (controller, error) => {
  const err = JSON.stringify(error, null, 2)
  const body = `<p>Dear <b>Omar</b>,</p>
  <p>The server has detected the following error:</b></p>
  <p>Controller: <code>${controller}<code></p>
  <p><code>${err}<code></p>
  <br/><br/>
  <p><b>From Document server</b></p>
  `

  const emailService = new EmailService()

  const email = {
    to: 'omar.melendrez@gmail.com',
    bcc: process.env.SMTP_SERVER_BCC,
    subject: 'Axis Documents server error found',
    html: body
  }

  emailService.sendEmail(email)
}

module.exports = { sendError }
