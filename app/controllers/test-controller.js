const Test = require('../services/test-services')

const runTest = async (req, res) => {
  // res.status(400).send({
  //   message: 'Generation of database table backup has been removed.'
  // })
  try {
    const resp = await Test.run()
    res.status(200).send(resp)
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred when backing up data.'
    })
  }
}

module.exports = { runTest }
