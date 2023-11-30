const {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand
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

module.exports = {
  s3,
  GetObjectCommand,
  HeadObjectCommand,
  awsS3BucketName,
  getSignedUrl
}
