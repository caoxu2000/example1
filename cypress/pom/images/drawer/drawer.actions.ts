import { pom as pomCommon } from '../common/type/common'
import { commonAction } from '../common/common.actions'
import { object } from './drawer.objects'

import { OpacityWindowSlider } from '@global-config/OpacityWindowSlider'
import { LevelWidthSlider } from '@global-config/LevelWidthSlider'

import { alias } from '@util/type/cy-alias'

export const action = {
  ...commonAction,
  /**
   * Clicks on desired image Card
   * @param {string} examName : exam name to select
   * */
  clickImageCard(examName: string) {
    cy.waitForApi(alias.detail, () => {
      // select exam
      object.imageCard(examName).click()
    })
  },

  /**
   * Adjusts the level slider value
   * @param {string} newValue : Value to adjust the level slider
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   */
  adjustLevel(newValue: string, imageCard: pomCommon.images.common.seriesCard) {
    cy.log('Moving Level to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    action.adjustSlider(newValue, LevelWidthSlider.LEVEL, imageCard)
  },

  /**
   * Adjusts the window slider value
   * @param {string} newValue : Value to adjust the window slider
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   */
  adjustWindow(
    newValue: string,
    imageCard: pomCommon.images.common.seriesCard
  ) {
    cy.log('Moving Window to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    action.adjustSlider(newValue, OpacityWindowSlider.WINDOW, imageCard)
  },

  /**
   * Adjusts the opacity slider value
   * @param {string} newValue : Value to adjust the opacity slider
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   */
  adjustOpacity(
    newValue: string,
    imageCard: pomCommon.images.common.seriesCard
  ) {
    cy.log('Moving Opacity to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    action.adjustSlider(newValue, OpacityWindowSlider.OPACITY, imageCard)
  },

  /**
   * Updates the display dropdown to the desired display name
   * @param {string} displayName: the name of the display to update to
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   */
  updateDisplay(
    displayName: string,
    imageCard: pomCommon.images.common.seriesCard
  ) {
    object.display(imageCard).click()
    object.displayOption(displayName).click()
    object.display(imageCard).should('have.text', displayName)
  },

  /**
   * Updates the cutType dropdown to the desired cutType name
   * @param {string} cutTypeName: the name of the cutType to update to
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard: HTML Element of the selected image card
   */
  updateCutType(
    cutTypeName: string,
    imageCard: pomCommon.images.common.seriesCard
  ) {
    object.cutType(imageCard).click()
    object.cutTypeOption(cutTypeName).click()
    object.cutType(imageCard).should('have.text', cutTypeName)
  }
}
