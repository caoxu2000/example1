export { Colormap } from '@global-config/Colormap'
export { Modality } from '@global-config/Modality'
export { LevelWidthSlider } from '@global-config/LevelWidthSlider'
import { touchImagePoint, touchNavPoint } from '@fixtures/type/regPoint'

export type TRURegistrationType = {
  method: 'TOUCH' | 'TRACE'
  imagePoints: touchImagePoint
  navPoints: touchNavPoint
  expectedAccuracy?: string
}

export enum TouchPanelActionButton {
  ASSIGN = 'assign',
  CLEAR = 'clear',
  DELETE = 'delete',
  SAVE = 'save',
  CANCEL = 'cancel'
}
