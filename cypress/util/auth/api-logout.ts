import { api } from '../api-routes'
import { request } from '../request'

/**
 * TODO:  JUNO-15237 - Fix naming schema to match login
 * Logout of the application using auth service
 * @return {Cypress.Chainable<Cypress.Response<any>>} : Cypress Response Object
 */
export function apiLogout(): Cypress.Chainable<Cypress.Response<any>> {
  cy.log('util.auth.apiLogout')

  return request({
    method: 'GET',
    path: api.logout,
    body: {}
  })
}
