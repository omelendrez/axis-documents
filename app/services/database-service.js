const path = require('path')
const { upload } = require('./uploader')
const { getTodayYMD } = require('../helpers/converters')

const sendFile = (fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      const today = getTodayYMD()

      const dirPath = path.join(
        __dirname,
        '..',
        '..',
        process.env.COMPRESS_TEMP_FOLDER
      )

      const inputFile = `${dirPath}/${fileName}`

      const outputFile = `database/${today}/${fileName}`

      resolve()

      upload(inputFile, outputFile, fileName)
        .then((info) => resolve(info))
        .catch((err) => reject(err))
    })()
  )

module.exports = { sendFile }
