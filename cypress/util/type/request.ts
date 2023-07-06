/**
 * Request definion
 *
 * @typedef {Object} request
 * @property {string} method - 'GET' | 'POST' | 'PUT' | 'DELETE'
 * @property {string} path - request url
 * @property {Object} body - request body
 * @property {Object} headers - request headers
 * @property {boolean} failOnStatusCode - True: will throw an exception when a failing status code was thrown (eg. 401)
 */
export type request = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body?: Object
  headers?: Object
  failOnStatusCode?: boolean
}
