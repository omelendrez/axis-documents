const fs = require('fs')
const PDFDocument = require('pdfkit')
const bwipjs = require('bwip-js')

const { documentNumber } = require('../helpers/converters')

const generateStandardCertificate = async (req) => {
  const { badge, full_name, certificate, user, items, issued, expiry, course } =
    req.body

  const { expiry_type, name: courseName } = course

  const backgroundImage = './templates/certificates/certificate.jpg'

  const signatureImage = './templates/id_cards/signature.jpg'

  const id = req.params.id
  const file = documentNumber(id)

  const fileName = `${process.env.PDF_CERTIFICATE_FOLDER}/${file}.pdf`

  const doc = await new PDFDocument({
    size: 'A4',
    font: 'Times-Roman'
  })

  doc.info.Title = 'Training Certificate'
  doc.info.Author = user.full_name
  doc.info.Subject = `${badge} - ${courseName}`
  doc.info.Producer = 'Axis v2.0'
  doc.info.CreationDate = new Date()

  await doc.pipe(fs.createWriteStream(fileName))

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

  if (items) {
    row += 30

    doc.fontSize(16)

    items.forEach((i) => {
      doc.text(i.name, column, row, { align: 'center' })
      row += 40
    })
  }
  row = 585

  doc.text(`Issuance Date: ${issued}`, column, row, { align: 'center' })

  row += 60

  doc.image(signatureImage, 60, row, { width: 80 })

  row += 50

  // const barcode = await bwipjs.toBuffer({
  //   bcid: 'ean13',
  //   text: file,
  //   includetext: true,
  //   height: 10,
  //   textxalign: 'center' // Always good to set this
  // })

  // await doc.image(barcode, 190, 610)

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

  // await doc.image(qr, 460, 730)
  await doc.image(qr, 240, 610, { width: 80, height: 80 })

  await doc.end()

  return doc
}

const generateNimasaCertificate = async (req) => {
  const { badge, full_name, certificate, user, items, issued, expiry, course } =
    req.body

  const { expiry_type, name: courseName } = course

  const backgroundImage = './templates/certificates/certificate.jpg'

  const id = req.params.id
  const file = documentNumber(id)

  const fileName = `${process.env.PDF_CERTIFICATE_FOLDER}/${file}.pdf`

  const doc = await new PDFDocument({
    size: 'A4',
    font: 'Times-Roman'
  })

  doc.info.Title = 'Training Certificate'
  doc.info.Author = user.full_name
  doc.info.Subject = `${badge} - ${courseName}`
  doc.info.Producer = 'Axis v2.0'
  doc.info.CreationDate = new Date()

  await doc.pipe(fs.createWriteStream(fileName))

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

  items.forEach((i) => {
    doc.text(i.name, column, row, { align: 'center' })
    row += 40
  })

  row = 585

  doc.text(`Issuance Date: ${issued}`, column, row, { align: 'center' })

  row += 110

  // const barcode = await bwipjs.toBuffer({
  //   bcid: 'ean13',
  //   text: file,
  //   includetext: true,
  //   height: 10,
  //   textxalign: 'center' // Always good to set this
  // })

  // await doc.image(barcode, 190, 610)

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

  // await doc.image(qr, 460, 730)
  await doc.image(qr, 240, 610, { width: 80, height: 80 })

  await doc.end()

  return doc
}

module.exports = {
  generateStandardCertificate,
  generateNimasaCertificate
}
