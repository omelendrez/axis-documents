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

    const fileName = await doc.info.FileName

    const filePath = `${process.env.PDF_CERTIFICATE_FOLDER}/${fileName}`

    await sleep(1000)

    upload(filePath, filePath, fileName)
      .then((info) => res.send({ info, ...doc.info }))
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

exports.createIdCard = async (req, res) => {
  try {
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

    getDocumentExists(profilePicture)
      .then((data, err) => {
        if (err) {
          return res.status(404).send({
            message: 'Learner picture is required'
          })
        } else {
          if (data.exists) {
            getDocument(profilePicture).then(async (data, err) => {
              if (err) {
                console.log(err)
                return res.status(404).send({
                  message: 'Learner picture is required'
                })
              } else {
                try {
                  const doc = await generateIdCard(req, data)

                  const fileName = doc.info.FileName

                  const filePath = `${process.env.PDF_ID_CARD_FOLDER}/${fileName}`

                  await sleep(1000)

                  upload(filePath, filePath, fileName)
                    .then((info) => res.send({ info, ...doc.info }))
                    .catch((err) => {
                      console.log(err)
                      res.status(500).send(err)
                    })
                } catch (err) {
                  res.status(500).send(err)
                  console.log(err)
                }
              }
            })
          } else {
            res.status(400).send({ message: 'Leaner picture is required' })
          }
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.createWelcomeLetter = async (req, res) => {
  try {
    const doc = await welcome(req)

    const fileName = await doc.info.FileName

    const filePath = `${process.env.WELCOME_LETTER_FOLDER}/${fileName}`

    await sleep(1000)

    upload(filePath, filePath, fileName)
      .then((info) => res.send({ info, ...doc.info }))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    log.error(err)
    res.status(500).send(err)
  }
}
