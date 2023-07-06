/**
 * Function to dynamically generate a request endpoint
 * @param {string} path : Request endpoint containing some string to replace
 * @param {string} searchValue : String to search for and replace
 * @param {string} replaceValue : String to replace the search value with
 * @return {string} Complete endpoint for the request
 */
export function generateEndpoint(
  path: string,
  searchValue: string,
  replaceValue: string
): string {
  return path.replace(searchValue, replaceValue)
}
