var CronJob = require('cron').CronJob
const axios = require('axios').default
const summaryModel = require('../models/SummaryModel')
const dataSource = 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Vietnam/VNM/'

updateSummary = () => {
  axios.request({
    method: 'GET',
    url: dataSource,
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': process.env.RABID_KEY
    }
  }).then(response => {
    summaryModel.insertSummary(response.data[0])
  }).catch(err => {
    console.log('error: ' + err)
    res.json('ERROR: ' + err)
  })
}

startSummaryCron = () => {
  var job = new CronJob({
    cronTime: '0 0 0 * * *',
    onTick: () => {
      console.log('Start refreshing covid summary at ' + new Date())
      updateSummary()
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh'
  })
  
  job.start();
  console.log('Start summary cronjob!')
}

module.exports = {
  startSummaryCron
}