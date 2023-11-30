const controller = require('../controllers/documents-contoller')

module.exports = async (app) => {
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

  app.use('/', router)
}
