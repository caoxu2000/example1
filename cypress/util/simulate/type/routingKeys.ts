import { routingKeyNames } from './routingKeyNames'
import { routingKey } from './routingKey'

export const manualRegTopics = {
  regImagePoints: 'trutask.importimagepnts',

  regLandmarkInfo: 'trutask.landmarkinfo',

  regTouchPoint: 'truloc.touchpnt',

  regTouchInst: 'trutask.touchinstructions'
} as Record<routingKeyNames, routingKey>
