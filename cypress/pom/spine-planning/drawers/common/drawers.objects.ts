// TODO: See JUNO-13155: Some of these objects worked for EB1639 but test ids were removed when tested in EB1664. Add these back in and check when the spine planning task is updated
import { pom } from './type/drawers'
import { cyGui } from '@util/type/cyGui'

export const object = {
  /**
   * Returns the button to create a new interbody, trajectory, or facet decortication
   * @return {cyGui<pom.spinePlanning.drawers.addNew>} : HTML element of the create new interbody, trajectory, or facet decortication button
   */
  addNew(): cyGui<pom.spinePlanning.drawers.addNew> {
    return cy.findByRole('button', { name: 'add-new', exact: true })
  },

  /**
   * Returns the undo button to Undo the last action
   * @return {cyGui<pom.spinePlanning.drawers.undo>} : HTML element of the Undo button
   */
  undo(): cyGui<pom.spinePlanning.drawers.undo> {
    return cy.findByRole('button', { name: 'UNDO', exact: true })
  },

  /**
   * Returns the Delete All button to delete all screws, interbodies, trajectories, or facet decortications
   * @return {cyGui<pom.spinePlanning.drawers.deleteAll>} : HTML element of the Delete All button
   */
  deleteAll(): cyGui<pom.spinePlanning.drawers.deleteAll> {
    return cy.findByRole('button', { name: 'DELETE ALL', exact: true })
  },

  /**
   * Returns the Confirm button that pops up after clicking Delete All
   * Note that the Delete All button must be clicked before this element can be accessed
   * @return {cyGui<pom.spinePlanning.drawers.confirmDeleteAll>} : HTML element of the Confirm delete all button
   */
  confirmDeleteAll(): cyGui<pom.spinePlanning.drawers.confirmDeleteAll> {
    return cy.findByRole('button', { name: 'CONFIRM', exact: true })
  },

  /**
   * Returns the Cancel button that pops up after clicking Delete All
   * Note that the Delete All button must be clicked before this element can be accessed
   * @return {cyGui<pom.spinePlanning.drawers.cancelDeleteAll>} : HTML element of the Cancel delete all button
   */
  cancelDeleteAll(): cyGui<pom.spinePlanning.drawers.cancelDeleteAll> {
    return cy.findByRole('button', { name: 'CANCEL', exact: true })
  },

  /**
   * Returns the Hide All button to hide all screws, interbodies, trajectories, or facet decortications
   * @return {cyGui<pom.spinePlanning.drawers.hideAll>} : HTML element of the Hide All button
   */
  hideAll(): cyGui<pom.spinePlanning.drawers.hideAll> {
    return cy.findByRole('button', { name: 'HIDE ALL', exact: true })
  },

  /**
   * Returns the Show All button to hide all screws, interbodies, trajectories, or facet decortications
   * @return {cyGui<pom.spinePlanning.drawers.showAll>} : HTML element of the Show All button
   */
  showAll(): cyGui<pom.spinePlanning.drawers.showAll> {
    return cy.findByRole('button', { name: 'SHOW ALL', exact: true })
  },

  /**
   * Returns the textbox containing the specified screw, interbody, trajectory, or facet decortication
   * @param {string} name : Name of the plan to be selected
   * @return {cyGui<pom.spinePlanning.drawers.plannedItemName>} : HTML element of the textbox for the specified plan name
   */
  plannedItemName(
    name: string
  ): cyGui<pom.spinePlanning.drawers.plannedItemName> {
    return cy.findByDisplayValue(name)
  },

  /**
   * Returns the container for the specified screw, interbody, trajectory, or facet decortication
   * @param {string} name : Name of the plan to be selected
   * @return {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} : HTML element of the specified plan container
   */
  plannedItemContainer(
    name: string
  ): cyGui<pom.spinePlanning.drawers.plannedItemContainer> {
    return object
      .plannedItemName(name)
      .parentsUntil('[data-testid=scrollable-list]')
      .last()
  },

  /**
   * Returns the list of screws, interbodies, trajectories, or facet decortications (depending on which drawer is open)
   * @return {cyGui<pom.spinePlanning.drawers.plannedItemList>} : HTML element of the list of screws, interbodies, trajectories, or facet decortications
   */
  plannedItemList(): cyGui<pom.spinePlanning.drawers.plannedItemList> {
    return cy.findByTestId('scrollable-list', { exact: true }).children()
  },

  /**
   * Returns the locked state icon of the specified screw, interbody, trajectory or facet decortication
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.lockedIcon>} : HTML element of the locked state icon
   */
  lockedIcon(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.lockedIcon> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('lock-icon', { exact: true })
  },

  /**
   * Returns the unlocked state icon of the specified screw, interbody, trajectory or facet decortication
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.unlockedIcon>} : HTML element of the unlocked state icon
   */
  unlockedIcon(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.unlockedIcon> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('unlock-icon', { exact: true })
  },

  /**
   * Returns the visible state icon of the specified screw, interbody, trajectory or facet decortication
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.visibleIcon>} : HTML element of the visible state icon
   */
  visibleIcon(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.visibleIcon> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('show-icon', { exact: true })
  },

  /**
   * Returns the hidden state icon of the specified screw, interbody, trajectory or facet decortication
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.hiddenIcon>} : HTML element of the hidden state icon
   */
  hiddenIcon(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.hiddenIcon> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('hide-icon', { exact: true })
  },

  /**
   * Returns the button to toggle the configuration menu of the specified screw, interbody, trajectory or facet decortication
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.gearIcon>} : HTML element of the configuration menu toggle button
   */
  gearIcon(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.gearIcon> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('gear-icon', { exact: true })
  },

  /**
   * Returns the Family dropdown for the specified screw
   * Note that the Screws configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.family>} : HTML element of the Family dropdown
   */
  family(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.family> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('family-dropdown', { exact: true })
  },

  /**
   * Returns the Type dropdown for the specified screw
   * Note that the Screws configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.screwType>} : HTML element of the Type dropdown
   */
  screwType(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.screwType> {
    return (
      cy
        .wrap(plannedItemContainer)
        .findByText('Type', { exact: true })
        // TODO: JUNO-13114: Add test-id back for screw 'type'
        .parent('[class=labeled-cont-label]')
        .siblings('[class=labeled-cont-parent]')
        .findAllByRole('button')
        .first()
    )
  },

  /**
   * Returns the button to select the specified type from the dropdown
   * Note that the Screws configuration menu must be open, and the type dropdown selected in order to access this element
   * @param {string} screwType: the desired screwType to select from the dropdown
   * @return {cyGui<pom.spinePlanning.drawers.selectType>} : HTML element of the  button to select the specified type from the dropdown
   */
  selectType(screwType: string): cyGui<pom.spinePlanning.drawers.selectType> {
    return cy.findByRole('option', { name: screwType, exact: true })
  },

  /**
   * Returns the current value of the screw Type
   * Note that the Screws configuration menu must be open, and the type dropdown selected in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.typeValue>} : HTML element of the  current screw Type value
   */
  typeValue(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.typeValue> {
    return object.screwType(plannedItemContainer)
  },

  /**
   * Returns the Partially Threaded toggle button for the specified screw
   * Note that the Screws configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.partiallyThreaded>} : HTML element of the Partially Threaded toggle button
   */
  partiallyThreaded(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.partiallyThreaded> {
    return cy
      .wrap(plannedItemContainer)
      .findByRole('checkbox', { name: 'Partially threaded', exact: true })
  },

  /**
   * Returns the specified slider container which contains:
   *    - Length and Width in the Screws, Interbodies, and Tracjectories drawers
   *    - Diameter and Depth in the Facet Decortications drawer
   * Note that the configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the selected plan container
   * @param {string} sliderName : Name of the slider to select, options are found in drawers index file
   * @return {cyGui<pom.spinePlanning.drawers.sliderContainer>} : HTML element of the specified slider container
   */
  sliderContainer(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer,
    sliderName: string
  ): cyGui<pom.spinePlanning.drawers.sliderContainer> {
    return cy
      .wrap(plannedItemContainer)
      .findByText(sliderName, { exact: true })
      .parents('[data-testid="labeled-slider"]')
      .first()
  },

  /**
   * Returns the slider within the specified slider container
   * Note that the configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.sliderContainer>} sliderContainer: HTML element of the specified slider container
   * @return {cyGui<pom.spinePlanning.drawers.slider>} : HTML element of the specified slider
   */
  slider(
    sliderContainer: pom.spinePlanning.drawers.sliderContainer
  ): cyGui<pom.spinePlanning.drawers.slider> {
    return cy
      .wrap(sliderContainer)
      .find(
        '[class="MuiSlider-thumb MuiSlider-thumbColorPrimary MuiSlider-thumbSizeMedium css-sqex69"]'
      )
  },

  /**
   * Returns the value of the slider within the specified container
   * Note that the configuration menu must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.sliderContainer>} sliderContainer: HTML element of the specified slider container
   * @return {cyGui<pom.spinePlanning.drawers.sliderValue>} : HTML element of the slider value within the specified container
   */
  sliderValue(
    sliderContainer: pom.spinePlanning.drawers.sliderContainer
  ): cyGui<pom.spinePlanning.drawers.sliderValue> {
    return cy
      .wrap(sliderContainer)
      .findByTestId('current-value', { exact: true })
  },

  /**
   * Returns the screw control box for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.screwControls>} : HTML element of the screw controls box for the specified screw
   */
  screwControls(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.screwControls> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('screw-controls', { exact: true })
  },

  /**
   * Returns the Entry previous arrow button for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.screwControls>} screwControls: HTML element of the specified screw controls box
   * @return {cyGui<pom.spinePlanning.drawers.entry>} : HTML element of the Entry previous arrow button for the specified screw
   */
  entry(
    screwControls: pom.spinePlanning.drawers.screwControls
  ): cyGui<pom.spinePlanning.drawers.entry> {
    return cy
      .wrap(screwControls)
      .findByRole('button', { name: 'previous', exact: true })
  },

  /**
   * Returns the Target forward arrow button for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.screwControls>} screwControls: HTML element of the specified screw controls box
   * @return {cyGui<pom.spinePlanning.drawers.target>} : HTML element of the Target forward arrow button for the specified screw
   */
  target(
    screwControls: pom.spinePlanning.drawers.screwControls
  ): cyGui<pom.spinePlanning.drawers.target> {
    return cy
      .wrap(screwControls)
      .findByRole('button', { name: 'next', exact: true })
  },

  /**
   * Returns the Rewind double backward arrow button for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.screwControls>} screwControls: HTML element of the specified screw controls box
   * @return {cyGui<pom.spinePlanning.drawers.rewind>} : HTML element of the Rewind button for the specified screw
   */
  rewind(
    screwControls: pom.spinePlanning.drawers.screwControls
  ): cyGui<pom.spinePlanning.drawers.rewind> {
    return cy
      .wrap(screwControls)
      .findByRole('button', { name: 'backward', exact: true })
  },

  /**
   * Returns the Play button for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.screwControls>} screwControls: HTML element of the specified screw controls box
   * @return {cyGui<pom.spinePlanning.drawers.play>} : HTML element of the Play button for the specified screw
   */
  play(
    screwControls: pom.spinePlanning.drawers.screwControls
  ): cyGui<pom.spinePlanning.drawers.play> {
    return cy
      .wrap(screwControls)
      .findByRole('button', { name: 'play', exact: true })
  },

  /**
   * Returns the Fast Forward double arrow button for the specified screw
   * Note that the configuration menu in the Screws drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.screwControls>} screwControls: HTML element of the specified screw controls box
   * @return {cyGui<pom.spinePlanning.drawers.fastforward>} : HTML element of the Fast Forward button for the specified screw
   */
  fastforward(
    screwControls: pom.spinePlanning.drawers.screwControls
  ): cyGui<pom.spinePlanning.drawers.fastforward> {
    return cy
      .wrap(screwControls)
      .findByRole('button', { name: 'forward', exact: true })
  },

  /**
   * Returns the More button for the specified plan container
   * Note that the configuration menu in the desired drawer (screw, interbody, trajectory, facet decortication) must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.more>} : HTML element of the More button for the specified plan container
   */
  more(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.more> {
    return cy.wrap(plannedItemContainer).findByText('MORE', { exact: true })
  },

  /**
   * Returns the Less button for the specified plan container
   * Note that the configuration menu in the desired drawer (screw, interbody, trajectory, facet decortication) must be open in order to access this element
   * The Less button can be selected after the More button has been selected
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.less>} : HTML element of the Less button for the specified plan container
   */
  less(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.less> {
    return cy.wrap(plannedItemContainer).findByText('LESS', { exact: true })
  },

  /**
   * Returns the Name input text box for the specified plan container
   * Note that the More button within the configuration menu in the desired drawer (screw, interbody, trajectory, facet decortication)
   * must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.nameInput>} : HTML element of the Name input text box for the specified plan container
   */
  nameInput(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.nameInput> {
    return (
      cy
        .wrap(plannedItemContainer)
        .findAllByRole('textbox')
        // TODO: JUNO-13114: Add test-id for this element
        .parent('[class=labeled-cont-parent]')
    )
  },

  /**
   * Returns the color bar to change the color of the specified screw, interbody, trajectory, or facet decortication
   * Note that the More button within the configuration menu in the desired drawer (screw, interbody, trajectory, facet decortication)
   * must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.colorBar>} : HTML element of the color bar
   */
  colorBar(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.colorBar> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('color-bar', { exact: true })
  },

  /**
   * Returns the desired color's button for the specified screw, interbody, trajectory, or facet decortication
   * Note that the More button within the configuration menu in the desired drawer (screw, interbody, trajectory, facet decortication)
   * must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @param {string} color: Desired color as specified in the drawers index file: color options for spine planning are in positions 0-4
   * @return {cyGui<pom.spinePlanning.drawers.colorButton>} : HTML element of the desired color's button
   */
  colorButton(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer,
    color
  ): cyGui<pom.spinePlanning.drawers.colorButton> {
    return object
      .colorBar(plannedItemContainer)
      .findAllByRole('button')
      .eq(color.position)
  },

  /**
   * Returns the Delete button for the specified screw, interbody, trajectory, or facet decortication
   * Note that the More button within the configuration menu in the desired drawer
   * (screw, interbody, trajectory, facet decortication) must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.deletePlannedItem>} : HTML element of the Delete button
   */
  deletePlannedItem(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.deletePlannedItem> {
    return cy
      .wrap(plannedItemContainer)
      .findByRole('button', { name: 'DELETE', exact: true })
  },

  /**
   * Returns the System dropdown for the specified interbody
   * Note that the configuration menu in the Interbody drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.system>} : HTML element of the System dropdown for the specified interbody
   */
  system(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.system> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('system-dropdown', { exact: true })
  },

  /**
   * Returns the button to select the specified system from the dropdown
   * Note that the Interbodies configuration menu must be open, and the system dropdown selected in order to access this element
   * @param {string} interbodySystem: the desired interbody system to select from the dropdown
   * @return {cyGui<pom.spinePlanning.drawers.selectSystem>} : HTML element of the  button to select the specified system from the dropdown
   */
  selectSystem(
    interbodySystem: string
  ): cyGui<pom.spinePlanning.drawers.selectSystem> {
    return cy.findByRole('option', { name: interbodySystem, exact: true })
  },

  /**
   * Returns the Approach dropdown for the specified interbody
   * Note that the configuration menu in the Interbody drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.approach>} : HTML element of the Approach dropdown for the specified interbody
   */
  approach(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.approach> {
    return cy
      .wrap(plannedItemContainer)
      .findByTestId('approach-dropdown', { exact: true })
  },

  /**
   * Returns the Flip Implant toggle button for the specified interbody
   * Note that the configuration menu in the Interbody drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.flipImplant>} : HTML element of the Flip Implant toggle button for the specified interbody
   */
  flipImplant(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.flipImplant> {
    return cy
      .wrap(plannedItemContainer)
      .findByRole('checkbox', { name: 'Flip Implant', exact: true })
  },

  /**
   * Returns the Tool Projection toggle button for the specified interbody
   * Note that the configuration menu in the Interbody drawer must be open in order to access this element
   * @param {cyGui<pom.spinePlanning.drawers.plannedItemContainer>} plannedItemContainer : HTML element of the specified plan container
   * @return {cyGui<pom.spinePlanning.drawers.toolProjection>} : HTML element of the Tool Projection toggle button for the specified interbody
   */
  toolProjection(
    plannedItemContainer: pom.spinePlanning.drawers.plannedItemContainer
  ): cyGui<pom.spinePlanning.drawers.toolProjection> {
    return cy
      .wrap(plannedItemContainer)
      .findByRole('checkbox', { name: 'Tool Projection', exact: true })
  },

  /**
   * Returns the button for the desired segment
   * @param {string} segment: the desired segment to select, as specified in the spine planning index file
   * @return {cyGui<pom.spinePlanning.drawers.segmentButton>} : HTML element of the button for the desired segment
   */
  segmentButton(
    segment: string
  ): cyGui<pom.spinePlanning.drawers.segmentButton> {
    return cy
      .findByTestId('segment-container', { exact: true })
      .findByRole('button', { name: segment, exact: true })
  },

  /**
   * Returns the collapse right panel button
   * Note that this button is only available if the right panel is currently expanded
   * @return {cyGui<pom.spinePlanning.drawers.collapseRightPanel>} : HTML element of the collapse right panel button
   */
  collapseRightPanel(): cyGui<pom.spinePlanning.drawers.collapseRightPanel> {
    return cy.findByRole('button', {
      name: 'Collapse right panel',
      exact: true
    })
  },

  /**
   * Returns the expand right panel button
   * Note that this button is only available if the right panel is currently collapsed
   * @return {cyGui<pom.spinePlanning.drawers.expandRightPanel>} : HTML element of the expand right panel button
   */
  expandRightPanel(): cyGui<pom.spinePlanning.drawers.expandRightPanel> {
    return cy.findByRole('button', { name: 'Expand right panel', exact: true })
  }
}
