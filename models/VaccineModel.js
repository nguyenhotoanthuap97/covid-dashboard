const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

getVaccines = async () => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    const query = { Country: 'Vietnam' }
    return await vaccines.find().toArray()
  } finally {
    await client.close()
  }
}

insertVaccines = async (vaccineList) => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    await vaccines.deleteMany()
    await vaccines.insertMany(vaccineList)
    console.log('Vaccines inserted!')
  } finally {
    await client.close()
  }
}

getLatestVaccine = async () => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    return await vaccines.find().sort({Date: -1}).limit(1).toArray()
  } finally {
    await client.close()
  }
}

module.exports = {
  getVaccines, insertVaccines, getLatestVaccine
}