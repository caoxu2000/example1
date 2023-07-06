/**
 * Gets the clientID from the browser's local storage
 *
 * @return {string} clientId
 */
export function getLocalClientId() {
  cy.log('util.auth.getLocalClientId')

  return cy.window({ log: false }).then((window) => {
    return window.localStorage.getItem('clientID')
  })
}

/**
 * Set the provided clientId in browser window's local storage
 *
 * @param {string} clientId clientID from guiwebserver
 */
export function setLocalClientId(clientId) {
  cy.log(`util.auth.setLocalClientId: ${clientId}`)

  cy.window({ log: false }).then((window) => {
    window.localStorage.setItem('clientID', clientId)
  })
}
