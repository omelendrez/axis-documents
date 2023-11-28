const EventEmitter = require('events')
const { sendEmailHandler } = require('./emailHandler')
const { log } = require('../helpers/log')

class EmailService extends EventEmitter {
  constructor() {
    super()
  }

  async sendEmail(email) {
    try {
      const response = await sendEmailHandler(email)
      this.emit('emailSent', response)
    } catch (error) {
      console.log(error)
      log.error(error)
    }
  }
}

module.exports = EmailService
