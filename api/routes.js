'use strict'

module.exports = (app) => {
  let summaryCtrl = require('./controllers/SummaryController')
  let vaccineCtrl = require('./controllers/VaccineController')
  app.route('/summary')
    .get(summaryCtrl.get)
  app.route('/vaccines')
    .get(vaccineCtrl.getAll)
  app.route('/vaccines/latest')
    .get(vaccineCtrl.getLatest)
}