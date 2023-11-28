const controller = require('../controllers/pdf-controller')
const middleware = require('../middleware/pdf-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  const pdf = middleware.pdf

  // Certificate

  router.post(
    `${process.env.PDF_CERTIFICATE_ENDPOINT}/:id`,
    pdf.none(),
    controller.createCertificate
  )

  router.get(
    `${process.env.PDF_CERTIFICATE_ENDPOINT}/:fileName/exists`,
    controller.certificateExists
  )

  // Id Card

  router.post(
    `${process.env.PDF_ID_CARD_ENDPOINT}/:id`,
    pdf.none(),
    controller.createIdCard
  )

  router.get(
    `${process.env.PDF_ID_CARD_ENDPOINT}/:fileName/exists`,
    controller.idCardExists
  )

  // Welcome Letter

  router.post(
    `${process.env.WELCOME_LETTER_ENDPOINT}/:id`,
    pdf.none(),
    controller.createWelcomeLetter
  )

  router.get(
    `${process.env.WELCOME_LETTER_ENDPOINT}/:fileName/exists`,
    controller.welcomeLetterExists
  )

  app.use('/', router)
}
