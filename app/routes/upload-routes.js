const controller = require('../controllers/upload-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  const upload = middleware.upload

  // Pictures

  router.get(
    `${process.env.PICTURE_ENDPOINT}/:fileName/exists`,
    controller.pictureExists
  )

  router.post(
    process.env.PICTURE_ENDPOINT,
    upload.single('file'),
    controller.uploadPicture
  )

  // Learner Id Cards

  router.get(
    `${process.env.LEARNER_ID_ENDPOINT}/:fileName/exists`,
    controller.learnerIdCardExists
  )

  router.post(
    process.env.LEARNER_ID_ENDPOINT,
    upload.single('file'),
    controller.uploadLearnerIdCard
  )

  router.post(
    `${process.env.LEARNER_ID_ENDPOINT}/restore`,
    upload.single('file'),
    controller.uploadLearnerIdCardRestore
  )

  // FOET

  router.get(
    `${process.env.FOET_ENDPOINT}/:fileName/exists`,
    controller.previouseFOETExists
  )

  router.post(
    process.env.FOET_ENDPOINT,
    upload.single('file'),
    controller.uploadPreviousFOET
  )

  // Payments

  router.get(
    `${process.env.PAYMENT_ENDPOINT}/:fileName/exists`,
    controller.paymentExists
  )

  router.post(
    process.env.PAYMENT_ENDPOINT,
    upload.single('file'),
    controller.uploadPayment
  )

  // Opito

  router.post(
    `${process.env.OPITO_ENDPOINT}/upload`,
    upload.single('file'),
    controller.uploadCertificate
  )

  app.use('/', router)
}
