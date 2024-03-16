const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')
const { sleep, SLEEP_TIMEOUT } = require('../helpers/constants')
const { api } = require('./api-service')

/**
 *
 * @param {object} inputFile
 * @param {string} outputFile
 * @param {string} fileName
 * @param {number} width
 * @param {number} height
 * @param {string} fit
 * @param {{number, number}} rotate
 * @param {boolean} isStream
 * @returns Promise
 */
exports.postProcess = (
  inputFile,
  outputFile,
  fileName,
  width,
  height,
  fit,
  rotate
) =>
  new Promise((resolve, reject) => {
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

        if (fs.existsSync(inputFile)) {
          fs.unlinkSync(inputFile)
        }

        await api.post('s3-document', { file: outputFile })

        await sleep(SLEEP_TIMEOUT)

        resolve(fileName)
      } catch (error) {
        reject(error)
      }
    })()
  )

const processPdfFile = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const fileDir = path.join(__dirname, '..', '..', inputFile)

        fs.renameSync(fileDir, outputFile)

        await api.post('s3-document', { file: outputFile })

        await sleep(SLEEP_TIMEOUT)

        if (fs.existsSync(outputFile)) {
          resolve(fileName)
        } else {
          reject(`File not found ${fileDir}`)
        }
      } catch (error) {
        reject(error)
      }
    })()
  )

const processSqlFile = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        if (fs.existsSync(inputFile)) {
          fs.unlinkSync(inputFile)

          await api.post('s3-document', { file: outputFile })

          await sleep(SLEEP_TIMEOUT)

          resolve(fileName)
        } else {
          reject(`File not found ${inputFile}`)
        }
      } catch (error) {
        reject(error)
      }
    })()
  )
