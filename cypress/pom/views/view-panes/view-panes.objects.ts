import { cyGui } from '@util/type/cyGui'
import { pom } from './type/view-panes'
import { ViewType } from './view-panes.options'

export const object = {
  /**
   * Returns the desired view selection dropdown by its position
   * @param {number} position: the position index number of the dropdown in the view layout left pane: 1 corresponds to top left corner
   * - 2 is to the right of 1 in the same raw, n is the bottom right corner where n is the total number of viewpanes
   * @return {cyGui<pom.views.viewPanes.viewSelectionDropdownByPosition>} : HTML Element of the specified view selection dropdown
   */
  viewSelectionDropdownByPosition(
    position: number
  ): cyGui<pom.views.viewPanes.viewSelectionDropdownByPosition> {
    return cy.findAllByTestId('view-dropdown').eq(position - 1)
  },
  /**
   * Returns the desired view selection dropdown by its current value
   * // TODO: JUNO-25054 Revert the following type of 'viewType' from 'string' back to 'ViewType once the bug JUNO-24839 is fixed
   * @param {string} viewType: the view type of the selection dropdown to be selected
   * @param {number} viewNumber: an optional parameter to include if trying to select the view dropdown for a view type that is currently displayed on the page more than once
   *  - the number of the view pane of that type (1 corresponds to top left corner, 2 is to the right of 1, n is the bottom right corner where n is the total number of viewpanes)
   * @return {cyGui<pom.views.viewPanes.viewSelectionDropdownByValue>} : HTML Element of the specified view selection dropdown
   */
  viewSelectionDropdownByValue(
    viewType: string,
    viewNumber?: number
  ): cyGui<pom.views.viewPanes.viewSelectionDropdownByValue> {
    if (viewNumber) {
      return cy
        .findByTestId('views-layout')
        .findAllByText(viewType, { exact: true })
        .eq(viewNumber - 1)
    } else {
      return cy
        .findByTestId('views-layout')
        .findByText(viewType, { exact: true })
    }
  },

  /**
   * Returns the desired button from the view selection list
   * Note that the viewSelection dropdown needs to be open in order to access this element
   * @param {ViewType} viewType: the view type of the button to be selected
   * @return {cyGui<pom.views.changeView>} : HTML Element of the specified button from the view selection list
   */
  changeView(viewType: ViewType): cyGui<pom.views.viewPanes.changeView> {
    return cy.findByRole('menuitem', { name: viewType, exact: true })
  },

  /**
   * Returns the canvas of the desired view type
   * @param {ViewType} viewType: the view type of the desired view pane
   * @return {cyGui<pom.views.viewPane>} : HTML Element of the canvas of the desired view pane
   */
  viewPane(viewType: ViewType): cyGui<pom.views.viewPanes.viewPane> {
    return object
      .viewSelectionDropdownByValue(viewType)
      .parents('[data-testid="single-view"]')
      .findByTestId('view-pane')
  },

  /**
   * Returns the desired button from the Image Tool Bar
   * @param {string} imageButtonName: name of the button to select from the Image Tool Bar
   * @return {cyGui<pom.views.imageToolBarButton>} : HTML Element of the desired button from the image tool bar
   */
  imageToolBarButton(
    imageButtonName: string
  ): cyGui<pom.views.viewPanes.imageToolBarButton> {
    return cy
      .findByTestId('image-toolbar')
      .findByText(imageButtonName)
      .parents('[data-testid="image-toolbar-button"]')
  }
}
