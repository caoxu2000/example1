import { object, layoutOptionsInPresetCssClass } from './drawer.objects'

type layoutOptions = keyof typeof layoutOptionsInPresetCssClass

export const assert = {
  /**
   * Asserts the layout preview image is expected
   * @param {string} presetName : name of the selected preset
   * @param {layoutOptions} layoutOptionName : name of the layout in the preview image
   * @param {number} numOfViewports : number of viewports in the layout
   */
  layoutPreviewImageIsExpected(
    presetName: string,
    layoutOptionName: layoutOptions,
    numOfViewports: number
  ) {
    object.presetContainer(presetName).then(($selectedPreset) => {
      object
        .layoutPreviewImage($selectedPreset, layoutOptionName)
        .should('exist')
        // TODO: add test id to the following element - JUNO-24986
        .find('.layouts-child')
        .should('have.length', numOfViewports)
    })
  }
}
