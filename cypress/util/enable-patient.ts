import { request } from './request'
import { getPatientList } from './get-patient-list'
import { getLocalClientId } from './auth/local-clientId'
import { generateEndpoint } from './generate-endpoint'
import { api } from './api-routes'
import { patient } from '@fixtures/type/patient'

/**
 * Enables the specified patient to allow it to be selected
 * @param {patient} patient : Desired patient to enable
 */
export function enablePatient(patient: patient) {
  cy.log(`util.enablePatient: ${patient.name}`)

  // get list of all patients, find desired patient from list and grab OID
  getPatientList().then(($patientList) => {
    const pt = $patientList.filter((obj) => obj.name === patient.name)

    // get client ID, then send request to enable patient with OID and client ID
    // TODO: this request currently does not work because the endpoint was deleted
    // DD should be giving us a different endpoint (similar to this) that will allow us to enable a patient
    const pathName = generateEndpoint(
      api.enablePatient,
      '<PATIENT_OID>',
      pt[0].oid
    )
    getLocalClientId().then((cid) => {
      request({
        method: 'DELETE',
        path: pathName,
        body: { clientID: cid }
      })
    })
  })
}
