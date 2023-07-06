/**
 * @description Helper function to sanitize strings used for ids
 *
 * @param {string} word
 * @return {string}
 */
module.exports = function cleanIdString(word) {
  return word
    .replace(/[^a-zA-Z\d\s:]/g, '') // anything not alphanumeric
    .replace(/\u00C0-\u00FF/, '') // accented latin charaters
}
