const controller = require('../controllers/backup-controller')

module.exports = async (app) => {
  const router = require('express').Router()

  router.get('/backup', controller.createBackup)

  router.get('/restore', controller.restoreBackup)

  app.use('/', router)
}
