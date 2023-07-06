import { object } from './drawer.objects'
import { pom } from './type/drawer'

export const action = {
  /**
   * Adjusts the slider of the specified slider container (adjusts the opacity, width, or length value)
   * @param {number} newValue : Value to adjust the slider to
   * @param {pom.instruments.drawer.sliderContainer} sliderContainer : HTML element of the selected slider container
   */
  adjustSlider(
    newValue: number,
    sliderContainer: pom.instruments.drawer.sliderContainer
  ) {
    object
      .slider(sliderContainer)
      .invoke('val', newValue)
      .trigger('change', { force: true })
      .click({ force: true })
  },
  /**
   * Click the icon to show the selected tool in the views
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool
   */
  show(toolCard: pom.instruments.drawer.toolCard) {
    object.hiddenIcon(toolCard).click()
  },
  /**
   * Click the icon to hide the selected tool in the views
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool
   */
  hide(toolCard: pom.instruments.drawer.toolCard) {
    object.visibleIcon(toolCard).click()
  }
}
