const fs = require('fs')
const sharp = require('sharp')

exports.upload = (
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
        sharp.cache(false)
        const fileOperation = await sharp(inputFile).withMetadata()

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

        const { mimetype, size } = await fileOperation.toFile(outputFile)

        await fs.unlinkSync(inputFile)

        resolve({
          message: 'File is uploaded.',
          data: {
            name: fileName,
            mimetype,
            size
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })()
  )
