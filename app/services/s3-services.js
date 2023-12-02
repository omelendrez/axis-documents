const fs = require('fs')
const {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand
} = require('@aws-sdk/client-s3')

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const awsS3BucketRegion = process.env.AWS_S3_BUCKET_REGION
const awsS3BucketAccessKey = process.env.AWS_S3_BUCKET_ACCESS_KEY
const awsS3BucketSecretAccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY
const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsS3BucketAccessKey,
    secretAccessKey: awsS3BucketSecretAccessKey
  },
  region: awsS3BucketRegion
})

const sendToS3 = (inputFile, outputFile, fileName, contentType) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const buffer = await fs.readFileSync(inputFile)

        const params = {
          Bucket: awsS3BucketName,
          Key: outputFile,
          Body: buffer,
          ContentType: contentType,
          ContentDisposition: 'inline',
          ContentEncoding: 'base64'
        }

        const command = await new PutObjectCommand(params)

        await s3.send(command)

        await fs.unlinkSync(inputFile)

        const { mimetype, size } = buffer

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

const checkDocument = (file) =>
  (async () => {
    const params = {
      Bucket: awsS3BucketName,
      Key: file
    }

    const head = await new HeadObjectCommand(params)

    await s3.send(head)
  })()

const getDocumentUrl = (file) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const params = {
          Bucket: awsS3BucketName,
          Key: file
        }

        const command = new GetObjectCommand(params)

        const url = await getSignedUrl(s3, command, {
          expiresIn: 36000
        })

        resolve(url)
      } catch (error) {
        reject(error)
      }
    })()
  )

module.exports = {
  s3,
  GetObjectCommand,
  HeadObjectCommand,
  awsS3BucketName,
  getSignedUrl,
  sendToS3,
  checkDocument,
  getDocumentUrl
}
