import { api } from './api-routes'
import { request } from './request'

/**
 * Delete all patient records via api
 */
export function cleanPatientDb() {
  cy.log('util.cleanPatientDb')

  request({ method: 'DELETE', path: api.patients })
}
