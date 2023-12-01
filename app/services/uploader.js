const sharp = require('sharp')
const { sendToS3 } = require('./s3-services')

exports.upload = (
  inputFile,
  outputFile,
  fileName,
  width,
  height,
  fit,
  rotate
) =>
  new Promise((resolve, reject) => {
    const fileExtension = inputFile.split('.').pop()

    switch (fileExtension) {
      case 'jpg':
        processImage(
          inputFile,
          outputFile,
          fileName,
          width,
          height,
          fit,
          rotate
        )
          .then((res) => resolve(res))
          .catch((error) => reject(error))
        break

      case 'pdf':
        processPdf(inputFile, outputFile)
          .then((res) => resolve(res))
          .catch((error) => reject(error))
    }
  })

const processImage = (
  inputFile,
  outputFile,
  fileName,
  width,
  height,
  fit,
  rotate
) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const fileOperation = await sharp(inputFile).withMetadata()

        sharp.cache(false)

        if (width || height || fit) {
          const resize = {}

          if (width) {
            resize.width = width
          }

          if (height) {
            resize.height = height
          }

          if (fit) {
            resize.fit = sharp.fit[fit]
          }

          fileOperation.resize(resize)
        }

        if (rotate) {
          fileOperation.rotate(rotate.angle, rotate.data)
        }

        await sendToS3(fileOperation, outputFile, fileName)

        resolve(fileName)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )

const processPdf = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      console.log(inputFile, outputFile)
      try {
        sendToS3(outputFile, outputFile, fileName, 'application/pdf')

        resolve(fileName)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )
