/**
 * Get the provided session id cookie
 *
 * @return {Cypress.Chainable<Cypress.Cookie>} : cookie from browser
 */
export function getAuthCookie(): Cypress.Chainable<Cypress.Cookie> {
  return cy
    .getCookie('connect.sid')
    .then((cookie) => {
      cy.log(`util.getAuthCookie: ${JSON.stringify(cookie)}`)
    })
    .then((cookie) => cookie)
}
