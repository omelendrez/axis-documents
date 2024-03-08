const EventEmitter = require('events')
const { log } = require('../helpers/log')

class EmailService extends EventEmitter {
  _handler = null

  constructor(handler) {
    super()
    this._handler = handler
  }

  async sendEmail(email) {
    try {
      await this._handler(email)
    } catch (error) {
      console.log(error)
      log.error(error)
    }
  }
}

module.exports = EmailService
