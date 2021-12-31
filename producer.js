const kafka = require('./config/kafka')
require('dotenv').config()

const producer = kafka.producer()

const main = async () => {
  console.log(process.env.KAFKA_BOOTSTRAP_SERVER)
  await producer.connect()
  try {
    const responses = await producer.send({
      topic: process.env.TOPIC_SUMMARY,
      messages: [{
        key: 'summary',
        value: JSON.stringify({
          "id": "de1a2462-a817-4b62-839f-9c0f5f717eda",
          "rank": 31,
          "Country": "Vietnam",
          "Continent": "Asia",
          "TwoLetterSymbol": "vn",
          "ThreeLetterSymbol": "vnm",
          "Infection_Risk": 1.74,
          "Case_Fatality_Rate": 1.88,
          "Test_Percentage": 75.66,
          "Recovery_Proporation": 77.95,
          "TotalCases": 1714742,
          "NewCases": 0,
          "TotalDeaths": 32168,
          "NewDeaths": 0,
          "TotalRecovered": "1336644",
          "NewRecovered": 0,
          "ActiveCases": 345930,
          "TotalTests": "74637039",
          "Population": "98647006",
          "one_Caseevery_X_ppl": 58,
          "one_Deathevery_X_ppl": 3067,
          "one_Testevery_X_ppl": 1,
          "Deaths_1M_pop": 326,
          "Serious_Critical": 7336,
          "Tests_1M_Pop": 756607,
          "TotCases_1M_Pop": 17383
          })
      }]
    })
  
    console.log('Produced message: ', { responses })
  } catch (err) {
    console.error('Error when producing message', err)
  }
}

main()