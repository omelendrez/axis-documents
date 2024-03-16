const { sendError } = require('../errors/error-monitoring')
const documents = require('../services/file-service')

exports.getPictureExists = async (req, res) => {
  documents
    .getFileExists(`${process.env.PICTURE_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        sendError('documents.getPictureExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getLearnerIdExists = async (req, res) => {
  documents
    .getFileExists(`${process.env.LEARNER_ID_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        sendError('documents.getLearnerIdExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getPrevFoetExists = async (req, res) => {
  documents
    .getFileExists(`${process.env.FOET_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        sendError('documents.getPrevFoetExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getPaymentExists = async (req, res) => {
  documents
    .getFileExists(`${process.env.PAYMENT_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        sendError('documents.getPaymentExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getCertificateExists = async (req, res) => {
  documents
    .getFileExists(
      `${process.env.PDF_CERTIFICATE_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        sendError('documents.getCertificateExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getWelcomeLetterExists = async (req, res) => {
  documents
    .getFileExists(
      `${process.env.WELCOME_LETTER_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        sendError('documents.getWelcomeLetterExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getIdCardExists = async (req, res) => {
  documents
    .getFileExists(`${process.env.PDF_ID_CARD_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        sendError('documents.getIdCardExists', err)
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}
