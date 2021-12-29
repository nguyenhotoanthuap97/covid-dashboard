'use strict'

const axios = require('axios').default
const dataSource = 'https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/vaccine_data_global.csv'

module.exports = {
  get: (req, res) => {
    axios.request({
      method: 'GET',
      url: dataSource
    }).then(response => {
      res.json(response.data)
    }).catch(err => {
      console.log('error: ' + err)
      res.json('ERROR: ' + err)
    })
  }
}