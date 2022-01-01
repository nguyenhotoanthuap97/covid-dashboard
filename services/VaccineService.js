const CronJob = require('cron').CronJob
const axios = require('axios').default
const csvToJson = require('csvtojson')
const VaccineModel = require('../models/VaccineModel')
const dataSource = 'https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/time_series_covid19_vaccine_global.csv'

updateVaccine = () => {
  axios.request({
    method: 'GET',
    url: dataSource
  }).then(response => {
    csvToJson()
      .fromString(response.data)
      .then(jsonObj => {
        vaccines = jsonObj.filter(v => v.Country_Region === 'Vietnam' )
        VaccineModel.insertVaccines(vaccines)
      })
  }).catch(err => {
    console.log('error: ' + err)
    res.json('ERROR: ' + err)
  })
}

startVaccineCron = () => {
  var job = new CronJob({
    cronTime: '0 0 0 * * *',
    onTick: () => {
      console.log('Start refreshing covid vaccine at ' + new Date())
      updateVaccine()
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh'
  })
  
  job.start();
  console.log('Start vaccine cronjob!')
}

getAllVaccines = () => {
  return VaccineModel.getVaccines()
}

getLatestVaccine = () => {
  return VaccineModel.getLatestVaccine()
}

module.exports = {
  startVaccineCron,
  getAllVaccines,
  getLatestVaccine
}