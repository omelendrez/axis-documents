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

const urlToBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const data = []
    get(url, (res) => {
      res
        .on('data', (chunk) => data.push(chunk))
        .on('end', () => resolve(Buffer.concat(data)))
        .on('error', (err) => reject(err))
    })
  })
}
module.exports = { documentNumber, toWord, getFileName, urlToBuffer }
