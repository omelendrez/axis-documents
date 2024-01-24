const controller = require('../controllers/database-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = (app) => {
  const router = require('express').Router()

  router.post('/database', middleware.uploadHandler, controller.sendFile)

  app.use('/', router)
}
