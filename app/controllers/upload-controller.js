const fs = require('fs')
const { log } = require('../helpers/log')
const { getFileName } = require('../helpers/converters')
const { upload } = require('../services/uploader')

exports.pictureExists = async (req, res) => {
  const file = `${process.env.PICTURE_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
}

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

    upload(inputFile, outputFile, fileName, width, height)
      .then((info) => res.send(info))
      .catch((err) => res.status(500).send(err))
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.learnerIdCardExists = async (req, res) => {
  const file = `${process.env.LEARNER_ID_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
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

    const width = parseInt(process.env.LEARNER_ID_WIDTH, 10)
    const height = parseInt(process.env.LEARNER_ID_HEIGHT, 10)

    const rotate = {
      angle: -90,
      data: {
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    }

    upload(inputFile, outputFile, fileName, width, height, null, rotate)
      .then((info) => res.send(info))
      .catch((err) => res.status(500).send(err))
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.previouseFOETExists = async (req, res) => {
  const file = `${process.env.FOET_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
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

    const height = parseInt(process.env.FOET_HEIGHT, 10)

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

    upload(inputFile, outputFile, fileName, null, height, 'contain')
      .then((info) => res.send(info))
      .catch((err) => res.status(500).send(err))
  } catch (err) {
    console.error(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadCertificate = async (req, res) => {
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

    fs.rename(inputFile, outputFile, () =>
      res.send({
        message: 'Document uploaded successfully',
        inputFile,
        outputFile
      })
    )
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.paymentExists = async (req, res) => {
  const file = `${process.env.PAYMENT_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
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

    fs.rename(inputFile, outputFile, () =>
      res.send({
        message: 'Document uploaded successfully',
        inputFile,
        outputFile
      })
    )
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.uploadLearnerIdCardRestore = async (req, res) => {
  try {
    const image = await req.file
    if (!image) {
      return res.status(400).send({
        message: 'No file is selected.'
      })
    }

    const fileName = getFileName(req.body.name, image)

    const inputFile = `${process.env.COMPRESS_TEMP_FOLDER}/${fileName}`
    const outputFile = `${process.env.LEARNER_ID_FOLDER}/${fileName}`

    fs.rename(inputFile, outputFile, () =>
      res.send({
        message: 'Document uploaded successfully',
        inputFile,
        outputFile
      })
    )
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}
