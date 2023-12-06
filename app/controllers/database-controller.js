const { sendFile } = require('../services/database-service')
const { log } = require('../helpers/log')
const { getFileName } = require('../helpers/converters')
const { sleep } = require('../helpers/constants')

exports.sendFile = async (req, res) => {
  try {
    const data = await req.file

    if (!data) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, data)

    await sleep(1000)

    const resp = await sendFile(fileName)

    res.send(resp)
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}
