import { api } from './api-routes'
import { request } from './request'
import { getLocalClientId } from './auth/local-clientId'

/**
 * Exit Procedure via api
 * @throws {Error} when endpoint returns an unexpected status
 */
export function exit() {
  cy.log('util.exit')

  getLocalClientId().then((cid) => {
    cy.log(`clientId: ${cid}`)
    request({
      method: 'POST',
      path: api.exit,
      body: { clientID: cid },
      failOnStatusCode: false
    }).then((response) => {
      // TODO: JUNO-24494 - Update api exit procedure accordingly once resolved
      if (response.status === 202) {
        cy.log('Successfully exited')
      } else if (
        response.status === 404 &&
        response.body.error.includes('Cannot find session')
      ) {
        cy.log(
          'Expected issue JUNO-24494 encountered while exiting, continuing ...'
        )
      } else {
        throw new Error('Unexpected failure occurred while exiting procedure')
      }
    })
  })
}
