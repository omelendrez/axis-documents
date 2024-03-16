const { getFileName } = require('../helpers/converters')
const { postProcess } = require('../services/uploader')
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

  postProcess(inputFile, outputFile, fileName, width, height)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadPicture', err)
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

  postProcess(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadLearnerIdCard', err)
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

  postProcess(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadPreviousFOET', err)
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

  postProcess(inputFile, outputFile, fileName)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadTemplate', err)
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

  postProcess(inputFile, outputFile, fileName)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadOpitoCertificate', err)
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

  postProcess(inputFile, outputFile, fileName, width)
    .then((info) => res.send(info))
    .catch((err) => {
      sendError('postProcess.uploadPayment', err)
      console.log(err)
      res.status(500).send(err)
    })
}
