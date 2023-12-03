module.exports = (app) => {
  require('./documents-routes')(app)
  require('./pdf-routes')(app)
  require('./backup-routes')(app)
  require('./upload-routes')(app)
  require('./csv-routes')(app)
  require('./email-routes')(app)
  require('./template-routes')(app)
  require('./test-routes')(app)
}
