const path = require('path')
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
    try {
      const fileExtension = outputFile.split('.').pop()

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
          processPdf(outputFile, fileName)
            .then((res) => resolve(res))
            .catch((error) => reject(error))
      }
    } catch (error) {
      console.log(error)
      reject(error)
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
        console.log({
          inputFile,
          outputFile,
          fileName,
          width,
          height,
          fit,
          rotate
        })

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

        await fileOperation.toFile(outputFile)

        const fileDir = path.join(__dirname, '..', '..', outputFile)

        await sendToS3(fileDir, outputFile, fileName, 'image/jpeg')

        resolve(fileName)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )

const processPdf = (outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const fileDir = path.join(__dirname, '..', '..', outputFile)

        await sendToS3(fileDir, outputFile, fileName, 'application/pdf')

        resolve(fileName)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )
