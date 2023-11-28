module.exports = (app) => {
  require('./pdf-routes')(app)
  require('./backup-routes')(app)
  require('./upload-routes')(app)
  require('./csv-routes')(app)
  require('./email-routes')(app)
  require('./template-routes')(app)
}
