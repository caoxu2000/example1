import { cyGui } from '@util/type/cyGui'
import { pom } from './type/robotic-utility'
import { translatedPhrase } from '@util/translated-phrase'

export const object = {
  /**
   * Returns the Robotic Cart Status
   * @return {cyGui<pom.robotUtility.robotCartStatus>}: HTML element of robot cart status
   */
  robotCartStatus(): cyGui<pom.robotUtility.robotCartStatus> {
    return cy.findByTestId('cart-status')
  },
  /**
   * Returns the position drop down button
   * @return {cyGui<pom.robotUtility.positionDropDown>}: HTML element of position drop down button
   */
  positionDropDown(): cyGui<pom.robotUtility.positionDropDown> {
    return cy.findByRole('button', {
      name: 'select-position-dropdown',
      exact: true
    })
  },
  /**
   * Returns the selection of Arm Predefined Position
   * @param {string} armPosition : Name of Arm Predefined Positions Name. Found in '@pom/spine-planning/robot-controls/robot-controls.options'
   * @return {cyGui<pom.robotUtility.positionSelector>}: Selections of Arm Predefined Position
   */
  positionSelector(
    armPosition: string
  ): cyGui<pom.robotUtility.positionSelector> {
    return cy.findByRole('option', { name: armPosition, exact: true })
  },
  /**
   * Selects the Move Arm Button
   * Note that this button is only available when the arm is stopped
   * @return {cyGui<pom.robotUtility.moveArm>}: HTML element of move arm button
   */
  moveArm(): cyGui<pom.robotUtility.moveArm> {
    return cy.findByRole('button', { name: 'Move Arm', exact: true })
  },
  /**
   * Selects the Stop Arm Button
   * Note that this button is only available when the arm is actively moving
   * @return {cyGui<pom.robotUtility.stopArm>}: HTML element of stop arm button
   */
  stopArm(): cyGui<pom.robotUtility.stopArm> {
    return cy.findByRole('button', { name: 'Stop Arm', exact: true })
  },
  /**
   * Returns arm movement progress - currently moving, completed movement, error in moving, etc
   * @return {cyGui<pom.robotUtility.armMotionStatus>}: HTML element of arm movement progress
   */
  armMotionStatus(): cyGui<pom.robotUtility.armMotionStatus> {
    return cy.findByTestId('status-indicator', { timeout: 5000 })
  },
  /**
   * Return the Current Position of the arm - moving, idle, preselected position, etc
   * @return {cyGui<pom.robotUtility.armCurrentPosition>}: HTML element of arm position
   */
  armCurrentPosition(): cyGui<pom.robotUtility.armCurrentPosition> {
    // TODO: Figure out exact how long it takes for the robot arm to move for pre-defined location JUNO-13311
    return cy.findByTestId('current-position', { timeout: 5000 })
  },
  /**
   * Returns the specified pre-operative test table row
   * @param {string} testName : Name of the Pre-Operative Robotic Test. Found in 'robotUtility.opt.PreOpRoboticTest'
   * @return {cyGui.<pom.robotUtility.robotTestRow>}: HTML element of desired robotic test row
   */
  robotTestRow(testName: string): cyGui<pom.robotUtility.robotTestRow> {
    return cy
      .findByText(testName, { exact: true })
      .parents('[data-testid="pre-op-test-row"]')
  },
  /**
   * Returns the button to run desired pre-operative test
   * @param {pom.robotUtility.robotTestRow} robotTestRow : wrap of desired robot Test Table Row
   * @return {cyGui<pom.robotUtility.runTest>} : HTML element of the run Robotic Test button
   */
  runTest(
    robotTestRow: pom.robotUtility.robotTestRow
  ): cyGui<pom.robotUtility.runTest> {
    return cy
      .wrap(robotTestRow)
      .findByRole('button', { name: 'RUN', exact: true })
  },
  /**
   * Returns the status of the specified pre-operative test
   * @param {pom.robotUtility.robotTestRow} robotTestRow : wrap of desired robot Test Table Row
   * @return {cyGui<pom.robotUtility.preOpTestStatusInfo>} : HTML element of status condition of desired robot test row
   */
  preOpTestStatusInfo(
    robotTestRow: pom.robotUtility.robotTestRow
  ): cyGui<pom.robotUtility.preOpTestStatusInfo> {
    return (
      cy
        .wrap(robotTestRow)
        // TODO: Figure out exact how long it take for the robot arm to move for individual test JUNO-13311
        .findByTestId('pre-op-test-status', { timeout: 5000 })
    )
  },
  /**
   * Returns the Done button to exit the Robot Utility task
   * @return {cyGui<pom.robotUtility.doneButton>} : HTML element for done button
   */
  doneButton(): cyGui<pom.robotUtility.doneButton> {
    return cy.findByText(translatedPhrase('SmartPrompt.done'), { exact: true })
  }
}
