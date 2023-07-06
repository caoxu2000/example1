import { pom } from './type/drawer'
import { commonObject } from '../common/common.objects'
import { pom as pomCommon } from '../common/type/common'

import { cyGui } from '@util/type/cyGui'

export const object = {
  ...commonObject,

  /**
   * Returns the images button for selected exam card
   * @return {cyGui<pom.images.drawer.imagesDrawer>} : HTML element of the drawer images button
   */
  imagesDrawer(): cyGui<pom.images.drawer.imagesDrawer> {
    return cy.findByRole('button', { name: 'Images', exact: true })
  },

  /**
   * Returns the image card with the provided exam name
   * @param {string} examName : Name of the patient exam to be selected
   * @return {cyGui<pomCommon.images.common.seriesCard>} : HTML Element of the selected image card
   */
  imageCard(examName: string): cyGui<pomCommon.images.common.seriesCard> {
    return commonObject
      .rightPanel()
      .contains(examName)
      .parents('[data-testid="images-card"]')
  },

  /**
   *
   * Returns the 2D button in visible state for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.visibleIcon2d>} : HTML element of the drawer Show 2D Button
   */
  visibleIcon2d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.visibleIcon2d> {
    return cy.wrap(imageCard).findByTestId('show-icon-2d', { exact: true })
  },

  /**
   * Returns the 3D button in visible state for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.visibleIcon3d>} : HTML element of the drawer Show 3D Button
   */
  visibleIcon3d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.visibleIcon3d> {
    return cy.wrap(imageCard).findByTestId('show-icon-3d', { exact: true })
  },

  /**
   * Returns the 2D button in hidden state for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.hideIcon2d>} : HTML element of the drawer Hide 2D Button
   */
  hideIcon2d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.hideIcon2d> {
    return cy.wrap(imageCard).findByTestId('hide-icon-2d', { exact: true })
  },

  /**
   * Returns the 3D button in hidden state for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.hideIcon3d>} : HTML element of the drawer Hide 3D Button
   */
  hideIcon3d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.hideIcon3d> {
    return cy.wrap(imageCard).findByTestId('hide-icon-3d', { exact: true })
  },

  /**
   * Returns the 2D tab for selected image card.
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.drawerTab2d>} : HTML element of the drawer 2D Tab
   */
  drawerTab2d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.drawerTab2d> {
    return cy.wrap(imageCard).findByRole('tab', { name: '2D', exact: true })
  },

  /**
   * Returns the 3D tab for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.drawerTab3d>} : HTML element of the drawer 3D Tab
   */
  drawerTab3d(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.drawerTab3d> {
    return cy.wrap(imageCard).findByRole('tab', { name: '3D', exact: true })
  },

  /**
   * Returns the display dropdown for the image card
   * Note that the gear control button and 3D tab must be selected  in order to access this element
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.display>} : HTML element of the display dropdown
   */
  display(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.display> {
    return cy
      .wrap(imageCard)
      .findByRole('button', { name: 'display-dropdown', exact: true })
  },

  /**
   * Returns the display value
   * Note that the gear control button and 3D tab must be selected in order to access this element
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.displayValue>} : HTML element of the Display dropdown value
   */
  displayValue(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.displayValue> {
    return cy
      .wrap(imageCard)
      .findByTestId('display-current-value', { exact: true })
  },

  /**
   * Returns the specified option from the display dropdown
   * Note that the gear control button and 3D tab must be selected in order to access this element
   * @param {string} displayName : Name of the display to select
   * @return {cyGui<pom.images.drawer.displayOption>} : HTML element of the desired display option
   */
  displayOption(displayName: string): cyGui<pom.images.drawer.displayOption> {
    return cy.findByRole('option', { name: displayName, exact: true })
  },

  /**
   * Returns the cutType dropdown for the image card
   * Note that the gear control button and 3D tab must be selected  in order to access this element
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.cutType>} : HTML element of the cutType dropdown
   */
  cutType(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.cutType> {
    return cy
      .wrap(imageCard)
      .findByRole('button', { name: 'cut-type-dropdown', exact: true })
  },

  /**
   * Returns the cutType value
   * Note that the gear control button and 3D tab must be selected in order to access this element
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.cutTypeValue>} : HTML element of the CutType dropdown value
   */
  cutTypeValue(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.cutTypeValue> {
    return cy
      .wrap(imageCard)
      .findByTestId('cut-type-current-value', { exact: true })
  },

  /**
   * Returns the specified option from the cutType dropdown
   * Note that the gear control button and 3D tab must be selected in order to access this element
   * @param {string} cutTypeName : Name of the cutType to select
   * @return {cyGui<pom.images.drawer.cutTypeOption>} : HTML element of the desired cutType option
   */
  cutTypeOption(cutTypeName: string): cyGui<pom.images.drawer.cutTypeOption> {
    return cy.findByRole('option', { name: cutTypeName, exact: true })
  },

  /**
   * Returns the cut mode toggle for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.cutMode>} : HTML element of the drawer cut mode toggle
   */
  cutMode(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.cutMode> {
    return cy.wrap(imageCard).findByTestId('cut-mode', { exact: true })
  },

  /**
   * Returns the freeze toggle for selected image card
   * @param {cyGui<pomCommon.images.common.seriesCard>} imageCard : HTML Element of the selected image card
   * @return {cyGui<pom.images.drawer.freeze>} : HTML element of the drawer freeze toggle
   */
  freeze(
    imageCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.drawer.freeze> {
    return cy.wrap(imageCard).findByTestId('freeze', { exact: true })
  }
}
