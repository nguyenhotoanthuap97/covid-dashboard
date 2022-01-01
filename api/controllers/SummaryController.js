
const SummaryService = require('../../services/SummaryService')

module.exports = {
  get: async (req, res) => {
    var summary = await SummaryService.getSummary().catch(err => {
      console.log('Error while retrieving summary: ' + err)
      res.json('ERROR: ' + err)
    })

    res.json(summary)
  }
}