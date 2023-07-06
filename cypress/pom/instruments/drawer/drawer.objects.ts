import { pom } from './type/drawer'
import { InstrumentDropdowns, SliderNames } from './drawer.options'
import { InstrumentsDropdownOptions } from '../task/task.options'
import { cyGui } from '@util/type/cyGui'
import { toTestIdFormat } from '@util/stringFormats'

export const object = {
  /**
   * Returns the Instruments drawer button
   * @return {cyGui<pom.instruments.drawer.drawerToggle>} : HTML element of the Instruments drawer button
   */
  instrumentsDrawer(): cyGui<pom.instruments.drawer.drawerToggle> {
    return cy.findByRole('button', { name: 'Instruments', exact: true })
  },

  /**
   * Returns the open Instruments drawer/right panel
   * @return {cyGui<pom.instruments.drawer.rightPanel>} : HTML element of the right panel
   */
  rightPanel(): cyGui<pom.instruments.drawer.rightPanel> {
    return cy.findByTestId('RightPanel', { exact: true })
  },

  /**
   * Returns the title of the Instruments drawer/right panel
   * @return {cyGui<pom.instruments.drawer.rightPanelTitle>} : HTML element of the right panel title
   */
  rightPanelTitle(): cyGui<pom.instruments.drawer.rightPanelTitle> {
    return object.rightPanel().findByText('Instruments', { exact: true })
  },

  /**
   * Returns the tool card of the specified tool
   * @param {string} toolName : Name of the tool to be selected
   * @return {cyGui<pom.instruments.drawer.toolCard>} : HTML element of the selected tool card
   */
  toolCard(toolName: string): cyGui<pom.instruments.drawer.toolCard> {
    return object
      .rightPanel()
      .findByText(toolName, { exact: true })
      .parents('[data-testid="tool-card-navigation"]')
  },

  /**
   * Returns the button to toggle the configuration menu of the specified tool card
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.gearIcon>} : HTML element of the configuration menu toggle button
   */
  gearIcon(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.gearIcon> {
    return cy.wrap(toolCard).findByTestId('gear-icon')
  },

  /**
   * Returns the PROJECTION menu button for the specified tool card
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.projectionButton>} : HTML element of the PROJECTION menu button for the selected tool card
   */
  projectionButton(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.projectionButton> {
    return cy
      .wrap(toolCard)
      .children()
      .findByText('PROJECTION', { exact: true })
  },

  /**
   * Returns the CYLINDER button for the specified tool card
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.cylinderButton>} : HTML element of the CYLINDER button for the selected tool card
   */
  cylinderButton(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.cylinderButton> {
    return cy
      .wrap(toolCard)
      .findByRole('tab', { name: 'CYLINDER', exact: true })
  },

  /**
   * Returns the WEDGE button for the specified tool card
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.wedgeButton>} : HTML element of the WEDGE button for the selected tool card
   */
  wedgeButton(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.wedgeButton> {
    return cy.wrap(toolCard).findByRole('tab', { name: 'WEDGE', exact: true })
  },

  /**
   * Returns the CATEGORY tab for the specified tool card
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.categoryTab>} : HTML element of the CATEGORY tab for the selected tool card
   */
  categoryTab(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.categoryTab> {
    return cy
      .wrap(toolCard)
      .findByRole('tab', { name: 'CATEGORY', exact: true })
  },

  /**
   * Returns the HISTORY tab for the specified tool card
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.historyTab>} : HTML element of the HISTORY tab for the selected tool card
   */
  historyTab(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.historyTab> {
    return cy.wrap(toolCard).findByRole('tab', { name: 'HISTORY', exact: true })
  },

  /**
   * Returns the specified slider container for the specified tool card
   * Note that the configuration menu must be open in order to access this element
   * TODO: JUNO-24986 - add testid for each slider in the specified tool card
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @param {SliderNames} sliderName : Name of the slider to select, options found within instruments.drawer.opt (opacity; width, length)
   * @param {number} containerIndex : index of the container
   * @return {cyGui<pom.instruments.drawer.sliderContainer>} : HTML element of the specified slider for the selected tool card
   */
  sliderContainer(
    toolCard: pom.instruments.drawer.toolCard,
    sliderName: SliderNames,
    containerIndex: number
  ): cyGui<pom.instruments.drawer.sliderContainer> {
    return cy
      .wrap(toolCard)
      .findByText(sliderName, { exact: true })
      .parents('[data-testid="tool-drawer"]')
      .find('.stack-slider')
      .eq(containerIndex)
  },

  /**
   * Returns the decrease (minus) button from within the specified slider container
   * Note that either the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.sliderContainer} sliderContainer : HTML element of the selected slider container
   * @return {cyGui<pom.instruments.drawer.decreaseValue>} : HTML element of the decrease (minus) button
   */
  decreaseValue(
    sliderContainer: pom.instruments.drawer.sliderContainer
  ): cyGui<pom.instruments.drawer.decreaseValue> {
    return cy
      .wrap(sliderContainer)
      .findByRole('button', { name: 'minus-button', exact: true })
  },

  /**
   * Returns the increase (plus) button from within the specified slider container
   * Note that either the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.sliderContainer} sliderContainer : HTML element of the selected slider container
   * @return {cyGui<pom.instruments.drawer.increaseValue>} : HTML element of the increase (plus) button
   */
  increaseValue(
    sliderContainer: pom.instruments.drawer.sliderContainer
  ): cyGui<pom.instruments.drawer.increaseValue> {
    return cy
      .wrap(sliderContainer)
      .findByRole('button', { name: 'plus-button', exact: true })
  },

  /**
   * Returns the slider from within the specified slider container
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.sliderContainer} sliderContainer : HTML element of the selected slider container
   * @return {cyGui<pom.instruments.drawer.slider>} : HTML element of the slider
   */
  slider(
    sliderContainer: pom.instruments.drawer.sliderContainer
  ): cyGui<pom.instruments.drawer.slider> {
    return cy.wrap(sliderContainer).findByRole('slider')
  },

  /**
   * Returns the current slider value from within the specified slider container
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.sliderContainer} sliderContainer : HTML element of the selected slider container
   * @return {cyGui<pom.instruments.drawer.slider>} : HTML element of the slider value
   */
  currentSliderValue(
    sliderContainer: pom.instruments.drawer.sliderContainer
  ): cyGui<pom.instruments.drawer.sliderValue> {
    return cy.wrap(sliderContainer).findByTestId('slider-current-value')
  },

  /**
   * Returns the orientation drop down menu container for the specified tool card
   * Note that the WEDGE menu within the PROJECTION menu must be open in order to access this element
   * TODO: JUNO-28633 - remove this function once test id has been updated to consolidate all the dropdowns into 1 dropdown function
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.dropdownContainer>}: HTML element of the orientation drop down menu container
   */
  orientationMenuContainer(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.dropdownContainer> {
    return cy.wrap(toolCard).findByTestId('wedge-orientation', { exact: true })
  },

  /**
   * Returns the desired dropdown, e.g. 'Category' from within the specified tool card
   * Note that configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the specified tool card
   * @param {InstrumentDropdowns} dropdownName: name of the dropdown
   * @return {cyGui<pom.instruments.drawer.parameterDropdown>} : HTML element of the specified dropdown
   */
  parameterDropdown(
    toolCard: pom.instruments.drawer.toolCard,
    dropdownName: InstrumentDropdowns
  ): cyGui<pom.instruments.drawer.parameterDropdown> {
    return cy.wrap(toolCard).findByRole('button', {
      name: toTestIdFormat(dropdownName) + '-dropdown',
      exact: true
    })
  },

  /**
   * Returns the specified parameter option, e.g. 'Awls and Probes' from opened dropdown menu, e.g. 'Category'
   * Note that the desired parameter dropdown within configuration menu must be open in order to access this element
   * @param {InstrumentsDropdownOptions} optionName : name of the option to select
   * @return {cyGui<pom.instruments.drawer.parameterOption>} : HTML element of the option
   */
  parameterOption(
    optionName: InstrumentsDropdownOptions
  ): cyGui<pom.instruments.drawer.parameterOption> {
    return cy.findByRole('option', { name: optionName, exact: true })
  },

  /**
   * Returns the current selected option, e.g. 'Awl and Sharp' for specified drop down, e.g. 'Tip'
   * Note that configuration menu must be open in order to access this element
   * @param {InstrumentDropdowns} dropdownName : name of the dropdown
   * @return {pom.instruments.drawer.currentDropdownValue} : HTML element of the current dropdown value
   */
  currentDropdownValue(
    dropdownName: InstrumentDropdowns
  ): cyGui<pom.instruments.drawer.currentDropdownValue> {
    return cy.findByTestId(toTestIdFormat(dropdownName + '-current-value'))
  },

  /**
   * Returns the hidden state icon of the selected tool in the views
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.hiddenIcon>} : HTML element of the hidden state icon of the selected tool in the views
   */
  hiddenIcon(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.hiddenIcon> {
    return cy.wrap(toolCard).findByTestId('hide-icon', { exact: true })
  },

  /**
   * Returns the visible state icon of the selected tool in the views
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.visibleIcon>} : HTML element of the visible state icon of the selected tool in the views
   */
  visibleIcon(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.visibleIcon> {
    return cy.wrap(toolCard).findByTestId('show-icon', { exact: true })
  },

  /**
   * Returns show/hide toggle button of the screw system in the selected tool card
   * Note that configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.visibilityToggle>} : HTML element of the show/hide toggle button of the screw system in the selected tool card
   */
  screwVisibilityIcon(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.visibilityToggle> {
    return (
      cy
        .wrap(toolCard)
        .findByTestId('instrument-screw-controls')
        // TODO: JUNO-24986 - add testid for the following
        .find('.screw-card-header')
        .findByRole('button')
    )
  },

  /**
   * Returns the 'Save Screw' button on the selected tool card
   * Note that configuration menu must be open in order to access this element
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.saveScrewButton>} : HTML element of the 'Save Screw' button
   */
  saveScrewButton(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.saveScrewButton> {
    return cy
      .wrap(toolCard)
      .findByTestId('instrument-screw-controls')
      .findByRole('button', { name: 'Save Screw', exact: true })
  },

  /**
   * Returns the radio button to select navigation at the instrument tip
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.navigateInstrument>} : HTML element of the navigate instrument radio button
   */
  navigateInstrument(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.navigateInstrument> {
    return cy
      .wrap(toolCard)
      .findByTestId('instrument-radio', { exact: true })
      .findByRole('radio')
  },

  /**
   * Returns the radio button to select navigation at the projection tip
   * @param {pom.instruments.drawer.toolCard} toolCard : HTML element of the selected tool card
   * @return {cyGui<pom.instruments.drawer.navigateProjection>} : HTML element of the navigate projection radio button
   */
  navigateProjection(
    toolCard: pom.instruments.drawer.toolCard
  ): cyGui<pom.instruments.drawer.navigateProjection> {
    return cy
      .wrap(toolCard)
      .findByTestId('projection-radio', { exact: true })
      .findByRole('radio')
  }
}
