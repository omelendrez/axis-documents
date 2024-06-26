const fs = require('node:fs')
const PDFDocument = require('pdfkit')
const bwipjs = require('bwip-js')

const { documentNumber } = require('../helpers/converters')
const { OPITO_HUB_URL } = require('../helpers/constants')

const cardWidth = 242
const cardHeight = 153

const generateStandardIdCard = (req, profilePicture) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const {
          badge,
          full_name,
          certificate,
          expiry,
          user: { full_name: fullName },
          course: { name: courseName, front_id_text, back_id_text }
        } = req.body

        const origin = req.headers.origin

        // const profilePicture = `${process.env.PICTURE_FOLDER}/${badge}.jpg`

        const backgroundImage = './templates/id_cards/idcard_front.jpg'
        const signatureImage = './templates/id_cards/signature.jpg'

        const id = req.params.id
        const file = documentNumber(id)

        const fileName = `${process.env.PDF_ID_CARD_FOLDER}/${file}.pdf`

        const doc = new PDFDocument({
          size: [cardWidth, cardHeight],
          font: 'Helvetica'
        })

        doc.info.Title = 'Id Card'
        doc.info.Author = fullName
        doc.info.Subject = `${badge} - ${courseName}`
        doc.info.Producer = 'Axis v2.0'
        doc.info.CreationDate = new Date()
        doc.info.FileName = `${file}.pdf`
        doc.info.Path = process.env.PDF_ID_CARD_FOLDER

        const writeStream = fs.createWriteStream(fileName)

        doc.pipe(writeStream)

        doc.image(backgroundImage, 0, 0, {
          width: cardWidth,
          height: cardHeight
        })

        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .fillColor('yellow')
          .text(front_id_text, 175, 32)

        doc
          .fontSize(8)
          .fillColor('white')
          .text(full_name, 85, 110, { width: cardWidth, height: cardHeight })
          .moveDown(0.5)

        doc
          .text(`EXP: ${expiry}`, { width: cardWidth, height: cardHeight })
          .moveDown(0.5)

        doc.text(certificate, { width: cardWidth, height: cardHeight })

        doc.image(profilePicture, 2, 94, { width: 76 })

        doc.addPage()

        doc
          .font('Helvetica')
          .fillColor('black')
          .fontSize(7)
          .text(
            'This is to certify that the bearer whose name and passport photograph',
            10,
            70,
            { width: cardWidth }
          )

        doc.text('appear overleaf has undergone ', {
          width: cardWidth,
          height: cardHeight,
          continued: true
        })

        doc.font('Helvetica-Bold').text(`${back_id_text}.`).moveDown(0.5)

        doc
          .font('Helvetica')
          .text('This card remains the property of TOLMANN.', {
            width: cardWidth,
            height: cardHeight
          })
          .moveDown(0.5)

        doc
          .text(
            'If found, please return to 7B Trans Amadi Industrial Layout, Port Harcourt.',
            { width: 180, height: cardHeight, continued: true }
          )
          .text('Tel: +234 802 335 0014', {
            width: cardWidth,
            height: cardHeight
          })

        doc
          .text('Signature:', 10, 140, {
            width: cardWidth,
            height: cardHeight
          })
          .image(signatureImage, 40, 120, { width: 48 })

        const qrText = `${origin}/verify/${parseInt(id, 10).toString(16)}`

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: qrText,
          scale: 1,
          textxalign: 'center' // Always good to set this
        })

        doc.image(qr, 180, 90, { width: 60, height: 60 })

        doc.end()

        fs.unlink('./test.jpg', () => {})

        writeStream.on('finish', () => resolve(doc))
      } catch (error) {
        reject(error)
      }
    })()
  )

const generateOpitoIdCard = (req, profilePicture) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const {
          badge,
          full_name,
          certificate,
          expiry,
          surname,
          opito_expiry,
          user: { full_name: fullName },
          course: { name: courseName, front_id_text, back_id_text }
        } = req.body

        const backgroundImage = './templates/id_cards/idcard_front.jpg'
        const signatureImage = './templates/id_cards/signature.jpg'

        const opitoLogo = './templates/common/OPITO.jpg'

        const id = req.params.id
        const file = documentNumber(id)

        const fileName = `${process.env.PDF_ID_CARD_FOLDER}/${file}.pdf`

        const doc = new PDFDocument({
          size: [cardWidth, cardHeight],
          font: 'Helvetica'
        })

        doc.info.Title = 'Id Card'
        doc.info.Author = fullName
        doc.info.Subject = `${badge} - ${courseName}`
        doc.info.Producer = 'Axis v2.0'
        doc.info.CreationDate = new Date()
        doc.info.FileName = `${file}.pdf`
        doc.info.Path = process.env.PDF_ID_CARD_FOLDER

        const writeStream = fs.createWriteStream(fileName)

        doc.pipe(writeStream)

        doc.image(backgroundImage, 0, 0, {
          width: cardWidth,
          height: cardHeight
        })

        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .fillColor('yellow')
          .text(front_id_text, 175, 32)

        doc.image(opitoLogo, 198, 48, { width: 38 })

        doc
          .fontSize(8)
          .fillColor('white')
          .text(full_name, 85, 110, { width: cardWidth, height: cardHeight })
          .moveDown(0.5)

        doc
          .text(`EXP: ${expiry}`, { width: cardWidth, height: cardHeight })
          .moveDown(0.5)

        doc.text(certificate, { width: cardWidth, height: cardHeight })

        doc.image(profilePicture, 2, 94, { width: 76 })

        doc.addPage()

        doc
          .font('Helvetica')
          .fillColor('black')
          .fontSize(7)
          .text(
            'This is to certify that the bearer whose name and passport photograph',
            10,
            70,
            { width: cardWidth }
          )

        doc.text('appear overleaf has undergone ', {
          width: cardWidth,
          height: cardHeight,
          continued: true
        })

        doc.font('Helvetica-Bold').text(`${back_id_text}.`).moveDown(0.5)

        doc
          .font('Helvetica')
          .text('This card remains the property of TOLMANN.', {
            width: cardWidth,
            height: cardHeight
          })
          .moveDown(0.5)

        doc
          .text(
            'If found, please return to 7B Trans Amadi Industrial Layout, Port Harcourt.',
            { width: 180, height: cardHeight, continued: true }
          )
          .text('Tel: +234 802 335 0014', {
            width: cardWidth,
            height: cardHeight
          })

        doc
          .text('Signature:', 10, 140, {
            width: cardWidth,
            height: cardHeight
          })
          .image(signatureImage, 40, 120, { width: 48 })

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: `${OPITO_HUB_URL.replace('{surname}', surname)
            .replace('{date}', opito_expiry)
            .replace('{certificate}', certificate)}`,
          scale: 1,
          height: 20,
          width: 20
        })

        doc.image(qr, 190, 100)

        doc.end()

        writeStream.on('finish', () => resolve(doc))
      } catch (error) {
        reject(error)
      }
    })()
  )

module.exports = { generateStandardIdCard, generateOpitoIdCard }
