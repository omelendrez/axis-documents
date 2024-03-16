module.exports = (app) => {
  require('./csv-routes')(app)
  require('./email-routes')(app)
  require('./file-routes')(app)
  require('./pdf-routes')(app)
  require('./template-routes')(app)
  require('./upload-routes')(app)
}
