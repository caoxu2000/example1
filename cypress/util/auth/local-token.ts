/**
 * Gets the stored bearer token in browser window's local storage
 *
 * @return {string} token
 */
export function getLocalToken() {
  cy.log('util.auth.getLocalToken')

  return cy.window({ log: false }).then((window) => {
    return window.localStorage.getItem('token')
  })
}

/**
 * Set the provided bearer token in browser window's local storage
 * @param {string} authToken: the browser bearer token to set
 */
export function setLocalToken(authToken) {
  cy.log(`util.auth.setLocalToken: ${authToken}`)

  cy.window({ log: false }).then((window) => {
    window.localStorage.setItem('token', authToken)
  })
}
