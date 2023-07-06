import { instrumentType } from '@global-config/instruments'
import { object } from './task.objects'
import * as opt from './task.options'

export const assert = {
  /**
   * Asserts whether the tool card is in the Instruments in Procedure list or not
   * @param {instrumentType} tool : the tool to be checked
   * @param {boolean} status : If true - tool is in the list; if false - not in the list
   */
  isToolInProcedure(tool: instrumentType, status: boolean) {
    object
      .instrumentsInProcedure()
      // TODO: JUNO-15515: will remove the timeout once the app becomes more performant
      .findByText(tool.name, { exact: true, timeout: 8000 })
      .should(status ? 'exist' : 'not.exist')
  },

  /**
   * Asserts whether the tool card is in the right panel available instruments
   * @param {instrumentType} tool : the tool to be checked
   * @param {boolean} status : If true - tool is in the list; if false - not in the list
   */
  isToolInAvailable(tool: instrumentType, status: boolean) {
    object
      .rightPanel()
      .findByText(tool.name, { exact: true })
      .should(status ? 'exist' : 'not.exist')
  },
  /**
   * Asserts a tool's verification status
   * @param {instrumentType} tool : tool to assert verification status
   * @param {boolean} isVerified : The expected instrument verification status
   *                               If True - asserts the tool is verified
   *                               If False - asserts the tool is not verified
   */
  isToolVerified(tool: instrumentType, isVerified: boolean) {
    cy.log('Assert: tool is: ' + isVerified ? 'verified' : 'not verified')
    object.toolCardInProcedure(tool.name).then(($toolCard) => {
      object
        .toolCardStatusBar($toolCard)
        .should(
          'have.css',
          'border-bottom-color',
          isVerified
            ? opt.VerificationColors.TOOL_VERIFIED_GREEN
            : opt.VerificationColors.TOOL_UNVERIFIED_YELLOW
        )
    })
  },
  /**
   * Assert whether a tool with specified name is currently displayed in the available list in the right panel (not off the screen) or not
   * @param {instrumentType} tool : the tool to be checked
   * @param {boolean} status : If true - tool is displayed in the list; if false - not displayed in the list
   */
  toolIsDisplayedInAvailableList(tool: instrumentType, status: boolean) {
    cy.log(`Tool name: ${tool.name}`)
    object
      .rightPanel()
      .findByText(tool.name, { exact: true })
      .should(status ? 'be.visible' : 'not.be.visible')
  },
  /**
   * Asserts the in procedure list has a certain size
   * @param {number} numInstruments : the number of instruments that should be in the procedure list
   */
  inProcedureListLength(numInstruments: number) {
    object
      .instrumentsInProcedure()
      .children()
      .should('have.length', numInstruments)
  }
}
