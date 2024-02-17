/* eslint-disable no-unused-vars */

const { log } = require('../helpers/log')

const { CERT_TYPE, sleep } = require('../helpers/constants')

const {
  generateStandardCertificate,
  generateNimasaCertificate
} = require('../middleware/certificate-middleware')

const {
  generateStandardIdCard,
  generateOpitoIdCard
} = require('../middleware/id-card-middleware')

const { welcome } = require('../middleware/welcome-middleware')
const { upload } = require('../services/uploader')
const {
  getDocumentExists,
  getDocument
} = require('../services/document-services')
const { sendError } = require('../errors/error-monitoring')
const { getProfilePictureUrl } = require('../helpers/profilePicture')

exports.createCertificate = async (req, res) => {
  const {
    badge,
    course: { cert_type }
  } = req.body

  let generateCertificate = null
  let profilePicture = null

  switch (parseInt(cert_type, 10)) {
    case CERT_TYPE.STANDARD:
      generateCertificate = generateStandardCertificate
      break
    case CERT_TYPE.NIMASA:
      generateCertificate = generateNimasaCertificate
      profilePicture = `${process.env.PICTURE_FOLDER}/${badge}.jpg`

      break
    case CERT_TYPE.FORKLIFT:
      // generateCertificate = forklift
      break
  }
  getProfilePictureUrl(profilePicture).then(async (data, err) => {
    if (err) {
      return res.status(err.status).json({
        message: err.message
      })
    }

    try {
      const doc = await generateCertificate(req, data)

      const fileName = await doc.info.FileName

      const filePath = `${process.env.PDF_CERTIFICATE_FOLDER}/${fileName}`

      await sleep(1000)

      upload(filePath, filePath, fileName)
        .then((info) => res.json({ info, ...doc.info }))
        .catch((err) => {
          sendError('pdf.createCertificate', err)
          console.log(err)
          res.status(500).json(err)
        })
    } catch (err) {
      sendError('pdf.createCertificate', err)
      console.log(err)
      log.error(err)
      res.status(500).json(err)
    }
  })
}

exports.createIdCard = async (req, res) => {
  const {
    badge,
    course: { cert_type }
  } = req.body

  let generateIdCard = null

  switch (parseInt(cert_type, 10)) {
    case CERT_TYPE.STANDARD:
      generateIdCard = generateStandardIdCard
      break
    case CERT_TYPE.OPITO:
      generateIdCard = generateOpitoIdCard
      break
  }

  const profilePicture = `${process.env.PICTURE_FOLDER}/${badge}.jpg`

  getProfilePictureUrl(profilePicture).then(async (data, err) => {
    if (err) {
      return res.status(err.status).json({
        message: err.message
      })
    }

    try {
      const doc = await generateIdCard(req, data)

      const fileName = doc.info.FileName

      const filePath = `${process.env.PDF_ID_CARD_FOLDER}/${fileName}`

      await sleep(1000)

      upload(filePath, filePath, fileName)
        .then((info) => res.json({ info, ...doc.info }))
        .catch((err) => {
          sendError('pdf.createIdCard', err)
          console.log(err)
          res.status(500).json(err)
        })
    } catch (err) {
      sendError('pdf.createIdCard', err)
      res.status(500).json(err)
      console.log(err)
    }
  })
}

exports.createWelcomeLetter = async (req, res) => {
  try {
    const doc = await welcome(req)

    const fileName = await doc.info.FileName

    const filePath = `${process.env.WELCOME_LETTER_FOLDER}/${fileName}`

    await sleep(1000)

    upload(filePath, filePath, fileName)
      .then((info) => res.json({ info, ...doc.info }))
      .catch((err) => {
        sendError('pdf.createWelcomeLetter', err)
        console.log(err)
        res.status(500).json(err)
      })
  } catch (err) {
    sendError('pdf.createWelcomeLetter', err)
    log.error(err)
    res.status(500).json(err)
  }
}
