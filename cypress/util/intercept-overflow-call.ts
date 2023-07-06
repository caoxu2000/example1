import { api } from './api-routes'

/**
 * Intercept the procedures call and insert a string to force an overflow on the page
 * @param {string} injectedResponse
 */
export function interceptOverflowCall(injectedResponse: string) {
  cy.intercept('GET', api.procedures, (req) => {
    req.continue((res) => {
      res.body.cases[0].standardProfile.procedures[0].name = injectedResponse
    })
  })
}
