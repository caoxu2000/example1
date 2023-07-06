const { _ } = Cypress
import { request } from './type/request'
import { getLocalToken } from '@util/auth/local-token'
/**
 * Cypress request with default token
 * @param {request} options - request definition
 * @return {Cypress.Chainable<Cypress.Response<any>>}
 * Note: Cypress request includes any cookies prevously set
 * https://docs.cypress.io/api/commands/request#Cookies
 */
export function request({
  method,
  path,
  body,
  headers,
  failOnStatusCode = true
}: request): Cypress.Chainable<Cypress.Response<any>> {
  cy.log('util.request')

  return getLocalToken().then((token) => {
    cy.log(`Bearer Token: ${token}`)
    const authHeader = token ? `Bearer ${token}` : null

    const options = {
      method: method,
      url: path, // @todo after consolidating api and route configs, set baseUrl here
      body: body,
      headers: _.defaults(headers, { authorization: authHeader }),
      failOnStatusCode
    }

    // make request, remove undefined and null props
    return cy.request(_.omitBy(options, [_.isUndefined, _.isNull]))
  })
}
