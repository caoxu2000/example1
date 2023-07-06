import { object } from './menu.objects'
import { assert } from './menu.asserts'
import { menuOptions } from './menu.options'
import { alias } from '@util/type/cy-alias'

/**
 * Actions for the main menu
 * @module menu.action
 */
export const action = {
  /**
   * Go to the Images task from the main menu
   */
  clickImages() {
    object.mainToggle().click()
    object.images().click()
    assert.images()
  },
  /**
   * Go to the Export page from the main menu
   */
  clickExport() {
    object.mainToggle().click()
    object.export().click()
    assert.export()
  },
  /**
   * Go to the Surgeon page from the main menu
   */
  clickSurgeon() {
    object.mainToggle().click()
    _openAdminToggle()
    object.surgeon().click()
    assert.surgeon()
  },
  /**
   * Go to the Patient Admin page from the main menu
   */
  clickPatient() {
    object.mainToggle().click()
    _openAdminToggle()
    object.patient().click()
    assert.patient()
  },
  /**
   * Go to the DICOM Transfer page from the main menu
   */
  clickDicom() {
    object.mainToggle().click()
    _openAdminToggle()
    object.dicom().click()
    assert.dicom()
  },
  /**
   * Go to the About This Stealth page from the main menu
   */
  clickAboutThisStealth() {
    object.mainToggle().click()
    object.about().click()
    assert.about()
  },
  /**
   * Go to the Equipment task from the main menu
   */
  clickEquipment() {
    object.mainToggle().click()
    object.equipment().click()
    assert.equipment()
    // TODO: JUNO-14068, remove when a better wait is determined
    cy.findAllByTestId('equipment-card-av')
  },
  /**
   * Go to the Planning task from the main menu
   */
  clickPlanning() {
    object.mainToggle().click()
    object.plan().click()
    assert.plan()
  },
  /**
   * Go to the Registration task from the main menu
   */
  clickRegistration() {
    object.mainToggle().click()
    cy.waitForApi(alias.enterTaskReg, () => {
      object.registration().click()
    })
    assert.registration()
  },
  /**
   * Go to the Instruments task from the main menu
   */
  clickInstruments() {
    object.mainToggle().click()
    cy.waitForApi(alias.enterInstruments, () => {
      object.instruments().click()
    })
    assert.instruments()
  },
  /**
   * Go to the Navigation task from the main menu
   */
  clickNavigation() {
    object.mainToggle().click()
    object.navigation().click()
    assert.navigation()
  },
  /**
   * Go to the Robot Utility task from the main menu
   */
  clickRobotUtility() {
    object.mainToggle().click()
    object.robotUtility().click()
    assert.robotUtility()
  },
  /**
   *  Open main menu and click Exit Procedure
   */
  clickExitProcedure() {
    object.mainToggle().click()
    object.exit().click()
    assert.exit()
  },
  /**
   * Go to the specified task from the main menu
   * @param {menuOptions} task : Name of the task to go to
   */
  goToMenuTask(task: menuOptions) {
    const transitions = {
      [menuOptions.IMAGES]: action.clickImages,
      [menuOptions.EXPORT]: action.clickExport,
      [menuOptions.SURGEON]: action.clickSurgeon,
      [menuOptions.PATIENT]: action.clickPatient,
      [menuOptions.DICOM]: action.clickDicom,
      [menuOptions.ABOUT_THIS_STEALTH]: action.clickAboutThisStealth,
      [menuOptions.EQUIPMENT]: action.clickEquipment,
      [menuOptions.PLANNING]: action.clickPlanning,
      [menuOptions.REGISTRATION]: action.clickRegistration,
      [menuOptions.INSTRUMENTS]: action.clickInstruments,
      [menuOptions.NAVIGATION]: action.clickNavigation,
      [menuOptions.ROBOT_UTILITY]: action.clickRobotUtility
    }

    transitions[task]()
  }
}
/**
    The Admin section of the main menu is unique because it maintains its open
    state across pages, thus you only have to open it once. If your code blindly
    clicks the Admin toggle you may actually be closing section rather than opening it
    which will cause an error for the next sequence.

    Cypress docs caution against testing the dom for state like this, however,
    this may be a reasonable exception to the rule.
    Read this for more info:
    https://docs.cypress.io/guides/core-concepts/conditional-testing#Element-existence
    */
function _openAdminToggle() {
  cy.findByTestId('CategoryGroup').then(($admin) => {
    // check for generated class
    if ($admin.hasClass('css-1knc1kn')) object.adminToggle().click()
  })
}
