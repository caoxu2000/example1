import { request } from './request'
import { api } from './api-routes'

/**
 * Gets list of all patients available in the This Stealth tab
 * @return {Cypress.Chainable<Cypress.Response<Body>>} List of patients
 */
export function getPatientList() {
  cy.log('util.getPatientList')

  return request({ method: 'GET', path: api.patients }).its('body')
}
