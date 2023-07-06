export { LevelWidthSlider } from '@global-config/LevelWidthSlider'
export { Colormap } from '@global-config/Colormap'

/**
 * Layout Option Name in the right panel under the gear icon of the preset box
 */
export enum LayoutOptionsInPreset {
  LAYOUT_ONE = 'layoutOne',
  LAYOUT_TWO = 'layoutTwo',
  LAYOUT_THREE_RIGHT = 'layoutThreeRight',
  LAYOUT_THREE_LEFT = 'layoutThreeLeft',
  LAYOUT_THREE_BOTTOM = 'layoutThreeBottom',
  LAYOUT_THREE = 'layoutThree',
  LAYOUT_FOUR = 'layoutFour',
  LAYOUT_FOUR_RIGHT = 'layoutFourRight',
  LAYOUT_SIX = 'layoutSix',
  LAYOUT_NINE = 'layoutNine'
}

export enum Display {
  SHADED = 'Shaded',
  GLASS = 'Glass'
}

export enum CutType {
  AXIAL = 'Axial',
  CORONAL = 'Coronal',
  SAGITTAL = 'Sagittal',
  ORTHOGONAL = 'Orthogonal',
  OBLIQUE = 'Oblique'
}
