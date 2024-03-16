const { getFileExists } = require('../services/file-service')

const getProfilePictureUrl = (profilePicturePath) =>
  new Promise((resolve, reject) => {
    const errorResponse = {
      status: 404,
      message: 'Learner picture is required'
    }
    getFileExists(profilePicturePath).then((data, err) => {
      if (err) {
        reject(errorResponse)
      } else {
        if (data.exists) {
          resolve(profilePicturePath)
        } else {
          reject(errorResponse)
        }
      }
    })
  })

module.exports = { getProfilePictureUrl }
