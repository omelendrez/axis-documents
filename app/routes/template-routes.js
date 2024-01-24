const controller = require('../controllers/upload-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  router.post(
    process.env.TEMPLATES_ENDPOINT,
    middleware.uploadHandler,
    controller.uploadTemplate
  )

  app.use('/', router)
}
