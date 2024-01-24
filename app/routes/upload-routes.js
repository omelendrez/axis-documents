const controller = require('../controllers/upload-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  // Pictures

  router.post(
    process.env.PICTURE_ENDPOINT,
    middleware.uploadHandler,
    controller.uploadPicture
  )

  // Learner Id Cards

  router.post(
    process.env.LEARNER_ID_ENDPOINT,
    middleware.uploadHandler,
    controller.uploadLearnerIdCard
  )

  // FOET

  router.post(
    process.env.FOET_ENDPOINT,
    middleware.uploadHandler,
    controller.uploadPreviousFOET
  )

  // Payments

  router.post(
    process.env.PAYMENT_ENDPOINT,
    middleware.uploadHandler,
    controller.uploadPayment
  )

  // Opito

  router.post(
    `${process.env.OPITO_ENDPOINT}/upload`,
    middleware.uploadHandler,
    controller.uploadOpitoCertificate
  )

  app.use('/', router)
}
