const cleanIdString = require('./cleanIdString')

/**
 * @description Manipulates string for use as a property id (CamelCase)
 *
 * @param {string} word
 * @return {string}
 */
module.exports = function toTestIdFormat(word) {
  let out = ''
  const clean = cleanIdString(word)

  clean.split(' ').forEach((el, idx) => {
    const add = el.toLowerCase()
    out += idx === 0 ? add : add[0].toUpperCase() + add.slice(1)
  })
  return out
}
