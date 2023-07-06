import { ViewType } from './view-panes.options'
import { object } from './view-panes.objects'

export const assert = {
  /**
   * Assert the viewport dropdown is at the right position with the right viewtype selected
   * @param {number} position: the index number of the viewport dropdown in the left view layout
   * @param {ViewType} viewType: the expected current view type
   */
  viewSelectionDropdownValue(position: number, viewType: ViewType) {
    object.viewSelectionDropdownByPosition(position).should('contain', viewType)
  },
  /**
   * Assert layout(s) in the left view layout
   * @param {[number, ViewType][]} layouts: layout array with position in the left view layout and expected view type, e.g. [[1, '3D'], [2, 'Axial']]
   */
  layoutsArePresent(layouts: [number, ViewType][]) {
    layouts.forEach((viewPort) => {
      assert.viewSelectionDropdownValue(viewPort[0], viewPort[1])
    })
  }
}
