import { object } from './drawer.objects'
import { viewPanes } from '../view-panes'
import { ViewType } from '../view-panes/view-panes.options'
import { pom } from './type/drawer'

import { alias } from '@util/type/cy-alias'

export const action = {
  /**
   * Adjusts the level or width slider value
   * TODO: delete when slider common functionality is added
   * @param {string} newValue : Value to adjust the slider to
   * @param {cyGui<pom.views.drawer.sliderContainer>} sliderContainer : HTML element of the level or width slider container
   */
  adjustSlider(
    newValue: string,
    sliderContainer: pom.views.drawer.sliderContainer
  ) {
    object
      .slider(sliderContainer)
      .as('value')
      .invoke('val', newValue)
      .trigger('change', { force: true })
  },

  /**
   * Click the gear icon of the selected preset
   * @param {string} presetName : name of the preset in the right panel
   */
  clickGearIconOfPreset(presetName: string) {
    object.presetContainer(presetName).then(($selectedPreset) => {
      object.gearControl($selectedPreset).click()
    })
  },

  /**
   * Config the views layout of the preset
   * @param {string} presetName : name of the preset in the right panel
   * @param {string} layoutName : name of the view layout
   * @param {ViewType[]} newViewTypeArray : a view type array containing the desired view types for each view pane starting from the top left corner; note that every single view pane must be set
   */
  configureViewsLayoutPreset(
    presetName: string,
    layoutName: string,
    newViewTypeArray?: ViewType[]
  ) {
    object.presetContainer(presetName).click()
    action.clickGearIconOfPreset(presetName)
    object.presetOptionsContainer(presetName).then(($selectedPresetConfig) => {
      cy.waitForApi(alias.previewLayout, () => {
        object.layoutOption($selectedPresetConfig, layoutName).click()
      })
      if (newViewTypeArray) {
        for (const [index, viewtype] of newViewTypeArray.entries()) {
          viewPanes.action.changeViewTypeByPosition(index + 1, viewtype)
        }
      }
      cy.waitForApi(alias.saveLayout, () => {
        object.saveLayoutButton($selectedPresetConfig).click()
      })
    })
    action.clickGearIconOfPreset(presetName)
  }
}
