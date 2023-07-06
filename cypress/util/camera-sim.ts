import { instrument as instrumentTask } from '@pom/instruments'
import { instrumentType } from '@global-config/instruments'
import cameraSimSDK from '@juno/camerasimmethods'
import cypressEnv from '../../cypress.env.json'

// TODO: JUNO-15641 Slight refactor to replace all Cypress requests to the camera sim with the Camera Sim SDK when it is fully implemented
// TODO: JUNO-23832 Revisit SDK errors and add error handling to this file if needed
const dockerIp = 'http://172.17.0.2:5000/'
const simulatorHost = dockerIp + 'hardwaresim-wapi/v1'

const toolVerificationPositionEndPoint = '/toolVerificationPosition'
const isToolVisible = '/isToolVisible'
const isCameraStarted = '/isSimulatorStarted'

interface coordinates {
  tip: Array<number>
  hind: Array<number>
  spin?: number
}

/**
 * Start the camera simulator
 * @return {void}
 */
export function startCamSim(): void {
  cy.log('util.camerasim.startCamSim')

  // Verify if simulator was previously started
  _isCameraStarted().then(async (res) => {
    // If no simulator instance was found, start the simulator
    if (res === false) {
      cy.then({ timeout: 45000 }, async () => {
        // Start camerasim via SDK. Note: inputs are hostIp, cameraSimIP, number of attempts to start thus far, and max number of attempts
        await cameraSimSDK.startCamSim(
          cypressEnv.host,
          cypressEnv.cameraSimulatorAddress,
          0,
          3
        )
        cy.log('Camera simulator successfully started')
      })
    }
    // Otherwise log and continue
    else {
      cy.log('Camera Simulator is already started, continuing...')
    }
  })
}

/**
 * Stops the Camera Simulator
 * @return {void}
 */
export function stopCamSim(): void {
  cy.log('util.camerasim.stopCamSim')

  // Verify if simulator was previously started
  _isCameraStarted().then(async (res) => {
    // If a simulator instance was found, stop the simulator
    if (res === true) {
      cy.then({ timeout: 10000 }, async () => {
        await cameraSimSDK.stopCamSim()
        cy.log('Camera simulator successfully stopped')
      })
    }
    // Otherwise log and continue
    else {
      cy.log('Camera Simulator is already stopped, continuing...')
    }
  })
}

/**
 * Put a tool in camera FOV so it is visible to the camera
 * @param {instrumentType} tool : Tool to display to the camera
 * @return {void}
 */
export function showTool(tool: instrumentType): void {
  cy.log('util.camerasim.showTool')

  // Verify tool visibility status
  _isToolVisible(tool).then(async (res) => {
    // If a tool is hidden from camera, show the tool
    if (res === false) {
      cy.then({ timeout: 10000 }, async () => {
        await cameraSimSDK.showTool(tool.name)
        cy.log(`Tool: ${tool.name} successfully displayed to camera`)
      })
    }
    // If tool is already visible, hide and show again to reset tool location
    else {
      await cameraSimSDK.hideTool(tool.name)
      await cameraSimSDK.showTool(tool.name)

      cy.log(
        `Tool ${tool.name} was already visible to camera, sucessfully reset the tool's location. Continuing...`
      )
    }
  })
}

/**
 * Remove a tool from camera FOV so it is not visible to the camera
 * @param {instrumentType} tool : Tool to hide from the camera
 * @return {void}
 */
export function hideTool(tool: instrumentType): void {
  cy.log('util.camerasim.hideTool')

  // Verify tool visibility status
  _isToolVisible(tool).then(async (res) => {
    // If a tool is visible to camera, hide the tool
    if (res === true) {
      cy.then({ timeout: 5000 }, async () => {
        await cameraSimSDK.hideTool(tool.name)
        cy.log(`Tool: ${tool.name} successfully hidden from camera`)
      })
    }

    // Otherwise log and continue
    else {
      cy.log(`Tool ${tool.name} is hidden from camera, continuing...`)
    }
  })
}

/**
 * Simulates a tool location [x,y,z] in exam space
 * @param {instrumentType} tool: Tool to simulate point
 * @param {Array<number>} tipCoord : [x,y,z] Array of the tool tip location in exam space
 * @param {Array<number>} hindCoord : (Optional) [x,y,z] Array of the tool hind location in exam space
 * @param {number} spin : (Optional) Increment in degrees to rotate the tool in reference to the camera's position - rotation begins from 0 and should always be positive
 * @param {boolean} avoidMovementSmoothing : (Optional) if True - adds a brief cyclical movement when simulating the tool to avoid any movement smoothing applicated by loc procesing
 *                                                      if False (default) - moves the tool directly to the new coordinates
 * @return {void}
 */
export function simulatePoint(
  tool: instrumentType,
  tipCoord: Array<number>,
  hindCoord?: Array<number>,
  spin = 0,
  avoidMovementSmoothing = false
): void {
  cy.log('util.camerasim.simulatePoint')
  cy.then({ timeout: 5000 }, async () => {
    await cameraSimSDK.simulateSyntheticToolPosition({
      tool_name: tool.name,
      tip: tipCoord,
      hind: hindCoord,
      spin: spin,
      avoid_movement_smoothing: avoidMovementSmoothing
    })
    cy.log(`Tool: ${tool.name} location successfully updated`)
  })
}

/**
 * Verify a tool in the application
 * @param {instrumentType} tool : Tool to verify
 * @param {instrumentType} frame : Frame to use for verification
 * @return {void}
 */
export function verifyTool(tool: instrumentType, frame: instrumentType): void {
  cy.log('util.camerasim.verifyTool')
  _getDivotCoordinates(tool, frame).then(
    async ([tool_coords, frame_coords]) => {
      simulatePoint(frame, frame_coords.tip, frame_coords.hind)

      simulatePoint(tool, tool_coords.tip, tool_coords.hind, tool_coords.spin)

      // Verify verification was successful by waiting for the card to be green status
      cy.log('Waiting for the tool to become verified')

      // TODO: Tool verification can only currently be verified from instruments task
      //  JUNO-15642, Assert should be updated to check banner message when available
      instrumentTask.task.assert.isToolVerified(tool, true)
    }
  )
}

/**
 * Navigates a tool in camera FOV for the specified number of seconds
 * Note that the tool must be in the camera FOV and visible in order to be navigated
 * @param {instrumentType} tool : Tool to navigate with
 * @param {number} seconds : Time in seconds to navigate the tool for
 * @return {Promise<void>}
 */
export function navigateTool(
  tool: instrumentType,
  seconds: number
): Promise<void> {
  cy.log(
    `util.camerasim.navigateTool: Navigating ${tool.name} for ${seconds} seconds`
  )
  // Define navigation path and counter that determines direction
  const squareCoords = [
    [0, -50, 0],
    [50, 0, 0],
    [0, 50, 0],
    [-50, 0, 0]
  ]
  let counter = 0

  // Convert duration to milliseconds
  const duration = seconds * 1000

  /**
   * TODO: JUNO-29749 - create linter rule exception to not require JSDoc for inner function
   * Change the position of the tool every 100 ms for the specified duration
   * @return {void}
   */
  function navigate() {
    _moveTool(tool, squareCoords[counter])
    if (counter == squareCoords.length - 1) {
      counter = 0
    } else counter++
  }
  return new Cypress.Promise((resolve) => {
    setTimeout(() => {
      clearInterval(id)
      resolve()
    }, duration)
    const id = setInterval(navigate, 100)
  })
}

/**
 * Helper function to get correct divot coordinates necessary to verify a tool
 * @param {instrumentType} tool : Tool to get the divot coordinates of
 * @param {instrumentType} frame : Frame to get the divot coordinates of
 * @return {Cypress.Chainable<Array<coordinates>>} Required tool and frame coordinates for placing tool in frame divot
 */
function _getDivotCoordinates(
  tool: instrumentType,
  frame: instrumentType
): Cypress.Chainable<Array<coordinates>> {
  cy.log('util.camerasim._getDivotCoordinates')

  return cy
    .request({
      method: 'GET',
      url: simulatorHost + toolVerificationPositionEndPoint,
      qs: {
        // Note: object keys are SDK dependant and cannot be modified
        instrument_name: tool.name,
        frame_name: frame.name
      }
    })
    .then(
      ({
        body: { frame_coordinates, probe_coordinates }
      }: {
        body: {
          frame_coordinates: coordinates
          probe_coordinates: coordinates
        }
      }) => {
        return [probe_coordinates, frame_coordinates]
      }
    )
}

/**
 * Helper function to verify if simulator is started
 * @return {Cypress.Chainable<boolean>} : True - if simulator is started
 *                                        False - if simulator stopped
 */
function _isCameraStarted(): Cypress.Chainable<boolean> {
  cy.log('util.camerasim._isCameraStarted')

  return cy
    .request({
      method: 'GET',
      url: simulatorHost + isCameraStarted
    })
    .then(({ body }: { body: boolean }) => body)
}

/**
 * Helper function to verify if tool is visible
 * @param {instrumentType} tool : Tool to obtain the visibility status of
 * @return {Cypress.Chainable<boolean>} : True - if tool is visible to camera
 *                                        False - if tool is hidden from camera
 */
function _isToolVisible(tool: instrumentType): Cypress.Chainable<boolean> {
  cy.log('util.camerasim._isToolVisible')

  return cy
    .request({
      method: 'GET',
      url: simulatorHost + isToolVisible,
      qs: {
        tool_name: tool.name
      }
    })
    .then(({ body }: { body: boolean }) => body)
}

/**
 * TODO: JUNO-23705 - Investigate whether logging can be turned off selectively; if so, add log to this function
 * Helper function to translate a tool in space by a set generic [x,y,z] increment to simulate navigation movement
 * @param {instrumentType} tool : Desired tool to move
 * @param {Array<number>} increment : [x,y,z] Array of the increment amount to move the tool
 * @return {Cypress.Chainable<void>}
 */
function _moveTool(
  tool: instrumentType,
  increment: Array<number>
): Cypress.Chainable<void> {
  return cy.then({ timeout: 10000 }, async () => {
    await cameraSimSDK.moveTool(tool.name, increment)
    cy.log(`Tool: ${tool.name} successfully moved`)
  })
}
