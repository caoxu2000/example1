import cypressEnv from './cypress.env.json'

module.exports = {
  rabbitCredentials: {
    hostname: cypressEnv.host,
    port: 5672,
    username: 'stealth',
    password: ';subrosa;'
  },
  defaultRabbitExchange: 'stealth'
}
