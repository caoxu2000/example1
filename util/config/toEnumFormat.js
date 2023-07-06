const _ = require('lodash')
const cleanIdString = require('./cleanIdString')

/**
 * @description Manipulates a string for use as an enum (UPPER_SNAKE_CASE)
 *
 * @param {string} word
 * @return {string}
 */
module.exports = function toEnumFormat(word) {
  return _.snakeCase(cleanIdString(word)).toUpperCase()
}
