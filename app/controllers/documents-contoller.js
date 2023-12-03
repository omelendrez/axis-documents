const documents = require('../services/document-services')

exports.getPictureExists = async (req, res) => {
  documents
    .getDocumentExists(`${process.env.PICTURE_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getPicture = async (req, res) => {
  documents
    .getDocument(`${process.env.PICTURE_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(
      `${process.env.LEARNER_ID_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getLearnerId = (req, res) => {
  documents
    .getDocument(`${process.env.LEARNER_ID_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(`${process.env.FOET_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getPrevFoet = (req, res) => {
  documents
    .getDocument(`${process.env.FOET_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(`${process.env.PAYMENT_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getPayment = (req, res) => {
  documents
    .getDocument(`${process.env.PAYMENT_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(
      `${process.env.PDF_CERTIFICATE_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getCertificate = (req, res) => {
  documents
    .getDocument(`${process.env.PDF_CERTIFICATE_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(
      `${process.env.WELCOME_LETTER_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getWelcomeLetter = (req, res) => {
  documents
    .getDocument(`${process.env.WELCOME_LETTER_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
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
    .getDocumentExists(
      `${process.env.PDF_ID_CARD_FOLDER}/${req.params.fileName}`
    )
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}

exports.getIdCard = (req, res) => {
  documents
    .getDocument(`${process.env.PDF_ID_CARD_FOLDER}/${req.params.fileName}`)
    .then((data, err) => {
      if (err) {
        res.status(500).send({
          message: 'Document not found ' + req.params.fileName
        })
      } else {
        res.send(data)
      }
    })
}
