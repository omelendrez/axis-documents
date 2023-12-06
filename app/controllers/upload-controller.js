const { log } = require('../helpers/log')
const { getFileName } = require('../helpers/converters')
const { upload } = require('../services/uploader')
const { sleep } = require('../helpers/constants')

exports.uploadPicture = async (req, res) => {
  try {
    const photo = await req.file
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

    await sleep(1000)

    upload(inputFile, outputFile, fileName, width, height)
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadLearnerIdCard = async (req, res) => {
  try {
    const idCard = await req.file
    if (!idCard) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, idCard)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.LEARNER_ID_FOLDER}/${fileName}`

    await sleep(1000)

    upload(inputFile, outputFile, fileName)
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadPreviousFOET = async (req, res) => {
  try {
    const image = await req.file
    if (!image) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, image)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.FOET_FOLDER}/${fileName}`

    await sleep(1000)

    upload(inputFile, outputFile, fileName)
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadTemplate = async (req, res) => {
  try {
    const background = await req.file
    if (!background) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, background)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.FOET_FOLDER}/${fileName}`

    const height = parseInt(process.env.FOET_HEIGHT, 10)

    await sleep(1000)

    upload(inputFile, outputFile, fileName, null, height, 'contain')
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadOpitoCertificate = async (req, res) => {
  try {
    const document = await req.file
    if (!document) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, document)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.PDF_CERTIFICATE_FOLDER}/${fileName}`

    await sleep(1000)

    upload(inputFile, outputFile, fileName)
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadPayment = async (req, res) => {
  try {
    const image = await req.file
    if (!image) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, image)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.PAYMENT_FOLDER}/${fileName}`

    await sleep(1000)

    upload(inputFile, outputFile, fileName)
      .then((info) => res.send(info))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}
