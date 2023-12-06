const controller = require('../controllers/upload-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  const upload = middleware.upload

  // Pictures

  router.post(
    process.env.PICTURE_ENDPOINT,
    upload.single('file'),
    controller.uploadPicture
  )

  // Learner Id Cards

  router.post(
    process.env.LEARNER_ID_ENDPOINT,
    upload.single('file'),
    controller.uploadLearnerIdCard
  )

  // FOET

  router.post(
    process.env.FOET_ENDPOINT,
    upload.single('file'),
    controller.uploadPreviousFOET
  )

  // Payments

  router.post(
    process.env.PAYMENT_ENDPOINT,
    upload.single('file'),
    controller.uploadPayment
  )

  // Opito

  router.post(
    `${process.env.OPITO_ENDPOINT}/upload`,
    upload.single('file'),
    controller.uploadOpitoCertificate
  )

  app.use('/', router)
}
