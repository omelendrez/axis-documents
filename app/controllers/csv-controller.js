const { createFile } = require('../middleware/csv-middleware')
const { log } = require('../helpers/log')

exports.createCSVFile = async (req, res) => {
  try {
    const { fileName } = await createFile(req.body)

    await res.status(200).send({ fileName })
  } catch (err) {
    log.error(err)
    res.status(500).send(err)
  }
}
