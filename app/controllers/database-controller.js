const { sendFile } = require('../services/database-service')
const { log } = require('../helpers/log')
const { getFileName } = require('../helpers/converters')
const { sleep, SLEEP_TIMEOUT } = require('../helpers/constants')
const { sendError } = require('../errors/error-monitoring')

exports.sendFile = async (req, res) => {
  try {
    const data = await req.file

    if (!data) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, data)

    await sleep(SLEEP_TIMEOUT)

    const resp = await sendFile(fileName)

    res.send(resp)
  } catch (err) {
    sendError('database.sendFile', err)
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}
