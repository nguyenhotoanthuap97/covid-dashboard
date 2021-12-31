const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

getVaccines = async () => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    const query = { Country: 'Vietnam' }
    const vaccineList = await vaccines.find(query)
    return vaccineList
  } finally {
    await client.close()
  }
}

insertVaccines = async (vaccineList) => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    const bulkUpdateOps = vaccineList.map((doc) => {
      return {
        "updateOne": {
          "filter": { "Country_Region": doc.Country_Region, "Date": doc.Date },
          "update": { "$set": 
            {
              "Doses_admin": doc.Doses_admin,
              "People_partially_vaccinated": doc.People_partially_vaccinated,
              "People_fully_vaccinated": doc.People_fully_vaccinated
            }
          }
        }
      }
    })

    const result = await vaccines.bulkWrite(bulkUpdateOps)
    console.log('Vaccines inserted!' + result)
  } finally {
    await client.close()
  }
}

getLatestVaccine = async () => {
  try {
    await client.connect()

    const database = client.db('covid_vaccine')
    const vaccines = database.collection('vaccine')

    return await vaccines.find().sort({Date: -1}).limit(1)
  } finally {
    await client.close()
  }
}