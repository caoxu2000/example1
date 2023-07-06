import { cyGui } from '@util/type/cyGui'
import { exam } from '@fixtures/type/exam'
import { pom } from './type/drawer'
import { translatedPhrase } from '@util/translated-phrase'

const language = Cypress.env('allLanguages')

// TODO: JUNO-24986 remove this once the test id for the layout preview image is been added
export const layoutOptionsInPresetCssClass = {
  layoutOne: '.layouts-parent.one',
  layoutTwo: '.layouts-parent.two',
  layoutThree: '.layouts-parent.three',
  layoutFour: '.layouts-parent.four',
  layoutSix: '.layouts-parent.six',
  layoutNine: '.layouts-parent.nine'
}

const layoutOptionsInPresetTestId = {
  layoutOne: 'layout-one',
  layoutTwo: 'layout-two',
  layoutThreeRight: 'layout-three-right',
  layoutThreeLeft: 'layout-three-left',
  layoutThreeBottom: 'layout-three-bottom',
  layoutThree: 'layout-three',
  layoutFour: 'layout-four',
  layoutFourRight: 'layout-four-right',
  layoutSix: 'layout-six',
  layoutNine: 'layout-nine'
}

export const object = {
  /**
   * Returns the 2D Views drawer button
   * @return {cyGui<pom.views.drawer.drawerToggle2dViews>} : HTML Element of the 2D views drawer button
   */
  drawerToggle2dViews(): cyGui<pom.views.drawer.drawerToggle2dViews> {
    return cy.findByRole('button', {
      name: language[Cypress.env('language')]['SubTaskPanel.twodviews']
        .defaultMessage,
      exact: true
    })
  },

  /**
   * Returns the 3D Views drawer button
   * @return {cyGui<pom.views.drawer.drawerToggle3dViews>} : HTML Element of the 3D views drawer button
   */
  drawerToggle3dViews(): cyGui<pom.views.drawer.drawerToggle3dViews> {
    return cy.findByRole('button', {
      name: language[Cypress.env('language')]['SubTaskPanel.threedviews']
        .defaultMessage,
      exact: true
    })
  },

  /**
   * Returns the Layouts drawer button
   * @return {cyGui<pom.views.drawer.layoutsDrawer>} : HTML element of the layouts drawer button
   */
  layoutsDrawer(): cyGui<pom.views.drawer.layoutsDrawer> {
    return cy.findByRole('button', {
      name: translatedPhrase('SubTaskPanel.layouts'),
      exact: true
    })
  },

  /**
   * Returns the element containing the specified preset name
   * @param {string} name : Name of the preset
   * @return {cyGui<pom.views.drawer.presetName>} : HTML element of the preset name
   */
  presetName(name: string): cyGui<pom.views.drawer.presetName> {
    return cy.findAllByTestId('layout-name').contains(name)
  },

  /**
   * Returns the input textbox containing the specified preset name
   * @param {string} name : Name of the preset
   * @return {cyGui<pom.views.drawer.presetName>} : HTML element of the preset name input textbox
   */
  innerNameTextbox(name: string): cyGui<pom.views.drawer.presetName> {
    const presetAttr = `[value="${name}"]`
    return cy.get(presetAttr)
  },

  /**
   * Returns the preset container with the specified name
   * @param {string} name : Name of the preset
   * @return {cyGui<pom.views.drawer.presetContainer>} : HTML element of the preset container
   */
  presetContainer(name: string): cyGui<pom.views.drawer.presetContainer> {
    return object.presetName(name).parents('[data-testid=layout-card]')
  },

  /**
   * Returns the preset container with the specified index
   * @param {number} index : Index of the preset container to be selected
   * @return {cyGui<pom.views.drawer.presetContainer>} : HTML element of the selected preset container
   */
  presetContainerByIndex(
    index: number
  ): cyGui<pom.views.drawer.presetContainer> {
    return cy
      .findByTestId('RightPanel')
      .findAllByTestId('layout-card')
      .eq(index)
  },

  /**
   * Returns the preset options container for the specified preset
   * @param {string} name : Name of the preset
   * @return {cyGui<pom.views.drawer.presetOptionsContainer>} : HTML element of the preset options container
   */
  presetOptionsContainer(
    name: string
  ): cyGui<pom.views.drawer.presetOptionsContainer> {
    return object
      .innerNameTextbox(name)
      .parents('[data-testid=layout-options-drawer]')
  },

  /**
   * Returns the preset option container with the specified index
   * @param {number} index : Index of the preset option container to be selected
   * @return {cyGui<pom.views.drawer.presetOptionsContainer>} : HTML element of the selected preset option container
   */
  presetOptionsContainerByIndex(
    index: number
  ): cyGui<pom.views.drawer.presetOptionsContainer> {
    return cy
      .findByTestId('RightPanel')
      .findAllByTestId('layout-options-drawer')
      .eq(index)
  },

  /**
   * Returns the layout preview image of the specified preset
   * @param {pom.views.drawer.presetContainer} presetContainer : HTML element of the selected preset container
   * @param {string} layoutName : name of the layout that should be previewed
   * @return {cyGui<pom.views.drawer.layoutPreviewImage>} : HTML element of the layout preview image
   */
  layoutPreviewImage(
    presetContainer: pom.views.drawer.presetContainer,
    layoutName: string
  ): cyGui<pom.views.drawer.layoutPreviewImage> {
    return (
      cy
        .wrap(presetContainer)
        // TODO: JUNO-24986 replace the following with findByTestId once test id for the layout preview image is been added
        .find(layoutOptionsInPresetCssClass[layoutName])
    )
  },

  /**
   * Return the layout button from the preset option in the right panel
   * @param {pom.views.drawer.presetOptionsContainer} presetOptionsContainer : HTML element of the selected preset options container
   * @param {string} layoutName: Name of the layout to select
   * @return {cyGui<pom.views.drawer.layoutOption>} : HTML element of the layout option in the preset option
   */
  layoutOption(
    presetOptionsContainer: pom.views.drawer.presetOptionsContainer,
    layoutName: string
  ): cyGui<pom.views.drawer.layoutOption> {
    return cy
      .wrap(presetOptionsContainer)
      .findByTestId(layoutOptionsInPresetTestId[layoutName])
  },

  /**
   * Return the Save Layout Changes button in selected preset option
   * @param {pom.views.drawer.presetOptionsContainer} presetOptionsContainer : HTML element of the selected preset option container
   * @return {cyGui<pom.views.drawer.saveLayoutButton>} : HTML element of the Save Layout Button in selected preset option
   */
  saveLayoutButton(
    presetOptionsContainer: pom.views.drawer.presetOptionsContainer
  ): cyGui<pom.views.drawer.saveLayoutButton> {
    return cy
      .wrap(presetOptionsContainer)
      .findByRole('button', { name: 'Save layout changes', exact: true })
  },

  /**
   * Return the Delete layout button in selected preset option
   * @param {pom.views.drawer.presetOptionsContainer} presetOptionsContainer : HTML element of the selected preset option
   * @return {cyGui<pom.views.drawer.deleteLayoutButton>} : HTML element of the Delete layout button
   */
  deleteLayoutButton(
    presetOptionsContainer: pom.views.drawer.presetOptionsContainer
  ): cyGui<pom.views.drawer.deleteLayoutButton> {
    return cy
      .wrap(presetOptionsContainer)
      .findByRole('button', { name: 'Delete', exact: true })
  },

  /**
   * Returns the compare mode toggle button
   * @return {cyGui<pom.views.drawer.compareMode>} : HTML Element of the compare mode toggle button
   */
  compareMode(): cyGui<pom.views.drawer.compareMode> {
    return cy.findByRole('checkbox', { name: 'Compare Mode', exact: true })
  },

  /**
   * Returns the auto blend toggle button
   * @return {cyGui<pom.views.drawer.autoBlend>} : HTML Element of the auto blend toggle button
   */
  autoBlend(): cyGui<pom.views.drawer.autoBlend> {
    return cy.findByRole('checkbox', { name: '2D Auto Blend', exact: true })
  },

  /**
   * Returns hidden state icon of the specified exam card (clicking it will uncross eye and enable visibility)
   * Note that if the hidden state icon is not avaiable (visible icon is present) this button is not clickable
   * @param {cyGui<pom.views.drawer.examCard>} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.views.drawer.hiddenIcon>} : HTML Element of the hidden state icon of the specified exam card (clicking will uncross eye)
   */
  hiddenIcon(
    examCard: pom.views.drawer.examCard
  ): cyGui<pom.views.drawer.hiddenIcon> {
    return cy.wrap(examCard).findByRole('button', { name: 'Hide', exact: true })
  },

  /**
   * Returns the visible state icon of the specified exam card (clicking it will cross out eye and disable visibility)
   * Note that if the visible state icon is not avaiable (hidden icon is present) this button is not clickable
   * @param {cyGui<pom.views.drawer.examCard>} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.views.drawer.visibleIcon>} : HTML Element of the visible state icon of the specified exam card(clicking will cross out eye)
   */
  visibleIcon(
    examCard: pom.views.drawer.examCard
  ): cyGui<pom.views.drawer.visibleIcon> {
    return cy.wrap(examCard).findByRole('button', { name: 'Show', exact: true })
  },

  /**
   * Returns the views exam card with the provided exam name
   * @param {exam} examSeries : Series of the patient exam to be selected
   * @return {cyGui<pom.views.drawer.examCard>} : HTML Element of the selected exam card
   */
  examCard(examSeries: exam): cyGui<pom.views.drawer.examCard> {
    return cy.contains(examSeries.name).parents('[data-testid="exam-card"]')
  },

  /**
   * Returns the adjust button for selected exam card
   * @param {cyGui<pom.views.drawer.examCard>} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.views.drawer.adjustLevelWidth>} : HTML element of the views adjust level/width button
   */
  adjustLevelWidth(
    examCard: pom.views.drawer.examCard
  ): cyGui<pom.views.drawer.adjustLevelWidth> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'level-width-control-button', exact: true })
  },

  /**
   * Returns the specified (level or width) slider container
   * Note that the adjust level/width button must be selected in order to access this element
   * @param {cyGui<pom.views.drawer.examCard>} examCard : HTML element of the selected exam card
   * @param {string} sliderName : Name of the slider to select, options are found in views manipulation index file
   * @return {cyGui<pom.views.drawer.sliderContainer>} : HTML element of the selected views manipulation slider container (level or width)
   */
  sliderContainer(
    examCard: pom.views.drawer.examCard,
    sliderName: string
  ): cyGui<pom.views.drawer.sliderContainer> {
    return cy
      .wrap(examCard)
      .findByText(sliderName, { exact: true })
      .parentsUntil('[data-testid="level-width-drawer"]')
      .last()
      .findByTestId('slider-container')
  },

  /**
   * Returns the views manipulation slider from within the specified slider container (level or width)
   * Note that the adjust level/width button must be selected in order to access this element
   * @param {pom.views.drawer.sliderContainer} sliderContainer : HTML element of the selected views manipulation slider container (level or width)
   * @return {cyGui<pom.views.drawer.slider>} : HTML element of the views manipulaton slider (level or width)
   */
  slider(
    sliderContainer: pom.views.drawer.sliderContainer
  ): cyGui<pom.views.drawer.slider> {
    return cy.wrap(sliderContainer).find('[class="MuiSlider-thumb"]')
  },

  /**
   * Returns the current slider value from within the specified slider container
   * @param {pom.views.drawer.sliderContainer} sliderContainer : HTML element of the selected views manipulation slider container (level or width)
   * @return {cyGui<pom.views.drawer.sliderValue>} : HTML element of the slider (level or width) value
   */
  sliderValue(
    sliderContainer: pom.views.drawer.sliderContainer
  ): cyGui<pom.views.drawer.sliderValue> {
    return cy
      .wrap(sliderContainer)
      .findByTestId('current-value', { exact: true })
  },

  /**
   * Returns the gear control button for selected exam card
   * @param {cyGui<pom.views.drawer.examCard>} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.views.drawer.gearControl>} : HTML element of the views manipulation gear control button
   */
  gearControl(
    examCard: pom.views.drawer.examCard
  ): cyGui<pom.views.drawer.gearControl> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'gear-control-button', exact: true })
  },

  /**
   * Returns the colormap dropdown for the exam card
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.colormap>} : HTML element of the Colormap dropdown
   */
  colormap(): cyGui<pom.views.drawer.colormap> {
    return cy
      .findByText('Colormap', { exact: true })
      .parents('[data-testid="combo-box-button"]')
  },

  /**
   * Returns the specified option from the colormap dropdown
   * Note that the gear control button must be selected in order to access this element
   * @param {string} colormapName : Name of the colormap to select, options are found in views manipulation index file
   * @return {cyGui<pom.views.drawer.selectColormap>} : HTML element of the selected colormap from the list
   */
  selectColormap(colormapName: string): cyGui<pom.views.drawer.selectColormap> {
    return cy.findByRole('button', { name: colormapName, exact: true })
  },

  /**
   * Returns the colormap value
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.colormapValue>} : HTML element of the current colormap value
   */
  colormapValue(): cyGui<pom.views.drawer.colormapValue> {
    return object.colormap().findByTestId('combo-box-value', { exact: true })
  },

  /**
   * Returns the add model plus button
   * @return {cyGui<pom.views.drawer.addModel>} : HTML Element of the add model plus button
   */
  addModel(): cyGui<pom.views.drawer.addModel> {
    return cy.findByRole('button', { name: 'Add', exact: true })
  },

  /**
   * Returns the "TAP HERE TO BUILD A MODEL" button
   * @return {cyGui<pom.views.drawer.buildModel>} : HTML Element of the "TAP HERE TO BUILD A MODEL" button
   */
  buildModel(): cyGui<pom.views.drawer.buildModel> {
    return cy.findByRole('button', {
      name: 'TAP HERE TO BUILD A MODEL',
      exact: true
    })
  },

  /**
   * Returns the display dropdown for the exam card
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.display>} : HTML Element of the display dropdown
   */
  display(): cyGui<pom.views.drawer.display> {
    return cy
      .findByText('Display', { exact: true })
      .parents('[data-testid="combo-box-button"]')
  },

  /**
   * Returns the specified option from the display dropdown
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @param {string} displayName : Name of the display to select, options are found in views manipulation index file
   * @return {cyGui<pom.views.drawer.selectDisplay>} : HTML Element of the specified option from the display dropdown
   */
  selectDisplay(displayName: string): cyGui<pom.views.drawer.selectDisplay> {
    return cy.findByRole('button', { name: displayName, exact: true })
  },

  /**
   * Returns the current display value
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.displayValue>} : HTML Element of the current display value
   */
  displayValue(): cyGui<pom.views.drawer.displayValue> {
    return object.display().findByTestId('combo-box-value', { exact: true })
  },

  /**
   * Returns the Cut Mode toggle button
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.cutMode>} : HTML Element of the cut mode toggle button
   */
  cutMode(): cyGui<pom.views.drawer.cutMode> {
    return cy.findByTestId('cut-mode').findByRole('checkbox')
  },

  /**
   * Returns the Freeze toggle button
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.freeze>} : HTML Element of the freeze toggle button
   */
  freeze(): cyGui<pom.views.drawer.freeze> {
    return cy.findByTestId('freeze').findByRole('checkbox')
  },

  /**
   * Returns the cut type dropdown for the exam card
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.cutType>} : HTML Element of the cut type dropdown
   */
  cutType(): cyGui<pom.views.drawer.cutType> {
    return cy
      .findByText('Cut type', { exact: true })
      .parents('[data-testid="combo-box-button"]')
  },

  /**
   * Returns the specified option from the cut type dropdown
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @param {string} cutTypeName : Name of the cut type to select, options are found in views manipulation index file
   * @return {cyGui<pom.views.drawer.selectCutType>} : HTML Element of specified option form the cut type dropdown
   */
  selectCutType(cutTypeName: string): cyGui<pom.views.drawer.selectCutType> {
    return cy.findByRole('button', { name: cutTypeName, exact: true })
  },

  /**
   * Returns the current value of the cut type
   * Note that the gear control button in 3D Views must be selected in order to access this element
   * @return {cyGui<pom.views.drawer.cutTypeValue>} : HTML Element of the current value of the cut type
   */
  cutTypeValue(): cyGui<pom.views.drawer.cutTypeValue> {
    return object.cutType().findByTestId('combo-box-value', { exact: true })
  }
}
