import { guiRoutes } from '@util/assert/config'
import { object } from './menu.objects'
import { menuStatus } from '../type/menu-status'
import { util } from '@util'
const language = Cypress.env('allLanguages')

/**
 * Description:
 * Validations for the main task menu
 */
export const assert = {
  /**
   * Assert the current task is Images
   */
  images() {
    util.assert.urlIs(guiRoutes.images)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and('have.text', language[Cypress.env('language')].Images.defaultMessage)
    cy.findByRole('heading', { name: 'Patient Images', exact: true }).should(
      'be.visible'
    )
  },
  /**
   * Assert the current task is Plan
   */
  plan() {
    util.assert.urlIs(guiRoutes.plan)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and('have.text', language[Cypress.env('language')].Plan.defaultMessage)
  },
  /**
   * Assert the current task is Registration
   */
  registration() {
    util.assert.urlIs(guiRoutes.registration)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and('have.text', language[Cypress.env('language')].TRU.defaultMessage)
  },
  /**
   * Assert the current task is TRUVerify
   */
  truVerify() {
    util.assert.urlIs(guiRoutes.truVerify)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].TRUVerify.defaultMessage
      )
  },
  /**
   * Assert the current task is Navigation
   */
  navigation() {
    util.assert.urlIs(guiRoutes.navigation)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].Navigation.defaultMessage
      )
  },
  /**
   * Assert the current task is Equipment
   */
  equipment() {
    util.assert.urlIs(guiRoutes.equipment)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].Equipment.defaultMessage
      )
    cy.findByTestId('right-panel-text').should('have.text', 'Equipment')
  },
  /**
   * Assert the current task is Instruments
   */
  instruments() {
    util.assert.urlIs(guiRoutes.instruments)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].Instruments.defaultMessage
      )
    cy.findByTestId('right-panel-text').should('have.text', 'Instruments')
  },
  /**
   * Assert the current task is Export
   */
  export() {
    util.assert.urlIs(guiRoutes.export)
  },
  /**
   * Assert the current task is Surgeon Admin
   */
  surgeon() {
    util.assert.urlIs(guiRoutes.surgeon)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].SurgeonAdmin.defaultMessage
      )
  },
  /**
   * Assert the current task is Patient Admin
   */
  patient() {
    util.assert.urlIs(guiRoutes.patient)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].PatientAdmin.defaultMessage
      )
  },
  /**
   * Assert the current task is Dicom Admin
   */
  dicom() {
    util.assert.urlIs(guiRoutes.dicom)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].DicomAdmin.defaultMessage
      )
  },
  /**
   * Assert the current task is About This System
   */
  about() {
    util.assert.urlIs(guiRoutes.about)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and(
        'have.text',
        language[Cypress.env('language')].AboutThisStealth.defaultMessage
      )
  },
  /**
   * Assert the current task is SelectProcedure
   */
  exit() {
    util.assert.urlIs(guiRoutes.selectProcedure)
  },
  /** TODO: Update when Translation available JUNO-13312
   * Assert the current task is RobotUtility
   */
  robotUtility() {
    util.assert.urlIs(guiRoutes.robotUtility)
    cy.findByRole('button', { name: 'current-task-button' })
      .should('be.visible')
      .and('have.text', 'Robot Utility')
  },
  /**
   * Compares menu state to expected state
   * @param {menuStatus} enabled
   * @param {menuStatus} disabled
   */
  menuStatus(enabled?: menuStatus, disabled?: menuStatus) {
    object.mainToggle().click()
    if (enabled)
      enabled.forEach(($el) => {
        $el().should('be.enabled')
      })

    if (disabled)
      disabled.forEach(($el) => {
        $el().should('be.disabled')
      })
  }
}
