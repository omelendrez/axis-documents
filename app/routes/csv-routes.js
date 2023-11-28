const controller = require('../controllers/csv-controller')
const middleware = require('../middleware/pdf-middleware')

module.exports = async (app) => {
  const router = require('express').Router()

  // CSV file

  const pdf = middleware.pdf

  router.post(process.env.CSV_ENDPOINT, pdf.none(), controller.createCSVFile)

  app.use('/', router)
}
