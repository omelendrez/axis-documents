const {
  getDocumentExists,
  getDocument
} = require('../services/document-services')

const getProfilePictureUrl = (profilePicturePath) =>
  new Promise((resolve, reject) => {
    const errorResponse = {
      status: 404,
      message: 'Learner picture is required'
    }
    getDocumentExists(profilePicturePath).then((data, err) => {
      if (err) {
        reject(errorResponse)
      } else {
        if (data.exists) {
          getDocument(profilePicturePath).then(async (data, err) => {
            if (err) {
              reject(errorResponse)
            } else {
              resolve(data)
            }
          })
        }
      }
    })
  })

module.exports = { getProfilePictureUrl }
