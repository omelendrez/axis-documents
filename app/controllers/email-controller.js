const EmailService = require('../services/EmailService')
const { log } = require('../helpers/log')
const isValidEmail = require('../helpers/validations')
const ErrorMonitoring = require('../errors/error-monitoring')
const { getFileExists } = require('../services/file-service')
const {
  sendEmailHandler,
  sendErrorEmailHandler
} = require('../services/emailHandler')
const { getDocumentEndpoint } = require('../helpers/converters')

exports.sendError = async (req, res) => {
  try {
    const emailService = new EmailService(sendErrorEmailHandler)

    const { controller, error } = req.body

    const body = `<p>Dear <b>Omar</b>,</p>
    <p>The server has detected the following error:</b></p>
    <p>Controller: <code>${controller}<code></p>
    <p><code>${error}<code></p>
    <br/><br/>
    <p><b>From Document server</b></p>
    `

    const email = {
      to: 'omar.melendrez@gmail.com',
      subject: 'Axis Backend server error found',
      html: body
    }

    emailService.sendEmail(email)

    res.status(200).send({ ...email, message: 'Email sent successfully!' })
  } catch (error) {
    console.log(error)
    log.error(error)
    res.status(500).send(error)
  }
}

exports.sendWelcomeLetter = async (req, res) => {
  try {
    const emailService = new EmailService(sendEmailHandler)
    const message = req.body

    const { to, course, filename, full_name: fullName } = message

    if (!isValidEmail(to)) {
      return res.status(400).send({
        message: `Invalid email address [${to}]`
      })
    }

    const { name: courseName } = course

    const body = `<p>Dear <b>${fullName}</b>,</p>
    <p>Thank you for registering for the <b>${courseName}</b> Course at Tolmann Allied Services Company Limited.</p>
    <p>You can find attached a document with the respective instructions for the Course.
    <br/><br/>
    <p><b>Management.</b>
    <p><i>Tolmann Allied Services Company Ltd</i></p>
    `

    const filePath = `${process.env.WELCOME_LETTER_FOLDER}/${filename}`

    getFileExists(filePath).then(async () => {
      const documentUrl = getDocumentEndpoint(filePath)
      const email = {
        to,
        subject: 'COURSE JOINING INSTRUCTIONS',
        html: body,
        attachments: [
          {
            filename,
            path: documentUrl
          }
        ]
      }
      await emailService.sendEmail(email)
      res.status(200).send({ ...email, message: 'Email sent successfully!' })
    })
  } catch (error) {
    ErrorMonitoring.sendError('email.sendWelcomeLetter', error)
    console.log(error)
    log.error(error)
    res.status(500).send(error)
  }
}
