import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'
import { interceptOverflowCall } from '@util/intercept-overflow-call'
import { checkOverflow, checkUserTextOverflow } from '@util/checkOverflow'

const userInputtedText =
  'Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search barTest input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar Test input for the search bar'
const horizontalOverflowText =
  'BiopsyButExtraLongBecauseItIsATestForTextOverflowOffTheScreenAndButtonsBiopsyButExtraLongBecauseItIsATestForTextOverflowOffTheScreenAndButtons'
const verticalOverflowText =
  'Biopsy But Extra Long Because It Is A Test For Text Overflow Off The Screen And Buttons Biopsy But Extra Long Because It Is A Test For Text Overflow Off The Screen And ButtonsBiopsy But Extra Long Because It Is A Test For Text Overflow Off The Screen And Buttons Overflow Response here blocks the next button which is a problem in usability for the application'

describe('Text Overflow Proof of Concept', () => {
  // bypass gui and reset potentially cached app
  beforeEach(() => {
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
  })

  /**
   * Example asserting that normal text works as expected
   */
  it('Click On Normal Text', () => {
    procedure.anatomy(procedure.opt.Anatomy.CRANIAL).click()
    procedure.surgeon().click()
    cy.findAllByTestId('ProcedureButton')
      .findByText(procedure.opt.availableProcedures.biopsy.name, {
        exact: true
      })
      .then((element) => {
        checkOverflow(element[0])
      })
  }),
    /**
     * Example asserting that overflowed text that should be visible - horizontally overflowing text likely won't cover anything if the parent has a
     * horizontal scroll bar
     */
    it('Click On Overflowed Text - horizontal overflow', () => {
      interceptOverflowCall(horizontalOverflowText)
      procedure.anatomy(procedure.opt.Anatomy.CRANIAL).click()
      procedure.surgeon().click()
      cy.findAllByTestId('ProcedureButton')
        .findByText(horizontalOverflowText, { exact: true })
        .then((element) => {
          checkOverflow(element[0])
        })
    }),
    /**
     * Example asserting that overflowed text that should not be visible - vertically overflowing text, this test should fail
     */
    it('Click On Overflowed Text - vertical overflow', () => {
      interceptOverflowCall(verticalOverflowText)
      procedure.anatomy(procedure.opt.Anatomy.CRANIAL).click()
      procedure.surgeon().click()
      cy.findAllByTestId('ProcedureButton')
        .findByText(verticalOverflowText, { exact: true })
        .then((element) => {
          checkOverflow(element[0])
        })
    }),
    /**
     * Example asserting that overflowing user-inputted text should have '...' to show that it is being truncated, this test should fail
     * Method clicks on search bar, enters text, clicks off of the search bar, then checks for the ellipsis
     */
    it('Check overflow behavior on user-inputted text', () => {
      procedure.action.select(procedure.opt.availableProcedures.biopsy)
      images.media.mediaTab().click()
      images.media.searchBar()
      // The .blur() here takes the focus off of the search bar, mimicking the user clicking out of the search bar
      images.media.searchBar().type(userInputtedText).blur()
      images.media.searchBar().then((element) => {
        checkUserTextOverflow(element[0])
      })
    })
})
