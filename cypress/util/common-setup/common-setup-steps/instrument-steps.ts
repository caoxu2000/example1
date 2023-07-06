import { instrument } from '@pom/instruments'
import { menu } from '@pom/shared/menu'
import { instrumentType } from '@global-config/instruments'

/**
 * Common setup step to remove all instruments from the procedure
 */
export function removeAllInstruments() {
  menu.action.clickInstruments()
  instrument.task.instrumentsInProcedure().then(($ipList) => {
    if ($ipList.children().length > 0) {
      cy.log('Removing instruments from procedure')
      instrument.task.action.clearInstrumentsFromProcedure()
    } else {
      cy.log('No instruments found in procedure. Continuing...')
    }
  })

  // assert no instruments are in the procedure
  instrument.task.assert.inProcedureListLength(0)
}

/**
 * Common setup step to add specified instruments to the procedure
 * @param {Array<instrumentType>} instrumentList : List of instruments to add to the procedure
 */
export function addInstruments(instrumentList: Array<instrumentType>) {
  menu.action.clickInstruments()
  instrument.task.showGroups().click()
  for (const tool of instrumentList) {
    cy.log(`Adding ${tool.name} to procedure`)
    instrument.task.action.addAnInstrumentToProcedure(tool)
  }
}
