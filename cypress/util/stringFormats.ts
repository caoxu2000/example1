/**
 * Change a string into kabob-case to match testid format
 * The first replace adds spaces between different words
 * The second replace converts the spaces to dashes
 * @param {string} variable : String to convert to kabob-case
 * @return {string} : Converted string
 */
export function toTestIdFormat(variable: string) {
  return variable
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Change a string into upper camel case (UpperCamelCase)
 * The match separates each word by checking for spaces, capital letters, and underscores
 * The map capitalizes the first letter of each word and makes the rest of the word lowercase
 * The join concatenates all of the strings
 * @param {string} variable : String to convert to upper camel case
 * @return {string} : Converted string
 */
export function toUpperCamelCase(variable: string) {
  return variable
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('')
}
