const { getFileName } = require('../helpers/converters')
const { upload } = require('../services/uploader')
const { sendError } = require('../errors/error-monitoring')

exports.uploadPicture = (req, res) => {
  const photo = req.file
  if (!photo) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, photo)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.PICTURE_FOLDER}/${fileName}`

  const width = parseInt(process.env.PICTURE_WIDTH, 10)
  const height = parseInt(process.env.PICTURE_HEIGHT, 10)

  upload(inputFile, outputFile, fileName, width, height)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadPicture', err)
      console.log(err)
      res.status(500).send(err)
    })
}

exports.uploadLearnerIdCard = (req, res) => {
  const idCard = req.file
  if (!idCard) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, idCard)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.LEARNER_ID_FOLDER}/${fileName}`

  const width = 1000

  upload(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadLearnerIdCard', err)
      console.log(err)
      res.status(500).send(err)
    })
}

exports.uploadPreviousFOET = (req, res) => {
  const image = req.file
  if (!image) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, image)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.FOET_FOLDER}/${fileName}`

  const width = 1000

  upload(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadPreviousFOET', err)
      console.log(err)
      res.status(500).send(err)
    })
}

exports.uploadTemplate = (req, res) => {
  const background = req.file
  if (!background) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, background)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.FOET_FOLDER}/${fileName}`

  const height = parseInt(process.env.FOET_HEIGHT, 10)

  upload(inputFile, outputFile, fileName, null, height, 'contain')
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadTemplate', err)
      console.log(err)
      res.status(500).send(err)
    })
}

exports.uploadOpitoCertificate = (req, res) => {
  const document = req.file
  if (!document) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, document)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.PDF_CERTIFICATE_FOLDER}/${fileName}`

  upload(inputFile, outputFile, fileName)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadOpitoCertificate', err)
      console.log(err)
      res.status(500).send(err)
    })
}

exports.uploadPayment = (req, res) => {
  const image = req.file
  if (!image) {
    return res.status(400).send({
      message: 'No file is selected.'
    })
  }

  const fileName = getFileName(req.body.name, image)

  const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
  const outputFile = `${process.env.PAYMENT_FOLDER}/${fileName}`

  const width = 1000

  upload(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('upload.uploadPayment', err)
      console.log(err)
      res.status(500).send(err)
    })
}
