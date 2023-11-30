const {
  s3,
  HeadObjectCommand,
  GetObjectCommand,
  awsS3BucketName,
  getSignedUrl
} = require('./s3-auth')

// const { urlToBuffer } = require('../helpers/converters')

exports.getDocumentExists = (file) =>
  new Promise((resolve) =>
    (async () => {
      try {
        const params = {
          Bucket: awsS3BucketName,
          Key: file
        }

        const head = await new HeadObjectCommand(params)

        await s3.send(head)
        resolve({ exists: true })
      } catch (error) {
        resolve({ exists: false })
      }
    })()
  )

exports.getDocument = (file) =>
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

        // const imageBuffer = await urlToBuffer(url)

        resolve(url)
      } catch (error) {
        reject(error)
      }
    })()
  )
