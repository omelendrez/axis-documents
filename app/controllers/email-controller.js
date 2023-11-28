const fs = require('node:fs')
const path = require('node:path')

const EmailService = require('../services/EmailService')
const { log } = require('../helpers/log')
const isValidEmail = require('../helpers/validations')

exports.sendWelcomeLetter = async (req, res) => {
  try {
    const emailService = new EmailService()
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

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'exports',
      'welcome-letter',
      filename
    )

    const fileContent = await fs.createReadStream(filePath)

    const email = {
      to,
      bcc: process.env.SMTP_SERVER_BCC,
      subject: 'COURSE JOINING INSTRUCTIONS',
      html: body,
      attachments: [
        {
          // utf-8 string as an attachment
          filename,
          content: fileContent
        }
      ]
    }
    emailService.sendEmail(email)
    res.status(200).send({ ...email, message: 'Email sent successfully!' })
  } catch (error) {
    console.log(error)
    log.error(error)
    res.status(500).send(error)
  }
}
