
const VaccineService = require('../../services/VaccineService')
const axios = require('axios').default
const dataSource = 'https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/vaccine_data_global.csv'

module.exports = {
  getAll: async (req, res) => {
    var vaccines = await VaccineService.getAllVaccines().catch(err => {
      console.log('Error while retrieving all vaccines: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(vaccines)
  },
  getLatest: async (req, res) => {
    var vaccines = await VaccineService.getLatestVaccine().catch(err => {
      console.log('Error while retrieving latest vaccine: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(vaccines[0])
  }
}