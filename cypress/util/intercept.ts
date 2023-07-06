import { aliasRoute } from './type/cy-alias'

/**
 * @Description add intercept to be watched for
 * @param {aliasRoute} alias the api call being intercepted (including its method, path, and name)
 */
function addIntercept(alias: aliasRoute) {
  cy.intercept(alias.method, alias.path).as(alias.name)
}

/**
 * @Description wait for defined route to be intercepted
 * @param {aliasRoute} alias api call being intercepted
 * @param {Number} timeout the amount of time to wait for the api call (in ms) before a timeout
 */
function waitForIntercept(alias: aliasRoute, timeout = 5000) {
  cy.wait(`@${alias.name}`, { timeout: timeout })
}

export const intercept = {
  addIntercept,
  waitForIntercept
}
