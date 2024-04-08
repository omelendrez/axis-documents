const fs = require('node:fs')
const PDFDocument = require('pdfkit')
const bwipjs = require('bwip-js')

const {
  documentNumber,
  urlToBuffer,
  formatCertificateDate
} = require('../helpers/converters')

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

        const origin = req.headers.origin

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
        doc.info.Path = process.env.PDF_CERTIFICATE_FOLDER

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

        row += 60

        column += 270

        doc.fontSize(14)

        doc.text(`Cert. No: ${certificate}`, column, row)

        row += 20

        if (parseInt(expiry_type, 10) !== 0) {
          doc.text(`Expiry Date: ${expiry}`, column, row)
        }

        const qrText = `${origin}/verify/${parseInt(id, 10).toString(16)}`

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: qrText,
          scale: 1,
          textxalign: 'center' // Always good to set this
        })

        doc.image(qr, 240, 610, { width: 80, height: 80 })

        doc.end()

        writeStream.on('finish', () => resolve(doc))
      } catch (error) {
        reject(error)
      }
    })()
  )

const generateNimasaCertificate = async (req, profilePicture) =>
  new Promise((resolve, reject) =>
    (async () => {
      try {
        const {
          badge,
          full_name,
          birth_date,
          certificate,
          user,
          items,
          issued,
          expiry,
          course
        } = req.body

        const origin = req.headers.origin

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
        doc.info.Path = process.env.PDF_CERTIFICATE_FOLDER

        const writeStream = fs.createWriteStream(fileName)

        doc.pipe(writeStream)

        doc.image(backgroundImage, 0, 0, {
          width: 595,
          height: 842
        })

        let row = 50,
          column = 350

        doc.fontSize(12)

        doc.text(`Cert. No: ${certificate}`, column, row)

        row += 20

        if (parseInt(expiry_type, 10) !== 0) {
          doc.fontSize(11)
          doc.text(`Expiry Date: ${formatCertificateDate(expiry)}`, column, row)
          doc.fontSize(12)
        }

        row = 220
        column = 60

        doc.fontSize(20)
        doc.font('Times-Bold')
        doc.text(courseName, column, row, { align: 'center' })
        doc.font('Times-Roman')
        doc.fontSize(14)

        row += 40

        doc.text('This is to certify that: ', column, row, { continued: true })

        doc.font('Times-Bold')
        doc.fontSize(16)
        doc.text(full_name)
        doc.font('Times-Roman')
        doc.fontSize(14)

        row += 30

        doc.text('Date of Birth: ', column, row, { continued: true })

        doc.font('Times-Bold')
        doc.fontSize(16)
        doc.text(formatCertificateDate(birth_date))
        doc.font('Times-Roman')

        row += 30

        doc.fontSize(14)

        doc.text(
          'Has successfully completed an approved training in:',
          column,
          row
        )

        row += 30

        doc.fontSize(11)
        doc.font('Courier-Bold')

        for (const i of items) {
          doc.text(i.name, column, row, { align: 'center' })
          row += 20
        }

        row += 10

        doc.font('Times-Roman')

        doc.text(
          'of the International Convention on Standards of Training, Certification and Watchkeeping, for Seafarers, STCW 1978 as amended in 2010.',
          column,
          row,
          { paragraphGap: 5, lineGap: 5 }
        )

        doc.text(
          'This certificate is issued under the Authority of the Nigerian Maritime Administration and Safety Agency (NIMASA).',
          { lineGap: 5 }
        )

        row = 620

        const signatureLine = '___________________________'

        doc.fontSize(12)
        doc.text(signatureLine, column, row)
        doc.text('SIGNATURE OF THE HOLDER')
        row += 60
        doc.text(signatureLine, column, row)

        const buffer = await urlToBuffer(profilePicture)

        fs.writeFileSync('./test.jpg', buffer, 'binary')

        doc.image('./test.jpg', 400, 600, { width: 130 })

        doc.text(formatCertificateDate(issued), 400, 700, {
          width: 130,
          align: 'center'
        })

        // row += 110

        row += 10
        column += 270

        doc.fontSize(14)

        const qrText = `${origin}/verify/${parseInt(id, 10).toString(16)}`

        const qr = await bwipjs.toBuffer({
          bcid: 'qrcode',
          text: qrText,
          scale: 1,
          textxalign: 'center' // Always good to set this
        })

        // doc.image(qr, 460, 730)
        doc.image(qr, 250, 580, { width: 80 })

        doc.end()

        fs.unlink('./test.jpg', () => {})

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
