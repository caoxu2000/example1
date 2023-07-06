import { object } from './drawers.objects'
import { pom } from './type/drawers'

export const action = {
  /**
   * Click the icon to show the selected planned item
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the selected plan container
   */
  show(plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer) {
    object.hiddenIcon(plannedItemContainer).click()
  },

  /**
   * Click the icon to hide the selected planned item
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the selected plan container
   */
  hide(plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer) {
    object.visibleIcon(plannedItemContainer).click()
  },

  /**
   * Click the icon to lock the selected planned item
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the selected plan container
   */
  lock(plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer) {
    object.unlockedIcon(plannedItemContainer).click()
  },

  /**
   * Click the icon to unlock the selected planned item
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the selected plan container
   */
  unlock(plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer) {
    object.lockedIcon(plannedItemContainer).click()
  }
}
