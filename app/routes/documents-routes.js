const controller = require('../controllers/documents-contoller')

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

  // Get

  router.get(`${process.env.PICTURE_ENDPOINT}/:fileName`, controller.getPicture)

  router.get(
    `${process.env.LEARNER_ID_ENDPOINT}/:fileName`,
    controller.getLearnerId
  )

  router.get(`${process.env.FOET_ENDPOINT}/:fileName`, controller.getPrevFoet)

  router.get(`${process.env.PAYMENT_ENDPOINT}/:fileName`, controller.getPayment)

  router.get(
    `${process.env.PDF_CERTIFICATE_ENDPOINT}/:fileName`,
    controller.getCertificate
  )

  router.get(
    `${process.env.WELCOME_LETTER_ENDPOINT}/:fileName`,
    controller.getWelcomeLetter
  )

  router.get(
    `${process.env.PDF_ID_CARD_ENDPOINT}/:fileName`,
    controller.getIdCard
  )

  app.use('/', router)
}
