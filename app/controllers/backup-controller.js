const fs = require('fs')
const { backup, restore } = require('../services/bash-runner.js')
const { ZIP_EXTENSION } = require('../helpers/constants')

const createBackup = async (req, res) => {
  try {
    const response = await backup()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send(error)
  }
}

const restoreBackup = async (req, res) => {
  if (
    fs
      .readdirSync('./backup/compressed-files')
      .filter((f) => f.includes(ZIP_EXTENSION)).length
  ) {
    try {
      const response = await restore()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    console.log('No files to restore')
    res.status(400).send({ message: 'No files to restore!' })
  }
}

module.exports = { createBackup, restoreBackup }
