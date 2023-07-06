import { pom } from './type/task'
import { InstrumentCategories } from './task.options'
import { cyGui } from '@util/type/cyGui'
import { translatedPhrase } from '@util/translated-phrase'
import { toTestIdFormat } from '@util/stringFormats'

export const object = {
  /**
   * Returns the Instruments in Procedure container
   * @return {cyGui<pom.instruments.task.inProcedure>} : HTML element of the Instruments in Procedure container
   */
  instrumentsInProcedure(): cyGui<pom.instruments.task.inProcedure> {
    return cy.findByTestId('instruments-ip-list')
  },

  /**
   * Returns the tool card of the specified tool in the Instruments in Procedure list
   * @param {string} toolName : Name of the tool to be selected
   * @return {cyGui<pom.instruments.task.toolInProcedure>} : HTML element of the selected tool card
   */
  toolCardInProcedure(
    toolName: string
  ): cyGui<pom.instruments.task.toolInProcedure> {
    return object
      .instrumentsInProcedure()
      .findByText(toolName, { exact: true })
      .parents('[data-testid="tool-card-added"]')
  },

  /**
   * Returns the button to toggle the configuration menu for the specified tool card
   * @param {pom.instruments.task.toolInProcedure} toolInProcedure : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.task.gear>} : HTML element of the gear button
   */
  gearIcon(
    toolInProcedure: pom.instruments.task.toolInProcedure
  ): cyGui<pom.instruments.task.gear> {
    return cy
      .wrap(toolInProcedure)
      .findByRole('button', { name: 'gear-control-button', exact: true })
  },

  /**
   * Returns the button to remove the specified tool card from the procedure
   * @param {pom.instruments.task.toolInProcedure} toolInProcedure : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.task.trash>} : HTML element of the trash icon
   */
  trashIcon(
    toolInProcedure: pom.instruments.task.toolInProcedure
  ): cyGui<pom.instruments.task.trash> {
    return cy
      .wrap(toolInProcedure)
      .findByRole('button', { name: 'delete-card', exact: true })
  },

  /**
   * Returns the verification status bar of the specified tool card
   * @param {pom.instruments.task.toolInProcedure} toolInProcedure : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.task.statusBar>} : HTML element of the selected tool card's status bar
   */
  toolCardStatusBar(
    toolInProcedure: pom.instruments.task.toolInProcedure
  ): cyGui<pom.instruments.task.statusBar> {
    return cy.wrap(toolInProcedure).findByTestId('tool-card-status-bar')
  },

  /**
   * Returns the right panel, which contains the search bar, Show Groups toggle, and list of available instruments
   * @return {cyGui<pom.instruments.task.rightPanel>} : HTML element of the right panel
   */
  rightPanel(): cyGui<pom.instruments.task.rightPanel> {
    return cy.findByTestId('RightPanel')
  },

  /**
   * Returns the title of the right panel
   * @return {cyGui<pom.instruments.task.rightPanelTitle>} : HTML element of the right panel title
   */
  rightPanelTitle(): cyGui<pom.instruments.task.rightPanelTitle> {
    return cy.findByTestId('right-panel-text')
  },

  /**
   * Returns the search bar to search for instruments to add to the procedure
   * @return {cyGui<pom.instruments.task.searchBar>} : HTML element of the search bar
   */
  searchBar(): cyGui<pom.instruments.task.searchBar> {
    return cy.findByRole('textbox')
  },

  /**
   * Returns the icon to clear the search bar
   * @return {cyGui<pom.instruments.task.clearSearch>} : HTML element of the clear search bar icon
   */
  clearSearchIcon(): cyGui<pom.instruments.task.clearSearch> {
    return cy.findByTestId('clear-input', { exact: true })
  },

  /**
   * Returns the Show Groups toggle to change how the available instruments are organized
   * @return {cyGui<pom.instruments.task.showGroups>} : HTML element of the Show Groups toggle
   */
  showGroups(): cyGui<pom.instruments.task.showGroups> {
    return cy.findByRole('button', { name: 'Show Groups', exact: true })
  },

  /**
   * Returns the instrument group dropdown of the specified group in the right panel/available instruments list
   * @param {InstrumentCategories} category: instrument category to be selected
   * @return {cyGui<pom.instruments.task.groupDropdown>} : HTML element of the selected group dropdown
   */
  groupDropdown(
    category: InstrumentCategories
  ): cyGui<pom.instruments.task.groupDropdown> {
    return object.rightPanel().findByRole('button', {
      name: 'toggle-category-' + toTestIdFormat(category),
      exact: true
    })
  },

  /**
   * Returns the tool card of the specified tool in the right panel/available instruments list
   * @param {string} toolName : Name of the tool to be selected
   * @return {cyGui<pom.instruments.task.toolInList>} : HTML element of the selected tool card
   */
  toolCardInInstrumentsList(
    toolName: string
  ): cyGui<pom.instruments.task.toolInList> {
    return object
      .rightPanel()
      .findByText(toolName)
      .parents('[data-testid="tool-card-available"]')
  },

  /**
   * Returns the button to add an instrument to the Instruments in Procedure list
   * @param {pom.instruments.task.toolInList} toolInList : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.task.add>} : HTML element of the add to procedure button
   */
  addToProcedure(
    toolInList: pom.instruments.task.toolInList
  ): cyGui<pom.instruments.task.add> {
    return cy
      .wrap(toolInList)
      .findByRole('button', { name: 'add-to-procedure', exact: true })
  },

  /**
   * Returns the Done button to close the Instruments Task and return to the previous task
   * @return {cyGui<pom.instruments.task.done>} : HTML element of the done button
   */
  done(): cyGui<pom.instruments.task.done> {
    return cy.findByText(translatedPhrase('SmartPrompt.done'), { exact: true })
  },

  /**
   * Returns the scrollable list of available instruments
   * @return {cyGui<pom.instruments.task.instrumentsList>} : HTML element of the scrollable list of available instruments
   */
  instrumentsList(): cyGui<pom.instruments.task.instrumentsList> {
    // TODO: JUNO-24986 - add testid = instruments-list
    return cy.findByTestId('scrollable-list')
  }
}
