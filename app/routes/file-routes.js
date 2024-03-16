const controller = require('../controllers/file-controller')

module.exports = (app) => {
  const router = require('express').Router()

  // Exists

  router.get(
    `${process.env.PICTURE_ENDPOINT}/:fileName/exists`,
    controller.getPictureExists
  )

  router.get(
    `${process.env.LEARNER_ID_ENDPOINT}/:fileName/exists`,
    controller.getLearnerIdExists
  )

  router.get(
    `${process.env.FOET_ENDPOINT}/:fileName/exists`,
    controller.getPrevFoetExists
  )

  router.get(
    `${process.env.PAYMENT_ENDPOINT}/:fileName/exists`,
    controller.getPaymentExists
  )

  router.get(
    `${process.env.PDF_CERTIFICATE_ENDPOINT}/:fileName/exists`,
    controller.getCertificateExists
  )

  router.get(
    `${process.env.WELCOME_LETTER_ENDPOINT}/:fileName/exists`,
    controller.getWelcomeLetterExists
  )

  router.get(
    `${process.env.PDF_ID_CARD_ENDPOINT}/:fileName/exists`,
    controller.getIdCardExists
  )

  app.use('/', router)
}
