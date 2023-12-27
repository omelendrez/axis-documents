const controller = require('../controllers/pdf-controller')
const middleware = require('../middleware/pdf-middleware')

module.exports = (app) => {
  const router = require('express').Router()

  const pdf = middleware.pdf

  // Certificate

  router.post(
    `${process.env.PDF_CERTIFICATE_ENDPOINT}/:id`,
    pdf.none(),
    controller.createCertificate
  )

  // Id Card

  router.post(
    `${process.env.PDF_ID_CARD_ENDPOINT}/:id`,
    pdf.none(),
    controller.createIdCard
  )

  // Welcome Letter

  router.post(
    `${process.env.WELCOME_LETTER_ENDPOINT}/:id`,
    pdf.none(),
    controller.createWelcomeLetter
  )

  app.use('/', router)
}
