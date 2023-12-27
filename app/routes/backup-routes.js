const controller = require('../controllers/database-controller')
const middleware = require('../middleware/upload-middleware')

module.exports = (app) => {
  const router = require('express').Router()

  const upload = middleware.upload

  router.post('/database', upload.single('file'), controller.sendFile)

  app.use('/', router)
}
