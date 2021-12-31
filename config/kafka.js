const { Kafka } = require('kafkajs')
require('dotenv').config()

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const kafka = new Kafka({
  clientId: 'covid-dashboard',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER]
})

module.exports = kafka