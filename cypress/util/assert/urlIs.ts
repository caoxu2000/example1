/**
 * Accepts the URL path and asserts against the fully qualified, current page URL
 * @param {string} path url path minus host (baseUrl)
 */
export function urlIs(path: string) {
  if (path.includes('auth') || path.includes('login')) {
    cy.url().should(
      'eq',
      `${Cypress.env('protocol')}://${Cypress.env('host')}/${path}`
    )
  } else {
    // baseUrl defaults to the frontend namespace /gui
    cy.url().should('eq', `${Cypress.config().baseUrl}/${path}`)
  }
}
