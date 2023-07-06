import { apiLogin } from './api-login'
import { setLocalToken } from './local-token'
import { getCurrentLoginStrategy } from './read-current-strategy'
import { authCheck } from './api-auth-check'
import { setLocalClientId } from './local-clientId'

/**
 * Logs into the application with the local strategy via a request to login endpoint and stores token/cookie into a session
 * @param {string} username username used to log into the app
 * @param {string} password password used to log into the app
 * TODO: Juno-24988 - Modify login to be able to use both localStrategy and networkStrategy
 */
export function login(username = 'stealth', password = 'stealth') {
  cy.log('util.auth.login')

  // Link the supported strategy to its login method
  const supportedStrategies = {
    local: apiLogin.bind(null, 'POST', username, password)
  }

  // Obtain the Current login strategy
  getCurrentLoginStrategy().then((loginStrategies) => {
    // Login to application if login method is supported, otherwise throw error
    if (loginStrategies.localStrategy in supportedStrategies) {
      cy.log(
        `Logging into application via strategy: ${loginStrategies.localStrategy}`
      )

      // Login to application and cache the browser session
      // Note: This will be rerun if login credentials become no longer valid
      //       Otherwise the cached login session will be used in testing
      cy.session(
        [username, password],
        () => {
          // Login to application via current strategy
          supportedStrategies[loginStrategies.localStrategy]().then(
            (authToken: string) => {
              // Set the local token from response
              // Note: Cookie is handled through session and does not need to be set
              setLocalToken(<string>authToken)
            }
          )

          // For now assign a random id to client id, this will be updated when Session design is complete
          const uid = `${Date.now().toString(36)}${Math.random()
            .toString(36)
            .substr(2)}`
          setLocalClientId(uid)
        },
        {
          /**
           * Validate whether login credentials are still authenticated from auth service
           */
          validate() {
            authCheck().its('status').should('eq', 200)
          }
        }
      )
    } else {
      throw new Error(
        `ERROR: Current login strategy: ${
          loginStrategies.localStrategy
        } is not supported, please change application login strategy to one of the following supported strategies: ${Object.keys(
          supportedStrategies
        )}`
      )
    }
  })
}
