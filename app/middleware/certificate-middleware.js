const fs = require('node:fs')
const PDFDocument = require('pdfkit')
const bwipjs = require('bwip-js')

const { documentNumber } = require('../helpers/converters')

const generateStandardCertificate = (req) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const {
          badge,
          full_name,
          certificate,
          user,
          items,
          issued,
          expiry,
          course
        } = req.body

        const { expiry_type, name: courseName } = course

        const backgroundImage = './templates/certificates/certificate.jpg'

        const signatureImage = './templates/id_cards/signature.jpg'

        const id = req.params.id
        const file = documentNumber(id)

        const fileName = `${process.env.PDF_CERTIFICATE_FOLDER}/${file}.pdf`

        const doc = new PDFDocument({
          size: 'A4',
          font: 'Times-Roman'
        })

        doc.info.Title = 'Training Certificate'
        doc.info.Author = user.full_name
        doc.info.Subject = `${badge} - ${courseName}`
        doc.info.Producer = 'Axis v2.0'
        doc.info.CreationDate = new Date()
        doc.info.FileName = `${file}.pdf`

        const writeStream = fs.createWriteStream(fileName)

        doc.pipe(writeStream)

        doc.image(backgroundImage, 0, 0, {
          width: 595,
          height: 842
        })

        let row = 245
        let column = 60

        doc
          .fontSize(12)
          .text(
            'In honor of your outstanding performance and dedication, we gladly present this to',
            column,
            row,
            { align: 'center' }
          )

        row += 40
        doc.fontSize(22).text(full_name, column, row, { align: 'center' })

        row += 40

        doc
          .fontSize(12)
          .text(
            'having been assessed against and met the learning outcomes for the training requirements on',
            column,
            row,
            { align: 'center' }
          )

        row += 30

        doc.fontSize(18).text(courseName, column, row, { align: 'center' })

        doc.fontSize(16)

        if (items) {
          row += 30

          for (const i of items) {
            doc.text(i.name, column, row, { align: 'center' })
            row += 40
          }
        }
        row = 585

        doc.text(`Issuance Date: ${issued}`, column, row, {
          align: 'center'
        })

        row += 60

        doc.image(signatureImage, 60, row, { width: 80 })

        row += 50

        // const barcode = bwipjs.toBuffer({
        //   bcid: 'ean13',
        //   text: file,
        //   includetext: true,
        //   height: 10,
        //   textxalign: 'center' // Always good to set this
        // })

        // doc.image(barcode, 190, 610)

        row += 10
        column += 270

        doc.fontSize(14)

        doc.text(`Cert. No: ${certificate}`, column, row)

        row += 20

        if (parseInt(expiry_type, 10) !== 0) {
          doc.text(`Expiry Date: ${expiry}`, column, row)
        }

        const qrText = `Learner: ${full_name}\nCourse: ${courseName}\nCertificate: ${certificate}\nIssued on: ${issued}\n${
          expiry ? `Expires on: ${expiry}` : null
        }`

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: qrText,
          scale: 1,
          textxalign: 'center' // Always good to set this
        })

        // doc.image(qr, 460, 730)
        doc.image(qr, 240, 610, { width: 80, height: 80 })

        doc.end()

        writeStream.on('finish', () => resolve(doc))
      } catch (error) {
        reject(error)
      }
    })()
  )

const generateNimasaCertificate = async (req) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const {
          badge,
          full_name,
          certificate,
          user,
          items,
          issued,
          expiry,
          course
        } = req.body

        const { expiry_type, name: courseName } = course

        const backgroundImage = './templates/certificates/certificate.jpg'

        const id = req.params.id
        const file = documentNumber(id)

        const fileName = `${process.env.PDF_CERTIFICATE_FOLDER}/${file}.pdf`

        const doc = new PDFDocument({
          size: 'A4',
          font: 'Times-Roman'
        })

        doc.info.Title = 'Training Certificate'
        doc.info.Author = user.full_name
        doc.info.Subject = `${badge} - ${courseName}`
        doc.info.Producer = 'Axis v2.0'
        doc.info.CreationDate = new Date()
        doc.info.FileName = `${file}.pdf`

        const writeStream = fs.createWriteStream(fileName)

        doc.pipe(writeStream)

        doc.image(backgroundImage, 0, 0, {
          width: 595,
          height: 842
        })

        let row = 245
        let column = 60

        doc.fontSize(12)
        doc.text(
          'In honor of your outstanding performance and dedication, we gladly present this to',
          column,
          row,
          { align: 'center' }
        )

        row += 40
        doc.fontSize(22)
        doc.text(full_name, column, row, { align: 'center' })

        row += 40

        doc.fontSize(12)
        doc.text(
          'having been assessed against and met the learning outcomes for the training requirements on',
          column,
          row,
          { align: 'center' }
        )

        row += 60

        doc.fontSize(16)

        for (const i of items) {
          doc.text(i.name, column, row, { align: 'center' })
          row += 40
        }

        row = 585

        doc.text(`Issuance Date: ${issued}`, column, row, {
          align: 'center'
        })

        row += 110

        // const barcode = bwipjs.toBuffer({
        //   bcid: 'ean13',
        //   text: file,
        //   includetext: true,
        //   height: 10,
        //   textxalign: 'center' // Always good to set this
        // })

        // doc.image(barcode, 190, 610)

        row += 10
        column += 270

        doc.fontSize(14)

        doc.text(`Cert. No: ${certificate}`, column, row)

        row += 20

        if (parseInt(expiry_type, 10) !== 0) {
          doc.text(`Expiry Date: ${expiry}`, column, row)
        }

        const qrText = `Learner: ${full_name}\nCourse: ${courseName}\nCertificate: ${certificate}\nIssued on: ${issued}\n${
          expiry ? `Expires on: ${expiry}` : null
        }`

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: qrText,
          scale: 1,
          textxalign: 'center' // Always good to set this
        })

        // doc.image(qr, 460, 730)
        doc.image(qr, 240, 610, { width: 80, height: 80 })

        doc.end()

        writeStream.on('finish', () => resolve(doc))
      } catch (error) {
        reject(error)
      }
    })()
  )
module.exports = {
  generateStandardCertificate,
  generateNimasaCertificate
}
