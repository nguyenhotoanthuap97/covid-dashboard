'use strict'

const axios = require('axios').default
const dataSource = 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Vietnam/VNM/'

module.exports = {
  get: (req, res) => {
    axios.request({
      method: 'GET',
      url: dataSource,
      headers: {
        'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': '12dca90fe2mshf8d7300a9db94f2p149e46jsn68a5e807fd08'
      }
    }).then(response => {
      res.json(response.data)
    }).catch(err => {
      console.log('error: ' + err)
      res.json('ERROR: ' + err)
    })
  }
}