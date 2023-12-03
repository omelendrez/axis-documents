const multer = require('multer')
const { getFileName } = require('../helpers/converters')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.COMPRESS_TEMP_FOLDER)
  },
  filename: function (req, file, cb) {
    const fileName = getFileName(req.body.name, file)
    cb(null, fileName)
  }
})

const upload = multer({ storage })

exports.upload = upload
