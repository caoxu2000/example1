import { procedure } from '@pom/select-procedure'
import { robotUtility } from '@pom/robot-utility'
import { equipment } from '@pom/equipment'
import { menu } from '@pom/shared/menu'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

/**
 * Pre-condition:
 *   1. In the future, Robotics License must be available to use the robotic cart.
 *      Until then, Robot Cart must be added to procedure and procedure exited before running this spec.
 *   2. Until JUNO-14132 is resolved, Robot Simulator must be started manually before running this spec
 **/

before(() => {
  util.auth.login()
  util.exit()
  cy.visit('/')

  cy.setLanguage()

  util.assert.urlIs(guiRoutes.selectProcedure)

  // TODO: Skipping the stop simulator call for now until JUNO-14132 is resolved,
  // simulator must be started before running the spec and stopping here will prevent spec from executing
  // Stop and restart Robot Simulator
  // robotUtility.action.robotSimulatorAction('stop')
  // TODO: JUNO-14132: sshExe doesn't work with startRobotSimulator. Need to update the sshExe function call
  // robotUtility.action.robotSimulatorAction('start')

  procedure.action.select(procedure.opt.availableProcedures.spinalFusion)

  // Check that robot cart is present, else fail
  menu.action.clickEquipment()
  equipment.robotCart().should('exist')
})

beforeEach(() => {
  util.auth.login()
  cy.visit('/')
})

after(() => {
  // Stop Robot simulator
  robotUtility.action.robotSimulatorAction('stop')
})

// robot cart connection tests
describe('CR105561', () => {
  it('TC-CR105561-Sys-0020, Check that communication is correctly displayed on Equipment task', () => {
    // Check that cart is connected on Equipment task
    menu.action.clickEquipment()
    equipment.robotCart().then(($robotCart) => {
      equipment.assert.connectionLineIsConnected($robotCart, true)
    })
  })
  it('TC-CR105561-Sys-0010, Check that communication is correctly displayed on Robot Utility task', () => {
    // Navigate to Robot Utility and Check that cart is connected on Robot Utility task
    menu.action.clickRobotUtility()
    robotUtility.assert.cartStatusIs(
      robotUtility.opt.RobotCartStatusState.communicating
    )
  })
  // Unable to restart the robot simulator in test, skipping the next two tests until JUNO-14132 is resolved
  it.skip('TC-CR105561-Sys-0031, Check that communication is correctly updated on connection/disconnection on Robot Utility task', () => {
    // Disconnect the robot simulator and check that status is shown as not communicating
    robotUtility.action.robotSimulatorAction('stop')
    robotUtility.assert.cartStatusIs(
      robotUtility.opt.RobotCartStatusState.notCommunicating
    )
    // Reconnect the robot simulator and check that status is shown as communicating
    // TODO: JUNO-14132: sshExe doesn't work with startRobotSimulator. Need to update the sshExe function call
    // robotUtility.action.robotSimulatorAction('start')
    robotUtility.assert.cartStatusIs(
      robotUtility.opt.RobotCartStatusState.communicating
    )
  })
  it.skip('TC-CR105561-Sys-0030, Check that communication is correctly updated on connection/disconnection on Equipment task', () => {
    menu.action.clickEquipment()
    // Disconnect the robot simulator and check that cart is shown as not communicating
    robotUtility.action.robotSimulatorAction('stop')
    equipment.robotCart().then(($robotCart) => {
      equipment.assert.connectionLineIsConnected($robotCart, false)
    })
    // Reconnect the robot simulator and check that status is shown as communicating
    // TODO: JUNO-14132: sshExe doesn't work with startRobotSimulator. Need to update the sshExe function call
    // robotUtility.action.robotSimulatorAction('start')
    equipment.robotCart().then(($robotCart) => {
      equipment.assert.connectionLineIsConnected($robotCart, true)
    })
  })
})
