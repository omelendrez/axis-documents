/* eslint-disable no-unused-vars */
// Importing modules

const fs = require('fs')

const { log } = require('../helpers/log')

const { CERT_TYPE } = require('../helpers/constants')

const {
  generateStandardCertificate,
  generateNimasaCertificate
} = require('../middleware/certificate-middleware')
const {
  generateStandardIdCard,
  generateOpitoIdCard
} = require('../middleware/id-card-middleware')
const { welcome } = require('../middleware/welcome-middleware')

exports.certificateExists = async (req, res) => {
  const file = `${process.env.PDF_CERTIFICATE_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
}

exports.idCardExists = async (req, res) => {
  const file = `${process.env.PDF_ID_CARD_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
}

exports.welcomeLetterExists = async (req, res) => {
  const file = `${process.env.WELCOME_LETTER_FOLDER}/${req.params.fileName}`

  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      return res.status(200).send({ exists: false })
    }

    res.status(200).send({ exists: true })
  })
}

exports.createCertificate = async (req, res) => {
  try {
    const {
      course: { cert_type }
    } = req.body

    let generateCertificate = null

    switch (parseInt(cert_type, 10)) {
      case CERT_TYPE.STANDARD:
        generateCertificate = generateStandardCertificate
        break
      case CERT_TYPE.NIMASA:
        generateCertificate = generateNimasaCertificate
        break
      case CERT_TYPE.FORKLIFT:
        // generateCertificate = forklift
        break
    }

    const doc = await generateCertificate(req)

    res.status(200).send({ ...doc.info })
  } catch (err) {
    console.log(err)
    log.error(err)
    res.status(500).send(err)
  }
}

exports.createIdCard = async (req, res) => {
  try {
    const {
      badge,
      course: { cert_type }
    } = req.body

    let generateIdCard = null

    const profilePicture = `${process.env.PICTURE_FOLDER}/${badge}.jpg`

    if (!fs.existsSync(profilePicture)) {
      return res.status(404).send({
        message: 'Learner picture is required'
      })
    }

    switch (parseInt(cert_type, 10)) {
      case CERT_TYPE.STANDARD:
        generateIdCard = generateStandardIdCard
        break
      case CERT_TYPE.OPITO:
        generateIdCard = generateOpitoIdCard
        break
    }

    const doc = await generateIdCard(req, res)

    res.status(200).send({ ...doc.info })
  } catch (err) {
    log.error(err)
    res.status(500).send(err)
  }
}

exports.createWelcomeLetter = async (req, res) => {
  try {
    const doc = await welcome(req)

    await res.status(200).send({ ...doc.info })
  } catch (err) {
    console.log(req.body)

    log.error(err)
    res.status(500).send(err)
  }
}
