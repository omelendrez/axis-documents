const exec = require('child_process').exec

const backup = () =>
  new Promise((resolve, reject) => {
    const compress = exec(
      'cd backup && bash backup-files.sh',
      (err, stdout, stderr) => {
        if (stdout) console.log(stdout)
        if (stderr) {
          console.warn(stderr)
          return reject({ message: 'An error has been found', stderr })
        }
        if (err) {
          console.error(err)
          return reject({ message: 'An error has been found' })
        }
      }
    )

    compress.on('exit', (code) => {
      if (code === 0) {
        return resolve({ message: 'Backup completed successfuly!' })
      }
      reject({ message: 'An error has been found during bash execution' })
    })
  })

const restore = () =>
  new Promise((resolve, reject) => {
    const restore = exec(
      'cd backup && bash restore-files.sh',
      (err, stdout, stderr) => {
        if (stdout) console.log(stdout)
        if (stderr) {
          console.warn(stderr)
          return reject({ message: 'An error has been found', stderr })
        }
        if (err) {
          console.error(err)
          return reject({ message: 'An error has been found' })
        }
      }
    )

    restore.on('exit', (code) => {
      if (code === 0) {
        return resolve({ message: 'Restore completed successfuly!' })
      }
      reject({ message: 'An error has been found during bash execution' })
    })
  })

module.exports = { backup, restore }
