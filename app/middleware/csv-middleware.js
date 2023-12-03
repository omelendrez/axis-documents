const { appendFileSync } = require('fs')

const HEADER =
  'Start Date, End Date, Centre Code, Product Code, Booking Ref No,,'
const SUB_HEADER =
  'Learner Count,OPITO Learner No, Vantage ID, First Name, Last Name, DOB, Forward Date'

const createFile = async (data) => {
  const { id, start, end, product_code, records } = data
  const file = `${id.split(' ')[0]}_${product_code}`

  const fileName = `${process.env.CSV_FOLDER}/${file}.csv`
  const responseFileName = `${process.env.CSV_ENDPOINT}/${file}.csv`

  const csvContent = [HEADER]
  csvContent.push([`${start}, ${end}, ,${product_code}, OPITO105`])
  csvContent.push(',,,,,,')
  csvContent.push(SUB_HEADER)

  records.forEach((r, i) =>
    csvContent.push(
      `${i + 1},,,${r.first_name}, ${r.last_name}, ${r.birth_date},${
        r.prev_expiry || ''
      }`
    )
  )

  await appendFileSync(fileName, csvContent.join('\n'), {
    encoding: 'utf8',
    flag: 'w'
  })

  return { fileName: responseFileName }
}

module.exports = { createFile }
