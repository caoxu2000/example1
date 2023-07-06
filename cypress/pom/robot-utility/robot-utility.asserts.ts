import { object } from './robot-utility.objects'
import * as opt from './robot-utility.options'

export const assert = {
  /**
   * Asserts the string and color of the pre-test status matches with expected
   * @param {string} testName : name of test will be checked
   * @param {testState} preOpTestStatus: the expected test status
   */
  pretestStatusIs(testName: string, preOpTestStatus: opt.testState) {
    object.robotTestRow(testName).then(($test) => {
      object
        .preOpTestStatusInfo($test)
        .should('have.text', preOpTestStatus.testStatus)
        .and('have.css', 'background-color', preOpTestStatus.testColor)
    })
  },
  /**
   * Asserts the string and color of the cart connection status on Robot Utility task matches with expected
   * @param {opt.cartState} cartStatus: the expected state of the cart
   */
  cartStatusIs(cartStatus: opt.cartState) {
    cy.log('assert.cartStatusIs')
    object
      .robotCartStatus()
      .should('have.text', cartStatus.communicatingStatus)
      .and('have.css', 'color', cartStatus.communicatingColor)
  },
  /**
   * Asserts a cart disconnection is indicated on the robot utility cart status within the required time
   * @param {number} startTimeOfConnectionChange: the start time of the change in connection*
   */
  cartStatusDisconnectCheck(startTimeOfConnectionChange) {
    cy.log('assert.cartStatusDisconnectCheck')
    assert.cartStatusIs(opt.RobotCartStatusState.notCommunicating)
    const elapsedTime = Date.now() - startTimeOfConnectionChange
    cy.log(`Cart disconnect detected in ${elapsedTime} milliseconds`)
    expect(elapsedTime).to.be.lessThan(opt.maxDisconnectTime)
  },

  /**
   * Asserts the string of the arm motion status matches with expected
   * @param {string} armMotionStatus: the expected arm motion status
   */
  armMotionStatusIs(armMotionStatus: string) {
    object.armMotionStatus().should('have.text', armMotionStatus)
  },
  /**
   * Asserts the string of the arm current position status matches with expected
   * @param {string} armCurrentPosition: the expected arm current position status
   */
  armCurrentPositionIs(armCurrentPosition: string) {
    object.armCurrentPosition().should('have.text', armCurrentPosition)
  },
  /**
   * Asserts both the arm current position status and arm motion status strings match with expected
   * @param {string} armMotionStatus: the expected arm motion status
   * @param {string} armCurrentPosition: the expected arm current position status
   */
  armMotionAndPositionAre(armMotionStatus: string, armCurrentPosition: string) {
    assert.armMotionStatusIs(armMotionStatus)
    assert.armCurrentPositionIs(armCurrentPosition)
  },
  /**
   * Asserts the select position dropdown is disabled or not
   * @param {boolean} disabled: value of disabled attribute
   *                            if true, dropdown should be disabled
                                if false, dropdown should be enabled

   */
  dropdownIsDisabled(disabled: boolean) {
    if (disabled) {
      object.positionDropDown().should('have.attr', 'aria-disabled', 'true')
    } else {
      object.positionDropDown().should('not.have.attr', 'aria-disabled')
    }
  }
}
