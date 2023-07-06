import { object } from './registration.objects'
import { registration } from './index'
import { alias } from '@util/type/cy-alias'
import { touchImagePoint, touchNavPoint } from '@fixtures/type/regPoint'
import { LevelWidthSlider } from '@global-config/LevelWidthSlider'
import { manualRegTopics } from '@util/simulate/type/routingKeys'
import { util } from '@util/index'
import { rabbitMessage } from '@util/rabbit-message'

export const action = {
  /**
   * Adjusts the level slider value
   * @param {string} newValue : Value to adjust the level slider to
   */
  adjustLevel(newValue: string) {
    cy.log('Moving Level to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    action.adjustSlider(newValue, registration.opt.LevelWidthSlider.LEVEL)
  },

  /**
   * Adjusts the width slider value
   * @param {string} newValue : Value to adjust the width slider to
   */
  adjustWidth(newValue: string) {
    cy.log('Moving Width to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    action.adjustSlider(newValue, registration.opt.LevelWidthSlider.WIDTH)
  },

  /**
   * Helper function to adjust the level or width slider value
   * TODO: JUNO-6881 - delete when slider common functionality is added
   * @param {string} newValue : Value to adjust the slider to
   * @param {LevelWidthSlider} sliderName : name of the slider container to adjust (level or width)
   */
  adjustSlider(newValue: string, sliderName: LevelWidthSlider) {
    object.sliderContainer(sliderName).then(($sliderContainer) => {
      object
        .slider($sliderContainer)
        .as('value')
        .invoke('val', newValue)
        .trigger('change', { force: true })

      // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
      object.sliderValue($sliderContainer).should('have.text', newValue)
    })
  },

  /**
   * Updates the colormap selector to the desired colormap name and asserts change
   * @param {string} colormapName: the name of the colormap to update to
   */
  updateColormap(colormapName: string) {
    object.colormap().click()
    object.selectColormap(colormapName).click()
    object.colormapValue().should('have.text', colormapName)
  },

  /**
   * Updates the modality selector to the desired modality name and asserts change
   * @param {string} modalityName: the name of the modality to update to
   */
  updateModality(modalityName: string) {
    object.modality().click()
    object.selectModality(modalityName).click()
    object.modalityValue().should('have.text', modalityName)
  },

  /**
   * Creates touch registration with given image points, nav points and asserts accuracy
   * @param {touchImagePoint} imagePoints: An array of image points for touch registration
   * @param {touchNavPoint} navPoints: An array of nav points for touch registration
   * @param {string} expectedAccuracy: the expected accuracy of the registration from the given points
   */
  createTouchRegistration(
    imagePoints: touchImagePoint,
    navPoints: touchNavPoint,
    expectedAccuracy: string
  ) {
    util.createImageTouchPoints(imagePoints)
    // TODO: in EB 2008 this process fails without waiting for image and touch points to be injected -remove when possible
    cy.wait(5000)
    util.defineNavTouchLocations(navPoints)
    cy.wait(5000)
    object.registrationAccuracy().should('have.text', expectedAccuracy + ' mm')
  },

  /**
   * Clicks the RESTART button and waits for the registration to reset
   */
  restartReg() {
    cy.waitForApi(alias.restartTouch, () => {
      object.restart().click()
    })
  },

  /**
   * Clicks the DELETE landmark button and waits for the landmark to delete
   */
  deleteLandmark() {
    cy.waitForApi(alias.deleteLandmark, () => {
      object
        .touchpointMenu(registration.opt.TouchPanelActionButton.DELETE)
        .click()
    })
  },
  /**
   * Clicks the ASSIGN landmark button and and asserts that the landmark was assigned an order
   * @param {number} landmarkPosition: position of desired landmark (top left is 1 - increases across the row)
   */
  assignLandmark(landmarkPosition: number) {
    // TODO: JUNO-24484: This assumes that the touchpoint menu is not open - will error if the menu is already open. Investigate a better way to do this
    object
      .touchpointMenu(registration.opt.TouchPanelActionButton.ASSIGN)
      .should(($touchpointMenuState) => {
        expect(
          $touchpointMenuState,
          'action.assignLandmark requires that touchpoint menu is NOT open. Close menu before calling action.assignLandmark'
        ).to.not.exist
      })
    // Open touchpoint menu and assign landmark
    object.landmark(landmarkPosition).click()
    object
      .touchpointMenu(registration.opt.TouchPanelActionButton.ASSIGN)
      .click()
    object
      .landmark(landmarkPosition)
      .should('have.text', landmarkPosition.toString())
    // Close touchpoint menu
    registration.landmark(landmarkPosition).click()
  },

  /**
   * Assigning order to all detected landmarks
   */
  assignOrderToAllLandmarks() {
    registration.assert.touchOrderNotAssigned()
    object
      .landmarkList()
      .its('length')
      .then(($landmarkListLength) => {
        for (let marker = 1; marker <= $landmarkListLength; marker++) {
          registration.action.assignLandmark(marker)
        }
      })
  },

  /**
   * Clicks the UNDO LAST ACTION button and waits for touch action to undo
   */
  undoLastAction() {
    cy.waitForApi(alias.undoTouch, () => {
      object.undoLastAction().click()
    })
  },

  // TODO : JUNO-28217 - update this function to use camera simulator and move its rabbit implementation to Util
  /**
 * Collects a single navigated touch location for touch registration
 * @param {{offset: number, point:Array<number>}} touchPayload : The touch location to collect
 * {
    offset: number,
    point: number[];
   }
 */
  defineSingleNavTouchLocation(touchPayload: {
    offset: number
    point: Array<number>
  }) {
    // send nav location using rabbit
    rabbitMessage(
      manualRegTopics.regTouchPoint,
      touchPayload,
      manualRegTopics.regTouchInst
    )
  }
}
