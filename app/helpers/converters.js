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

module.exports = { documentNumber, toWord, getFileName }
