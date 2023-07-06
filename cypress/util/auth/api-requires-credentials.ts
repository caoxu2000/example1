import { api } from '../api-routes'
import { request } from '../request'

/**
 * Checks status of credentials
 *
 * Response includes set-cookie header with connect.sid cookie which is set with on response.
 * connect.sid is necessary for all requests.
 * @return {boolean}
 */
export function getApiAuthRequired() {
  cy.log('util.auth.getApiAuthRequired')

  return request({ method: 'GET', path: api.required }).then((res) => {
    return res.body.requiresCredentials
  })
}
