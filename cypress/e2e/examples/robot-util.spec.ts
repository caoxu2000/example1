import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'
import { robotUtility } from '@pom/robot-utility'
import { spinePlanning } from '@pom/spine-planning'
import { equipment } from '@pom/equipment'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

/**
 * Pre-conditions:
 *   1. In the future, Robotics License must be available to use the robotic cart.
 *      Until then, Robot Cart must be added to procedure and procedure exited before running this spec.
 *   2. Until JUNO-14132 is resolved, Robot Simulator must be started manually before running this spec.
 *
 **/

describe('Example spec for the Robot Utility POMs', () => {
  before(() => {
    // start Robot Simulator
    // TODO: Use robotSimulatorAction to start the simulator when sshexe issue is resolved: JUNO-14132
    // robotUtility.action.robotSimulatorAction('start')

    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.spinalFusion)

    // Check that robot cart is present
    menu.action.clickEquipment()
    equipment.robotCart().should('exist')
  })

  after(() => {
    // Stop the simulator
    robotUtility.action.robotSimulatorAction('stop')
  })

  // Check Robot Utility Page
  it('Check Robot Utility Page', () => {
    // pre-select arm positions
    const armHome = spinePlanning.robotControls.opt.RobotPositions.HOME
    const armClearRight =
      spinePlanning.robotControls.opt.RobotPositions.CLEAR_RIGHT
    // Get to Robotic Utility page and ensure the communication is completed
    menu.action.clickRobotUtility()
    robotUtility.assert.cartStatusIs(
      robotUtility.opt.RobotCartStatusState.communicating
    )

    // Click on position selector, move the arm, and let movement complete so arm is in a known position
    robotUtility.action.moveArm(armClearRight)
    robotUtility.assert.armCurrentPositionIs(
      spinePlanning.robotControls.opt.ArmCurrentPosition.CLEAR_RIGHT
    )

    // Click on position selector, move the arm, then cancel the movement and ensure it cancels
    robotUtility.action.moveArm(armHome)
    robotUtility.stopArm().click()
    robotUtility.assert.armMotionAndPositionAre(
      spinePlanning.robotControls.opt.ArmMotionStatus.MOVEMENT_CANCELLED,
      spinePlanning.robotControls.opt.ArmCurrentPosition.IDLE
    )

    // Move arm again, check that status shows as moving, then check that arm has moved to expected position
    robotUtility.action.moveArm(armHome)
    robotUtility.assert.armMotionAndPositionAre(
      spinePlanning.robotControls.opt.ArmMotionStatus.MOVING_HOME,
      spinePlanning.robotControls.opt.ArmCurrentPosition.MOVING
    )
    robotUtility.assert.armMotionAndPositionAre(
      spinePlanning.robotControls.opt.ArmMotionStatus.MOVED_HOME,
      spinePlanning.robotControls.opt.ArmCurrentPosition.HOME
    )

    // Check pre-test status, run pre-test, and ensure status updates as test runs and completes
    robotUtility.assert.pretestStatusIs(
      robotUtility.opt.PreOpRoboticTest.MOUNT,
      robotUtility.opt.PreOpTestStatusState.failed
    )
    robotUtility.action.runPreTest(robotUtility.opt.PreOpRoboticTest.MOUNT)
    robotUtility.assert.pretestStatusIs(
      robotUtility.opt.PreOpRoboticTest.MOUNT,
      robotUtility.opt.PreOpTestStatusState.pending
    )
    robotUtility.assert.pretestStatusIs(
      robotUtility.opt.PreOpRoboticTest.MOUNT,
      robotUtility.opt.PreOpTestStatusState.completed
    )

    // Stop Robot Simulator and and assert the cart disconnects within the required time
    // record current time
    const cartCommunicationInterruptStart = Date.now()
    // stop the simulator
    robotUtility.action.robotSimulatorAction('stop')
    // assert cart status updates within the required time
    robotUtility.assert.cartStatusDisconnectCheck(
      cartCommunicationInterruptStart
    )

    robotUtility.doneButton().click()
  })
})
