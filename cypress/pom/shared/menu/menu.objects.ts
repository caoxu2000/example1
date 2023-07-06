import { taskLabel } from '../task-labels'
import { translatedPhrase } from '@util/translated-phrase'

/**
 * Description:
 * Object accessors for the main task-menu.
 * Objects are found by label, otherwise by test-id
 */

export const object = {
  /**
   * Returns the toggle to open the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the main toggle when the menu is closed
   */
  mainToggle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByTestId(taskLabel.mainToggle.id)
  },
  /**
   * Returns the toggle to close the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the main toggle when the menu is open
   */
  mainToggleClose(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByTestId('task-menu-header')
  },
  /**
   * Returns the Images button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Images button
   */
  images(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'images',
      exact: true
    })
  },
  /**
   * Returns the Planning button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Planning button
   */
  plan(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'planning',
      exact: true
    })
  },
  /**
   * Returns the Registration button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Registration button
   */
  registration(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'registration',
      exact: true
    })
  },
  /**
   * Returns the TRU button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the TRU button
   */
  tru(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: translatedPhrase('TRU'),
      exact: true
    })
  },
  /**
   * Returns the Navigation button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Navigation button
   */
  navigation(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'navigation',
      exact: true
    })
  },
  /**
   * Returns the Equipment button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Equipment button
   */
  equipment(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'equipment',
      exact: true
    })
  },
  /**
   * Returns the Instruments button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Instruments button
   */
  instruments(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'instruments',
      exact: true
    })
  },
  /**
   * Returns the Export button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Export button
   */
  export(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'export',
      exact: true
    })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the button to toggle the Admin sub-menu in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Admin toggle
   */
  adminToggle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', { name: 'admin', exact: true })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the Surgeon button in the Admin sub-menu within the main menu
   * Note that the Admin sub-menu must be open in order to access this element
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Surgeon button
   */
  surgeon(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'surgeon',
      exact: true
    })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the Patient button in the Admin sub-menu within the main menu
   * Note that the Admin sub-menu must be open in order to access this element
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Surgeon button
   */
  patient(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'patient',
      exact: true
    })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the DICOM button in the main menu
   * Note that the Admin sub-menu must be open in order to access this element
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the DICOM button
   */
  dicom(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', { name: 'dicom', exact: true })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the About This Stealth button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the About This Stealth button
   */
  about(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', {
      name: 'about-this-stealth',
      exact: true
    })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the Exit Procedure button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Exit Procedure button
   */
  exit(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', { name: taskLabel.exit.id, exact: true })
  },
  /**
   * TODO: Update the Translation when available JUNO-13312
   * Returns the Robot Utility button in the main menu
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} : HTML element of the Robot Utility button
   */
  robotUtility(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findByRole('button', { name: 'robot-utility', exact: true })
  }
  // TODO: uncomment these when the functions are added
  // mergeImages() {},
  // truVerify() {},
  // selectProcedure() {},
  // acquireImages() {},
  // starfix() {},
  // frameReg() {}
}
