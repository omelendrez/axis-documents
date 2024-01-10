const { createFile } = require('../middleware/csv-middleware')
const { log } = require('../helpers/log')
const { sendError } = require('../errors/error-monitoring')

exports.createCSVFile = async (req, res) => {
  try {
    const { fileName } = await createFile(req.body)

    await res.status(200).send({ fileName })
  } catch (err) {
    sendError('csv.createCSVFile', err)
    log.error(err)
    res.status(500).send(err)
  }
}
