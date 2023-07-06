import { api } from '../api-routes'
import { request } from '../request'
import { loginStrategy } from './type/loginStrategy'

/**
 * Reads the server-side current network and local auth strategies
 *
 * @return {loginStrategy} current network and local strategies
 */
export function getCurrentLoginStrategy() {
  cy.log('util.auth.getCurrentLoginStrategy')

  return request({
    method: 'GET',
    path: api.loginStrategy
  }).then(async ({ body }) => {
    cy.log(
      `Current Login Strategies: networkStrategy-${body.networkStrategy}, localStrategy-${body.localStrategy}`
    )

    // Cast return as type login strategy
    return <loginStrategy>body
  })
}
