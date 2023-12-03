const controller = require('../controllers/test-controller')

module.exports = async (app) => {
  const router = require('express').Router()

  router.get('/test', controller.runTest)

  app.use('/', router)
}
