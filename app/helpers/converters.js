const { get } = require('https')

const documentNumber = (num) =>
  (parseInt(num, 10) + 1000000000000).toString().substring(1)

const toWord = (num) => {
  const numbers = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten'
  ]
  return numbers[num]
}

const getFileName = (name, file) => {
  const ext = file.originalname.split('.').pop()
  const fileName = `${name}.${ext.toLowerCase()}`
  return fileName
}

export const getDocumentEndpoint = (url) => {
  // remove first path from 'uploads/pictures/TR526074.jpg'
  // to get 'pictures/TR526074.jpg'

  let newUrl = url.split('/')
  newUrl.shift()
  newUrl = newUrl.join('/')

  return `${process.env.THIS_URL}${newUrl}`
}

const urlToBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const data = []

    const endpoint = getDocumentEndpoint(url)

    get(endpoint, (res) => {
      res
        .on('data', (chunk) => data.push(chunk))
        .on('end', () => resolve(Buffer.concat(data)))
        .on('error', (err) => reject(err))
    })
  })
}
function getTodayYMD() {
  const today = new Date()

  const day = today.getDate().toString()
  const month = (today.getMonth() + 1).toString()
  const year = today.getFullYear().toString()

  const paddedDay =
    parseInt(day, 10) < 10 ? day.padStart(2, '0') : day.toString()

  const paddedMonth =
    parseInt(month, 10) < 10 ? month.padStart(2, '0') : month.toString()

  const paddedYear = year.toString()

  return `${paddedYear}-${paddedMonth}-${paddedDay}`
}

const nthNumber = (number) => {
  return number > 0
    ? ['th', 'st', 'nd', 'rd'][
        (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
      ]
    : ''
}

const formatCertificateDate = (date) => {
  const dateObj = new Date(date.split('/').reverse().join('-'))
  const day = dateObj.getDate()
  const month = dateObj.toLocaleString('default', { month: 'long' })
  const year = dateObj.getFullYear()

  return `${day}${nthNumber(day)} ${month}, ${year}`
}

module.exports = {
  documentNumber,
  toWord,
  getFileName,
  urlToBuffer,
  getTodayYMD,
  formatCertificateDate
}
