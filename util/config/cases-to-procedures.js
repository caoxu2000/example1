const superagent = require('superagent')
const fs = require('fs')
const env = require('../../cypress.env')
const toEnumFormat = require('./toEnumFormat')
const toTestIdFormat = require('./toTestIdFormat')

/**
 * @description Re-formats the procedures array of objects to an object of
 * named objects
 * @param {string} anatomy cranial | ent | spine
 * @param {Array} procedures from /cases
 * @return {object} reformatted object
 */
function mapCases(anatomy, procedures) {
  const cases = {}
  let count = 0
  for (const item of procedures) {
    // create copy for mutations
    const detail = Object.assign({}, item)

    // denormalize, add anatomy identifier to each detail
    detail.anatomy = toEnumFormat(anatomy)

    // unset id since its different per app instance
    // @todo develop process to dynamically generate the ids for this config
    detail.id = ''

    // add all details under object with procedure name as property id
    cases[toTestIdFormat(detail.name)] = detail
    count++
  }
  console.log(`${count} options`)
  return cases
}

/**
 * @description Writes procedures.json to be later casted to a typed object
 * @param {*} proc formatted api object
 */
function writeJson(proc) {
  fs.writeFile(
    './cypress/fixtures/data/procedures.json',
    JSON.stringify(proc, null, 2),
    (err) => (err ? console.log(err) : console.log('----'))
  )
}

/**
 *  @description Generates a configuration based on the /cases api
 */
;(async () => {
  try {
    const url = `${env.protocol}://${env.host}/proceduretask/v1/cases`
    // get api data for config file
    console.log(url)
    const res = await superagent.get(url)
    // new config object
    const proc = {}
    // process cases to new format for options config
    for (const anatomyObject of res.body) {
      console.log(`-- ${anatomyObject.name} --`)
      // rebuild details as object
      const obj = mapCases(
        anatomyObject.name,
        anatomyObject.standardProfile.procedures
      )
      // attach object to property on new config
      Object.assign(proc, obj)
    }
    // overwrite json
    writeJson(proc)
  } catch (err) {
    console.error(err)
  }
})()
