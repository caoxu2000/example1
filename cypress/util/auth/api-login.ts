import { api } from '../api-routes'
import { request } from '../request'

/**
 * Request api token from auth service
 *
 * @param {string} method GET | POST depending on requires-credentials response
 * @param {string} user username
 * @param {string} pwd password
 * @return {string} api token
 */
export function apiLogin(method: 'GET' | 'POST', user: string, pwd: string) {
  cy.log('util.auth.apiLogin')

  return request({
    method,
    path: api.login,
    body: { username: user, password: pwd },
    headers: {} // overide header since we don't want the auth token in this request
  }).then((request) => {
    return request.body.token
  })
}
