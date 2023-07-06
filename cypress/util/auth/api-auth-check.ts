import { api } from '../api-routes'
import { request } from '../request'

/**
 * Request if login credentials are succesfully authenticated from auth service
 * @return {Cypress.Chainable<Cypress.Response<any>>}: return a Cypress.Chainable Response object
 */
export function authCheck(): Cypress.Chainable<Cypress.Response<any>> {
  cy.log('util.auth.authCheck')

  return request({
    method: 'GET',
    path: api.authCheck,
    body: {},
    headers: {}, // overide header since we don't want the auth token in this request
    failOnStatusCode: false // not authenticated returns status code 401 which is typically a test failure
  })
}
