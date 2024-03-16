const fs = require('node:fs')

exports.getFileExists = (fileName) =>
  new Promise((resolve) => {
    if (!fs.existsSync(fileName)) {
      return resolve({ exists: false })
    }
    resolve({ exists: true })
  })
