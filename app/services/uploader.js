const fs = require('fs')
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
          processPdfFile(outputFile, fileName)
            .then((res) => resolve(res))
            .catch((error) => reject(error))
          break

        case 'sql':
          processSqlFile(inputFile, outputFile, fileName)
            .then((res) => resolve(res))
            .catch((error) => reject(error))
      }
    } catch (error) {
      console.log(error)
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

        await sendToS3(fileDir, outputFile, fileName, 'image/jpeg')

        resolve(fileName)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )

const processPdfFile = (outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const fileDir = path.join(__dirname, '..', '..', outputFile)

        if (fs.existsSync(fileDir)) {
          await sendToS3(fileDir, outputFile, fileName, 'application/pdf')
          resolve(fileName)
        } else {
          console.log('not found', fileDir)
          reject(`File not found ${fileDir}`)
        }
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )

const processSqlFile = (inputFile, outputFile, fileName) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        if (fs.existsSync(inputFile)) {
          await sendToS3(inputFile, outputFile, fileName, 'application/x-sql')

          resolve(fileName)
        } else {
          console.log('not found', inputFile)
          reject(`File not found ${inputFile}`)
        }
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )
