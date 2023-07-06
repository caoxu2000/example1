import { pom } from './type/common'

import { cyGui } from '@util/type/cyGui'

import { toTestIdFormat } from '@util/stringFormats'

export const commonObject = {
  /**
   * Returns the right panel, which houses the Patient Images pane
   * @return {cyGui<pom.images.common.rightPanel>} : HTML element of the right panel
   */
  rightPanel(): cyGui<pom.images.common.rightPanel> {
    return cy.findByTestId('RightPanel')
  },

  /**
   * Returns the gear control button for selected image card / selected exam card
   * @param {cyGui<pom.images.common.seriesCard>} seriesCard : HTML Element of the selected series card
   * @return {cyGui<pom.images.common.gearControl>} : HTML element of the gear control button
   */
  gearControl(
    seriesCard: pom.images.common.seriesCard
  ): cyGui<pom.images.common.gearControl> {
    return cy
      .wrap(seriesCard)
      .findByRole('button', { name: 'gear-control-button', exact: true })
  },

  /**
   * Returns the specified slider container
   * Note that the gear control button must be selected in order to access this element; in the Images drawer, the 2D or 3D tab must also be selected
   * @param {string} sliderName : Name of the slider to select
   * @param {cyGui<pom.images.common.seriesCard>} seriesCard : HTML Element of the selected series card
   * @return {cyGui<pom.images.common.sliderContainer>} : HTML element of the selected slider container
   */
  sliderContainer(
    sliderName: string,
    seriesCard: pom.images.common.seriesCard
  ): cyGui<pom.images.common.sliderContainer> {
    return cy
      .wrap(seriesCard)
      .findByTestId(toTestIdFormat(sliderName) + '-slider')
  },

  /**
   * Returns the slider from within the specified slider container
   * Note that the gear control button must be selected in order to access this element; in the Images drawer, the 2D or 3D tab must also be selected
   * @param {pom.images.common.sliderContainer} sliderContainer : HTML element of the selected  slider container
   * @return {cyGui<pom.images.common.slider>} : HTML element of the  slider
   */
  slider(
    sliderContainer: pom.images.common.sliderContainer
  ): cyGui<pom.images.common.slider> {
    return cy.wrap(sliderContainer).find('[class="MuiSlider-thumb"]')
  },

  /**
   * Returns the current slider value from within the specified slider container
   * @param {pom.images.common.sliderContainer} sliderContainer : HTML element of the selected slider container
   * @return {cyGui<pom.images.common.sliderValue>} : HTML element of the slider value
   */
  sliderValue(
    sliderContainer: pom.images.common.sliderContainer
  ): cyGui<pom.images.common.sliderValue> {
    return cy
      .wrap(sliderContainer)
      .findByTestId('slider-current-value', { exact: true })
  },

  /**
   * Returns the colormap dropdown for the exam card
   * Note that the gear control button must be selected in order to access this element; in the Images drawer, the 2D or 3D tab must also be selected
   * @param {cyGui<pom.images.common.seriesCard>} seriesCard : HTML Element of the selected series card
   * @return {cyGui<pom.images.common.colormapDropdown>} : HTML element of the Colormap dropdown
   */
  colormapDropdown(
    seriesCard: pom.images.common.seriesCard
  ): cyGui<pom.images.common.colormapDropdown> {
    return cy
      .wrap(seriesCard)
      .findByRole('button', { name: 'colormap-dropdown', exact: true })
  },

  /**
   * Returns the colormap value
   * Note that the gear control button must be selected in order to access this element; in the Images drawer, the 2D or 3D tab must also be selected
   * @param {cyGui<pom.images.common.seriesCard>} seriesCard : HTML Element of the selected series card
   * @return {cyGui<pom.images.common.currentColormap>} : HTML element of the Colormap dropdown value
   */
  currentColormap(
    seriesCard: pom.images.common.seriesCard
  ): cyGui<pom.images.common.currentColormap> {
    return cy.wrap(seriesCard).findByTestId('colormap-current-value')
  },

  /**
   * Returns the specified option from the colormap dropdown
   * Note that the gear control button must be selected in order to access this element; in the Images drawer, the 2D or 3D tab must also be selected
   * @param {string} colormapName : Name of the colormap to select
   * @return {cyGui<pom.images.common.colormapOption>} : HTML element of the desired colormap option
   */
  colormapOption(
    colormapName: string
  ): cyGui<pom.images.common.colormapOption> {
    return cy.findByRole('option', { name: colormapName, exact: true })
  }
}
