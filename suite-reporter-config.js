/* global process */
const reportDir = process.env.INDIV_REPORTS_DIR
const testCaseName = process.env.TEST_CASE_NAME

module.exports = {
  reporterEnabled: 'mochawesome, cypress-teamcity-reporter',
  mochawesomeReporterOptions: {
    reportDir: reportDir,
    reportFilename: testCaseName,
    consoleReporter: false,
    html: false,
    json: true,
    quite: true,
    overwrite: false
  }
}
