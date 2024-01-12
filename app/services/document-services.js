const { checkDocumentExists, getDocumentUrl } = require('./s3-services')

exports.getDocumentExists = (file) =>
  new Promise((resolve) =>
    checkDocumentExists(file)
      .then(() => resolve({ exists: true }))
      .catch(() => resolve({ exists: false }))
  )

exports.getDocument = (file) =>
  new Promise((resolve, reject) =>
    getDocumentUrl(file)
      .then((url) => resolve(url))
      .catch((err) => reject(err))
  )
