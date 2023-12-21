const path = require('path')
const { upload } = require('./uploader')
const { api } = require('./api-service')

const sendFile = (fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      const dirPath = path.join(
        __dirname,
        '..',
        '..',
        process.env.COMPRESS_TEMP_FOLDER
      )

      const inputFile = `${dirPath}/${fileName}`

      const outputFile = `database/${fileName}`

      resolve()

      upload(inputFile, outputFile, fileName)
        .then((info) => {
          api.post('s3-document', { file: outputFile })
          resolve(info)
        })
        .catch((err) => reject(err))
    })()
  )

module.exports = { sendFile }
