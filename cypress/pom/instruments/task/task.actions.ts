import { object } from './task.objects'
import { alias } from '@util/type/cy-alias'
import { instrumentType } from '@global-config/instruments'
import { InstrumentCategories } from './task.options'

// TODO: JUNO-13622 - Complete actions file by adding all needed actions, including adding and removing single instruments to the procedure
export const action = {
  /**
   * Removes all instruments from the procedure
   */
  clearInstrumentsFromProcedure() {
    object
      .instrumentsInProcedure()
      .findAllByTestId('tool-card-added')
      .each(($toolCard) => {
        cy.waitForApi(alias.removeTool, () => {
          object.trashIcon($toolCard).click()
        })
      })
  },
  /**
   * Add an instrument to the procedure
   * @param {instrumentType} instrument : the instrument to be selected (inside function uses instrument.name)
   */
  addAnInstrumentToProcedure(instrument: instrumentType) {
    object.toolCardInInstrumentsList(instrument.name).then(($toolCard) => {
      cy.waitForApi(alias.addTool, () => {
        object.addToProcedure($toolCard).click()
      })
    })
    cy.wait(4000)
  },
  /**
   * Remove an instrument from the procdure
   * @param {instrumentType} instrument : the instrument to be selected (inside function uses instrument.name)
   */
  removeAnInstrumentFromProcedure(instrument: instrumentType) {
    object.toolCardInProcedure(instrument.name).then(($toolCard) => {
      cy.waitForApi(alias.removeTool, () => {
        object.trashIcon($toolCard).click()
      })
    })
  },
  /**
   * open the specified instrument group
   * @param {InstrumentCategories} category : instrument categories
   */
  clickInstrumentCategory(category: InstrumentCategories) {
    object.groupDropdown(category).click()
  }
}
