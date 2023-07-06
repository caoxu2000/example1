import { object } from './view-panes.objects'
import { ViewType } from './view-panes.options'
import { viewPanes } from './index'
import { alias } from '@util/type/cy-alias'

export const action = {
  /**
   * Change the view type of desired view pane
   * @param {ViewType} currentViewType: the view type of the desired view pane to change
   * @param {ViewType} newViewType: the desired view type to change to
   * @param {number} currentViewNumber: the number of the currentViewType where 1 is the the top left corner
   * (numbers increase left to right) - an additional parameter to help select the view pane if the currentViewType
   * is displaying in more than one pane
   */
  changeViewTypeByValue(
    currentViewType: ViewType,
    newViewType: ViewType,
    currentViewNumber?: number
  ) {
    if (currentViewNumber) {
      cy.log(
        'Current View Type: ' + currentViewType + 'pane ' + currentViewNumber,
        'New View Type: ' + newViewType
      )

      // Click on view selection dropdown of desired view pane to change
      viewPanes
        .viewSelectionDropdownByValue(currentViewType, currentViewNumber)
        .click()
    } else {
      cy.log(
        'Current View Type: ' + currentViewType,
        'New View Type: ' + newViewType
      )

      // Click on view selection dropdown of desired view pane to change
      viewPanes.viewSelectionDropdownByValue(currentViewType).click()
    }

    // Select new view type to change to
    cy.waitForApi(alias.changeView, () => {
      viewPanes
        .changeView(newViewType)
        .click()
        // Assert that view type is updated
        .then(($changedView) => {
          cy.wrap($changedView).should('have.text', newViewType)
        })
    })
  },

  /**
   * Change the view type of desired view pane
   * @param {number} position: the position index number of the dropdown in the view layout left pane: 1 corresponds to top left corner
   * - 2 is to the right of 1 in the same row, n is the bottom right corner where n is the total number of viewpanes
   * @param {ViewType} newViewType: the desired view type to change to
   */
  changeViewTypeByPosition(position: number, newViewType: ViewType) {
    cy.log(
      'Current Viewpane Number: ' + position,
      'New View Type: ' + newViewType
    )

    // Click on view selection dropdown of desired view pane to change
    viewPanes.viewSelectionDropdownByPosition(position).click()

    // Select new view type to change to
    cy.waitForApi(alias.changeView, () => {
      viewPanes
        .changeView(newViewType)
        .click()
        // Assert that view type is updated
        .then(($changedView) => {
          cy.wrap($changedView).should('have.text', newViewType)
        })
    })
  },

  /**
   * Zoom in/out of the image in the specified pane
   * @param {ViewType} viewType: the desired view to zoom in/out of
   * @param {number} zoomIncrements: number of zoom increments to perform; positive number to zoom in, negative numer to zoom out
   */
  zoom(viewType: ViewType, zoomIncrements: number) {
    cy.log('View Type: ' + viewType, 'Zoom Increments: ' + zoomIncrements)

    // Find center of view pane to use as starting point in zoom
    getViewPaneCenter(viewType)
    cy.get('@canvasCenter').then((canvasCenter) => {
      const yStart = Number(canvasCenter[0])
      const xStart = Number(canvasCenter[1])
      cy.log('xStart and yStart are: ' + xStart + ' and: ' + yStart)

      object
        .viewPane(viewType)
        // Move mouse to view pane, right click (and hold) on view, move mouse, release right click
        .trigger('mousemove', { x: xStart, y: yStart, force: true })
        .trigger('mousedown', { force: true, buttons: 2, x: xStart, y: yStart })
        .trigger('mousemove', {
          x: xStart,
          y: yStart - zoomIncrements,
          force: true
        })
        .trigger('mouseup', { force: true })
    })
  },

  /**
   * TODO: JUNO-13436 - investigate a formula to reach a specific rotation
   * Rotate the image in the specified pane
   * @param {ViewType} viewType: the desired view to rotate
   * @param {number} rotateXPixels: number of pixels to move mouse to rotate in X direction
   * @param {number} rotateYPixels: number of pixels to move mouse to rotate in Y direction
   */
  rotate(viewType: ViewType, rotateXPixels: number, rotateYPixels: number) {
    cy.log(
      'Rotate Increments X: ' + rotateXPixels,
      'Rotate Increments Y: ' + rotateYPixels
    )
    const dx = -1 * rotateXPixels

    const dy = -1 * rotateYPixels

    // Find center point of view pane to use as starting point in rotation
    getViewPaneCenter(viewType)
    cy.get('@canvasCenter').then((canvasCenter) => {
      const yStart = Number(canvasCenter[0])
      const xStart = Number(canvasCenter[1])
      cy.log('xStart and yStart are: ' + xStart + ' and: ' + yStart)

      object
        .viewPane(viewType)
        // Move mouse to view pane, left click (and hold) on view, move mouse, release left click
        .trigger('mousemove', { x: xStart, y: yStart, force: true })
        .trigger('mousedown', { force: true, buttons: 1, x: xStart, y: yStart })
        .trigger('mousemove', { x: xStart + dx, y: yStart + dy, force: true })
        .trigger('mouseup', { force: true })
    })
  }
}

/**
 * Calculate the center of the given view pane dimension
 * @param {ViewType} viewType: the desired view type (input from spec files)
 */
function getViewPaneCenter(viewType: ViewType) {
  viewPanes
    .viewPane(viewType)
    .invoke('attr', 'height')
    .then((canvasHeight) => {
      const yStart = Number(canvasHeight) / 2
      viewPanes
        .viewPane(viewType)
        .invoke('attr', 'width')
        .then((canvasWidth) => {
          const xStart = Number(canvasWidth) / 2
          cy.wrap([yStart, xStart]).as('canvasCenter')
        })
    })
}
