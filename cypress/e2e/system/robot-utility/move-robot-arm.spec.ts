import { procedure } from '@pom/select-procedure'
import { robotUtility } from '@pom/robot-utility'
import { spinePlanning } from '@pom/spine-planning'
import { equipment } from '@pom/equipment'
import { menu } from '@pom/shared/menu'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

// Set local reference to lodash to enable iteration with _.each
const { _ } = Cypress

/**
 * Pre-conditions:
 *   1. In the future, Robotics License must be available to use the robotic cart.
 *      Until then, Robot Cart must be added to procedure and procedure exited before running this spec.
 *   2. Until JUNO-14132 is resolved, Robot Simulator must be started manually before running this spec.
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

  // Check that robot cart is added
  menu.action.clickEquipment()
  equipment.robotCart().should('exist')
  menu.action.clickRobotUtility()
})

beforeEach(() => {
  util.auth.login()
  cy.visit('/')

  robotUtility.assert.cartStatusIs(
    robotUtility.opt.RobotCartStatusState.communicating
  )
})

after(() => {
  // Stop Robot simulator
  robotUtility.action.robotSimulatorAction('stop')
})

describe('CR105559', () => {
  _.each(
    Object.keys(spinePlanning.robotControls.opt.RobotPositionStatusState),
    (positionKey, index) => {
      const position =
        spinePlanning.robotControls.opt.RobotPositionStatusState[positionKey]
      it(`TC-CR105559-Sys-0010-${index}, Verify user can select ${position.robotPosition} position, verify arm moves to ${position.robotPosition} position`, () => {
        robotUtility.positionDropDown().click()
        robotUtility.positionSelector(position.robotPosition).click()
        robotUtility.moveArm().click()
        robotUtility.assert.armMotionAndPositionAre(
          position.armMovingStatus,
          position.armMovingPosition
        )
        robotUtility.assert.armMotionAndPositionAre(
          position.armMovedStatus,
          position.armMovedPosition
        )
      })
    }
  )
  _.each(
    Object.keys(spinePlanning.robotControls.opt.RobotPositionStatusState),
    (positionKey, index) => {
      const position =
        spinePlanning.robotControls.opt.RobotPositionStatusState[positionKey]
      it(`TC-CR105559-Sys-0020-${index}, Move to ${position.robotPosition} position, verify dropdown is not available during movement`, () => {
        robotUtility.positionDropDown().click()
        robotUtility.positionSelector(position.robotPosition).click()
        robotUtility.moveArm().click()

        // Check that the dropdown is disabled during arm movement
        robotUtility.assert.dropdownIsDisabled(true)

        // Wait for arm to finish moving
        robotUtility.assert.armMotionAndPositionAre(
          position.armMovedStatus,
          position.armMovedPosition
        )
        // Check that the dropdown is available again after the arm is done moving
        robotUtility.assert.dropdownIsDisabled(false)
      })
    }
  )
})
