const path = require('node:path')
const { upload } = require('./uploader')
const { api } = require('./api-service')

const sendFile = (fileName) =>
  new Promise((resolve, reject) => {
    const dirPath = path.join(
      __dirname,
      '..',
      '..',
      process.env.COMPRESS_TEMP_FOLDER
    )

    const inputFile = `${dirPath}/${fileName}`

    const outputFile = `database/${fileName}`

    upload(inputFile, outputFile, fileName)
      .then((info) => {
        api.post('s3-document', { file: outputFile })
        resolve(info)
      })
      .catch((err) => reject(err))
  })

module.exports = { sendFile }
