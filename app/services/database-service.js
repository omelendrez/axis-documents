const path = require('node:path')
const { postProcess } = require('./uploader')

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

    postProcess(inputFile, outputFile, fileName)
      .then((info) => {
        resolve(info)
      })
      .catch((err) => reject(err))
  })

module.exports = { sendFile }
