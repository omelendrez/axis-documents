const controller = require('../controllers/test-controller')

module.exports = (app) => {
  const router = require('express').Router()

  router.get('/test', controller.runTest)

  app.use('/', router)
}
