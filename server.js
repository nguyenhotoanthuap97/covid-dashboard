const express = require('express')
require('dotenv').config()
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const { startSummaryCron } = require('./services/SummaryService')
const { startVaccineCron } = require('./services/VaccineService')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes')
routes(app)

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})


app.listen(port)

startSummaryCron()
startVaccineCron()

console.log('Server started on: ' + port)