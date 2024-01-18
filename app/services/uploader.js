const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')
const { sendToS3 } = require('./s3-services')

/**
 *
 * @param {string/sream} inputFile
 * @param {string} outputFile
 * @param {string} fileName
 * @param {number} width
 * @param {number} height
 * @param {string} fit
 * @param {{number, number}} rotate
 * @param {boolean} isStream
 * @returns Promise
 */
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
          processImageFile(
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
          processPdfFile(inputFile, outputFile, fileName)
            .then((res) => resolve(res))
            .catch((error) => reject(error))
          break

        case 'sql':
          processSqlFile(inputFile, outputFile, fileName)
            .then((res) => resolve(res))
            .catch((error) => reject(error))
      }
    } catch (error) {
      reject(error)
    }
  })

const processImageFile = (
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

        await fileOperation.toFile(outputFile)

        const fileDir = path.join(__dirname, '..', '..', outputFile)

        sendToS3(fileDir, outputFile, fileName, 'image/jpeg')
          .then(() => resolve(fileName))
          .catch((err) => reject(err))
      } catch (error) {
        reject(error)
      }
    })()
  )

const processPdfFile = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) => {
    const fileDir = path.join(__dirname, '..', '..', inputFile)

    if (fs.existsSync(fileDir)) {
      sendToS3(fileDir, outputFile, fileName, 'application/pdf')
        .then(() => resolve(fileName))
        .catch((err) => reject(err))
    } else {
      reject(`File not found ${fileDir}`)
    }
  })

const processSqlFile = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(inputFile)) {
      sendToS3(inputFile, outputFile, fileName, 'application/x-sql')
        .then(() => resolve(fileName))
        .catch((err) => reject(err))
    } else {
      reject(`File not found ${inputFile}`)
    }
  })
