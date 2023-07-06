import { object } from './this-stealth.objects'
import { alias } from '@util/type/cy-alias'
import { patient as patientPanel } from '@pom/images/patient'
import { patient } from '@fixtures/type/patient'
import { CssColors } from '@global-config/CssColors'

export const action = {
  /**
   * Selects the 'This Stealth' tab
   * */
  selectThisStealth() {
    object.stealthTab().click()
    object.stealthTab().should('have.attr', 'aria-selected', 'true')
  },

  /**
   * Search for patient exam from the images "this stealth" tab
   * @param {patient} patient : Patient to search
   **/
  searchPatient(patient: patient) {
    // select the This Stealth tab, search for the patient
    action.selectThisStealth()
    object.searchBar().type(patient.name)
  },

  /**
   * Select patient exam from the images "this stealth" tab
   * @param {patient} patient : Patient to select
   **/
  selectPatient(patient: patient) {
    cy.waitForApi(alias.thumbnail, () => {
      // select the patient
      object.patientCard(patient.name).click()
    })

    // assert card color
    object
      .patientCard(patient.name)
      .should('have.css', 'border-color', CssColors.PATIENT_CARD_COLOR_BLUE)
  },

  /**
   * Selects patient exam from the images "this stealth" tab
   * @param {patient} patient : Patient to select
   * @param {string} examName : exam name to select
   * */
  selectExam(patient: patient, examName: string) {
    action.searchPatient(patient)
    action.selectPatient(patient)
    patientPanel.action.clickExamCard(examName)
  },

  /**
   * Clones the specified patient
   * @param {patient} patient : Patient to select
   */
  clonePatient(patient: patient) {
    // clone patient
    object.patientCard(patient.name).then(($selectedCard) => {
      cy.waitForApi(alias.clone, () => {
        object.clonePatient($selectedCard).click()
      })
    })

    // assert patient was cloned
    object
      .clonedPatient(patient.name)
      .should('exist')
      .then(($selectedCard) => {
        object.patientName($selectedCard).should('have.text', patient.name)
        object.patientMRN($selectedCard).should('include.text', patient.mrn)
      })
  }
}
