import { rabbitMessage } from '../rabbit-message'
import { manualRegTopics } from './type/routingKeys'

/**
 * Creates image touch points for touch registration
 * @param {Array<{x: string, y:string, z:string, norm_x:string, norm_y:string, norm_z:string}>} imagePoints : An array of image points for touch registration, where each point is in the following format:
 * {
    x: string,
    y: string,
    z: string,
    norm_x: string,
    norm_y: string,
    norm_z: string
}
 */
export function createImageTouchPoints(
  imagePoints: Array<{
    x: string
    y: string
    z: string
    norm_x: string
    norm_y: string
    norm_z: string
  }>
) {
  const pointsPayload = {
    imagepnts: imagePoints
  }

  // send image points using rabbit
  rabbitMessage(
    manualRegTopics.regImagePoints,
    pointsPayload,
    manualRegTopics.regLandmarkInfo
  )
}

/**
 * Defines navigated touch locations for touch registration
 * @param {Array<{offset: number, point:Array<number>}>} touchPayloadArray : An array of nav touch locations, where each point is in the following format:
 * {
    offset: number,
    point: number[];
}
 */
export function defineNavTouchLocations(
  touchPayloadArray: Array<{ offset: number; point: Array<number> }>
) {
  // send nav locations using rabbit
  for (const touchPayload of touchPayloadArray) {
    rabbitMessage(
      manualRegTopics.regTouchPoint,
      touchPayload,
      manualRegTopics.regTouchInst
    )
  }
}
