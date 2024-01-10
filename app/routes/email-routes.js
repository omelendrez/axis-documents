const controller = require('../controllers/email-controller')
const middleware = require('../middleware/pdf-middleware')

module.exports = async (app) => {
  const router = require('express').Router()
  const pdf = middleware.pdf

  router.post(
    `${process.env.EMAIL_ENDPOINT}/welcome-letter`,
    pdf.none(),
    controller.sendWelcomeLetter
  )

  router.post(
    `${process.env.EMAIL_ENDPOINT}/error-tracking`,
    pdf.none(),
    controller.sendError
  )

  app.use('/', router)
}
