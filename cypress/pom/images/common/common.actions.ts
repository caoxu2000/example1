import { commonObject } from './common.objects'
import { pom } from './type/common'

import { LevelWidthSlider } from '@global-config/LevelWidthSlider'

export const commonAction = {
  /**
   * Adjusts the slider value
   * TODO: JUNO-6881 - delete when slider common functionality is added
   * @param {string} newValue : Value to adjust the slider to
   * @param {string} sliderName : name of the slider container to adjust
   * @param {pom.images.common.seriesCard} seriesCard: HTML element of the selected image card / selected exam card
   */
  adjustSlider(
    newValue: string,
    sliderName: string,
    seriesCard: pom.images.common.seriesCard
  ) {
    commonObject
      .sliderContainer(sliderName, seriesCard)
      .then(($sliderContainer) => {
        commonObject
          .slider($sliderContainer)
          .invoke('val', newValue)
          .trigger('change', { force: true })

        // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
        // TODO: JUNO-6881 - Assert is commented as the slider does not work
        // object.sliderValue($sliderContainer).should('have.text', newValue)
      })
  },

  /**
   * Updates the colormap dropdown to the desired colormap name
   * @param {string} colormapName: the name of the colormap to update to
   * @param {pom.images.common.seriesCard} seriesCard: HTML element of the selected image card / selected exam card
   */
  updateColormap(
    colormapName: string,
    seriesCard: pom.images.common.seriesCard
  ) {
    commonObject.colormapDropdown(seriesCard).click()
    commonObject.colormapOption(colormapName).click()
    commonObject.colormapDropdown(seriesCard).should('have.text', colormapName)
  },

  /**
   * Adjusts the level slider value
   * @param {string} newValue : Value to adjust the level slider
   * @param {cyGui<pom.images.common.seriesCard>} seriesCard : HTML Element of the selected image card
   */
  adjustLevel(newValue: string, seriesCard: pom.images.common.seriesCard) {
    cy.log('Moving Level to value of ' + newValue)
    // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
    commonAction.adjustSlider(newValue, LevelWidthSlider.LEVEL, seriesCard)
  }
}
