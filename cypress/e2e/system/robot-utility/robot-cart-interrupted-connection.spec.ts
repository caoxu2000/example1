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
 *   2. Until JUNO-14132 is resolved, this spec cannot be run in full as robot simulator must be stopped and restarted during the test.
 *      Tests will be skipped until this issue is resolved.
 **/

before(() => {
  util.auth.login()
  util.exit()
  cy.visit('/')

  cy.setLanguage()

  util.assert.urlIs(guiRoutes.selectProcedure)

  procedure.action.select(procedure.opt.availableProcedures.spinalFusion)

  // Check that robot cart is added
  menu.action.clickEquipment()
  equipment.robotCart().should('exist')
})

beforeEach(() => {
  // TODO: Skipping the stop simulator call for now until JUNO-14132 is resolved,
  // simulator must be started before running the spec and stopping here will prevent spec from executing
  // Stop and restart robot simulator, to put it in a known state
  // robotUtility.action.robotSimulatorAction('stop')
  // TODO: JUNO-14132: sshExe doesn't work with startRobotSimulator. Need to update the sshExe function call
  // robotUtility.action.robotSimulatorAction('start')

  util.auth.login()
  cy.visit('/')
})

after(() => {
  // Stop Robot simulator
  robotUtility.action.robotSimulatorAction('stop')
})

// robot cart interrupted connection tests
describe('CR105564', () => {
  // Defect: Robot Communication status updating slowly on Equipment task - JUNO-24949
  it.skip('TC-CR105564-Sys-0010, Check that interrupted communication is updated within required time on Equipment task', () => {
    // stop robot simulator and assert the cart disconnects within the required time
    // record current time
    const communicationInterruptStart = Date.now()
    // stop the simulator
    robotUtility.action.robotSimulatorAction('stop')
    // assert cart status updates within the required time
    equipment.assert.robotCartDisconnectCheck(communicationInterruptStart)
  })
  it('TC-CR105564-Sys-0020, Check that interrupted communication is updated within required time on Robot Utility task', () => {
    // Navigate to Robot Utility task
    menu.action.clickRobotUtility()
    // stop robot simulator and assert the cart disconnects within the required time
    // record current time
    const communicationInterruptStart = Date.now()
    // stop the simulator
    robotUtility.action.robotSimulatorAction('stop')
    // assert cart status updates within the required time
    robotUtility.assert.cartStatusDisconnectCheck(communicationInterruptStart)
  })
})
