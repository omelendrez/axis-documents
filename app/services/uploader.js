const fs = require('fs')
const sharp = require('sharp')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME
const awsS3BucketRegion = process.env.AWS_S3_BUCKET_REGION
const awsS3BucketAccessKey = process.env.AWS_S3_BUCKET_ACCESS_KEY
const awsS3BucketSecretAccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsS3BucketAccessKey,
    secretAccessKey: awsS3BucketSecretAccessKey
  },
  region: awsS3BucketRegion
})

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
        const fileOperation = await sharp(inputFile).withMetadata()
        const fileExtension = inputFile.split('.').pop()
        let buffer
        let contentType
        switch (fileExtension) {
          case 'jpg':
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

            buffer = await fileOperation.toBuffer()
            contentType = 'image/jpeg'
            break

          case 'pdf':
            buffer = fs.readFileSync(inputFile)
            contentType = 'application/pdf'
            break
        }

        const { mimetype, size } = buffer

        const params = {
          Bucket: awsS3BucketName,
          Key: outputFile,
          Body: buffer,
          ContentType: contentType,
          ContentDisposition: 'inline',
          ContentEncoding: 'base64'
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)

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
