const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

getSummary = async () => {
  try {
    await client.connect()
    
    const database = client.db('covid_summary')
    const summaries = database.collection('summary')

    const query = { Country: 'Vietnam' }
    const summary = await summaries.findOne(query)
    return summary
  } finally {
    await client.close()
  }
}

insertSummary = async (summary) => {
  try {
    await client.connect()

    const database = client.db('covid_summary')
    const summaries = database.collection('summary')
    const query = { Country: 'Vietnam' }
    await summaries.deleteOne(query)
    await summaries.insertOne(summary)
    console.log('Summary inserted!')
  } finally {
    await client.close()
  }
}

module.exports = {
  getSummary,
  insertSummary
}