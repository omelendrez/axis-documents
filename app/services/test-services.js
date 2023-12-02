const exec = require('child_process').exec

const Test = {}

Test.run = () =>
  new Promise((resolve, reject) => {
    const test = exec('cd test && bash test.sh ', (error, stdout, stderr) => {
      if (error) console.log(error)
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
    })

    test.on('exit', function (code) {
      if (code !== 0) {
        return reject({ message: `Test exit with code ${code}` })
      }

      resolve({ message: 'Test process successful' })
    })
  })

module.exports = Test
