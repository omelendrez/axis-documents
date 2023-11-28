const fs = require('fs')
const PDFDocument = require('pdfkit')

const { documentNumber, toWord } = require('../helpers/converters')

const welcome = async (req) => {
  const { badge, full_name, start, user, course } = req.body

  const { name: courseName, id_card, validity } = course

  const certificateValidity = parseInt(validity, 10)

  const id = req.params.id
  const file = documentNumber(id)

  const fileName = `${process.env.WELCOME_LETTER_FOLDER}/${file}.pdf`

  const doc = await new PDFDocument({
    size: 'A4',
    font: 'Helvetica'
  })

  doc.info.Title = 'Welcome Letter'
  doc.info.Author = user.full_name
  doc.info.Subject = `${badge} - ${courseName}`
  doc.info.Producer = 'Axis v2.0'
  doc.info.CreationDate = new Date()

  await doc.pipe(fs.createWriteStream(fileName))

  await doc.fontSize(9)

  const col = 48
  let row = 48

  const textWidth = 595 - col * 2

  await writeHeader(doc, col, row, textWidth)

  row = 176

  await doc.text('Dear Sir/Madam,', col, row, {
    align: 'left',
    width: textWidth
  })

  row += 32

  await doc.text(
    `Thank you for registering the under-listed personnel for the ${courseName} Course at Tolmann Allied Services Company Limited:`,
    col,
    row,
    {
      align: 'justify',
      width: textWidth
    }
  )

  row += 32

  doc.font('Helvetica-Bold')

  drawTableRow(doc, col, row, ['S/N', 'Name', 'Training', 'Available Date(s)'])

  row += 32

  doc.font('Helvetica')

  drawTableRow(doc, col, row, [1, full_name, courseName, start])

  row += 48

  doc
    .font('Helvetica-Bold')
    .text('Getting to Tolmann Allied Services Company Limited', col, row, {
      underline: true
    })

  doc
    .font('Helvetica')
    .text(
      'The Training Facility is located right at the heart of Trans Amadi Industrial Layout, at Plot 7b, Mother cat Junction (a well-known bus stop), adjacent to Schlumberger, along Total Road.',
      col,
      doc.y,
      { align: 'justify', width: textWidth }
    )

  doc.font('Helvetica-Bold').text('Accommodation', col, doc.y + 10, {
    underline: true
  })

  doc
    .font('Helvetica')
    .text(
      'Accommodation is available at Greenwood Court Hotel, which is located within the same premises as the Training Facility (at the right hand side as you enter from the gate). Kindly liaise with your Logistics department if reservation would be required, the hassle of traffic jams is completely eradicated if you avail yourself of this opportunity.  Our booking team will be happy to assist - 08096382000, 08096482000. \n Check out time is on or before 12:00 hours on the date/day of your departure.  Should you require luggage storage, the reception desk at the Hotel will be of assistance. ',
      col,
      doc.y,
      { align: 'justify', width: textWidth }
    )

  doc
    .font('Helvetica-Bold')
    .text('TRAINING REGISTRATION & SESSIONS', col, doc.y + 10)

  doc.text(
    'Registration commences at 8 am, therefore you should be at the training venue on or before this time.',
    col,
    doc.y + 10,
    { align: 'justify', width: textWidth, continued: true }
  )

  doc
    .font('Helvetica')
    .text(
      'The course is a mix of theory and practical sessions; you will be assessed based on your understanding of the class session and your participation during the practical.',
      doc.x,
      doc.y,
      { align: 'justify', width: textWidth }
    )

  doc
    .font('Helvetica-Bold')
    .text('Training starts at exactly 8am prompt.', col, doc.y + 10, {
      underline: true
    })

  doc.text(
    'IMPORTANT:  Kindly come with a valid means of identification i.e. Driver’s license/Voters card/International Passport/National ID card.',
    col,
    doc.y + 10,
    {
      underline: true
    }
  )
  doc
    .font('Helvetica')
    .text(
      'Tea/Coffee breaks and lunch will be served in the canteen during the training.',
      doc.x,
      doc.y + 10,
      { align: 'justify', width: textWidth }
    )

  doc.addPage()

  row = 48

  await writeHeader(doc, col, row, textWidth)

  row = 176

  doc
    .text(
      'Useful Telephone Numbers before/during the training are:  08099901280 (Dorathy) and 08099901281(Mercy).  You can also email ',
      doc.x,
      row,
      { align: 'justify', width: textWidth, continued: true }
    )
    .fillColor('#0288d1')
    .text('admin@tolmann.com', {
      continued: true,
      link: 'mailto:admin@tolmann.com',
      underline: true
    })
    .fillColor('#000')
    .text(' and ', { continued: true, underline: false, link: null })
    .fillColor('#0288d1')
    .text('training@tolmann.com', {
      link: 'mailto:training@tolmann.com',
      underline: true
    })

  doc
    .fillColor('#000')
    .text(
      'For further details, please contact the phone numbers/email addresses stated above.',
      doc.x,
      doc.y + 10,
      { align: 'justify', width: textWidth }
    )

  doc
    .font('Helvetica-Bold')
    .text('After Your Training: ', doc.x, doc.y + 10, {
      align: 'justify',
      width: textWidth,
      continued: true
    })
    .font('Helvetica')
    .text('You shall receive a certificate ', { continued: true })

  if (parseInt(id_card, 10) > 0) {
    doc.text('and ID card ', { continued: true })
  }

  if (certificateValidity > 0) {
    const word = toWord(certificateValidity)
    doc.text(`valid for ${word} (${certificateValidity}) years`, {
      continued: true
    })
  }

  doc.text('.')

  doc.text(
    'Should you find that you have misplaced any of your belongings when you arrive home, please contact your training coordinator (training@tolmann.com); if the item has been found, the school will contact you to arrange for its return/pick-up.',
    doc.x,
    doc.y + 10,
    { align: 'justify', width: textWidth }
  )

  doc.text(
    'Thank you very much, we wish you a pleasant stay and a rewarding course.',
    doc.x,
    doc.y + 10,
    { align: 'justify', width: textWidth }
  )

  doc.text('Management.', doc.x, doc.y + 30)

  doc.text('Tolmann Allied Services Company Ltd', { oblique: true })

  await doc.end()

  return doc
}

const writeHeader = async (doc, col, row, textWidth) => {
  const logo = './templates/welcome_letter/logo.png'

  await doc.image(logo, col, row, {
    width: 48,
    height: 48
  })

  row += 32

  await doc
    .font('Helvetica-Bold')
    .text('TOLMANN ALLIED SERVICES COMPANY LIMITED', col, row, {
      align: 'center',
      width: textWidth
    })

  row += 32

  await doc.font('Helvetica').text('COURSE JOINING INSTRUCTIONS', col, row, {
    align: 'left',
    width: textWidth
  })

  await doc.text('Doc. No: TMS/CJI/1', col, doc.y, {
    align: 'left',
    width: textWidth
  })

  row += 32

  await doc.text('Rev. 0', col, row, {
    align: 'left',
    width: textWidth
  })
}

const drawTableRow = (doc, col, row, cols) => {
  let left = col

  let top = row

  let width = 32

  let height = 32

  doc.rect(left, top, width, height).stroke()

  doc.text(cols[0], left, top + 10, {
    align: 'center',
    width: width
  })

  left += width
  width = 200

  doc.rect(left, top, width, height).stroke()

  doc.text(cols[1], left, top + 10, {
    align: 'center',
    width: width
  })

  left += width
  width = 165

  doc.rect(left, top, width, height).stroke()

  doc.text(cols[2], left, top + 10, {
    align: 'center',
    width: width
  })

  left += width
  width = 100

  doc.rect(left, top, width, height).stroke()

  doc.text(cols[3], left, top + 10, {
    align: 'center',
    width: width
  })
}

module.exports = { welcome }
