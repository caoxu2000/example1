import { pom } from './type/plans-and-annotations'
import { cyGui } from '@util/type/cyGui'
import { translatedPhrase } from '@util/translated-phrase'

export const object = {
  /**
   * Returns the Plans drawer button
   * @return {cyGui<pom.plans.plansDrawerToggle>} : HTML element of the plans drawer button
   */
  plansDrawer(): cyGui<pom.plans.plansDrawerToggle> {
    return cy.findByRole('button', {
      name: translatedPhrase('SubTaskPanel.plans'),
      exact: true
    })
  },

  /**
   * Returns the Annotations drawer button
   * @return {cyGui<pom.plans.annotationsDrawerToggle>} : HTML element of the annotations drawer button
   */
  annotationsDrawer(): cyGui<pom.plans.annotationsDrawerToggle> {
    return cy.findByRole('button', {
      name: translatedPhrase('SubTaskPanel.annotations'),
      exact: true
    })
  },

  /**
   * Returns the button to create a new plan
   * @return {cyGui<pom.plans.addPlan>} : HTML element of the create new plan
   */
  newPlan(): cyGui<pom.plans.addPlan> {
    return cy.findByTitle('plus').parent()
    // TODO: revert to original (commented) version once the button has been added back (as well as the test id)
    // return cy.findByRole('button', { name: 'add-new', exact: true })
  },

  /**
   * Returns the button to add a text annotation (opens the text annotation options menu)
   * @return {cyGui<pom.plans.addTextAnnotation>} : HTML element of the add text annotation button
   */
  addTextAnnotation(): cyGui<pom.plans.addTextAnnotation> {
    return cy.findByRole('button', { name: 'add-text-annotation', exact: true })
  },

  /**
   * Returns the button to add a straight measurement (opens the straight measurement options menu)
   * @return {cyGui<pom.plans.addStraightMeasurement>} : HTML element of the add straight measurement button
   */
  addStraightMeasurement(): cyGui<pom.plans.addStraightMeasurement> {
    return cy.findByRole('button', {
      name: 'add-straight-measurement',
      exact: true
    })
  },

  /**
   * Returns the button to add an angle measurement (opens the angle measurement options menu)
   * @return {cyGui<pom.plans.addAngleMeasurement>} : HTML element of the add angle measurement button
   */
  addAngleMeasurement(): cyGui<pom.plans.addAngleMeasurement> {
    return cy.findByRole('button', {
      name: 'add-angle-measurement',
      exact: true
    })
  },

  /**
   * Returns the specified text annotation button
   * Note that the add text annotation button must be clicked before this element can be accessed
   * @param {string} textAnnotationName : Name of the desired text annotation button
   * @return {cyGui<pom.plans.textAnnotationOption>} : HTML element of the desired text annotation button
   */
  addTextAnnotationOption(
    textAnnotationName: string
  ): cyGui<pom.plans.textAnnotationOption> {
    return cy.findByRole('menuitem', { name: textAnnotationName, exact: true })
  },

  /**
   * Returns the specified straight measurement button
   * Note that the add add straight measurement button must be clicked before this element can be accessed
   * @param {string} straightMeasurementName : Name of the desired straight measurement button
   * @return {cyGui<pom.plans.straightMeasurementOption>} : HTML element of the desired straight measurement button
   */
  addStraightMeasurementOption(
    straightMeasurementName: string
  ): cyGui<pom.plans.straightMeasurementOption> {
    return cy.findByRole('menuitem', {
      name: straightMeasurementName,
      exact: true
    })
  },

  /**
   * Returns the specified angle measurement button
   * Note that the add angle measurement button must be clicked before this element can be accessed
   * @param {string} angleMeasurementName : Name of the desired angle measurement button
   * @return {cyGui<pom.plans.angleMeasurementOption>} : HTML element of the desired angle measurement button
   */
  addAngleMeasurementOption(
    angleMeasurementName: string
  ): cyGui<pom.plans.angleMeasurementOption> {
    return cy.findByRole('menuitem', {
      name: angleMeasurementName,
      exact: true
    })
  },

  /**
   * Returns the Undo button to undo the last action
   * @return {cyGui<pom.plans.undo>} : HTML element of the Undo button
   */
  undo(): cyGui<pom.plans.undo> {
    return cy.findByRole('button', { name: 'undo-icon', exact: true })
  },

  /**
   * Returns the Options/three dots button
   * @return {cyGui<pom.plans.options>} : HTML element of the Options button
   */
  options(): cyGui<pom.plans.options> {
    return cy.findByRole('button', { name: 'options-icon', exact: true })
  },

  /**
   * Returns the Delete Multiple button from the Options dropdown (opens the Delete multiple plans menu)
   * Note that the Options button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.deleteMultiple>} : HTML element of the Delete Multiple button
   */
  deleteMultiple(): cyGui<pom.plans.deleteMultiple> {
    return cy.findByRole('menuitem', { name: 'DELETE MULTIPLE', exact: true })
  },

  /**
   * Returns the Delete All button to delete all plans or annotations from the Delete multiple plans menu
   * Note that the Delete Multiple button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.deleteAll>} : HTMl element of the Delete All button
   */
  deleteAll(): cyGui<pom.plans.deleteAll> {
    return cy.findByRole('button', { name: 'Delete All', exact: true })
  },

  /**
   * Returns the Done button to close the Delete multiple plans menu
   * Note that the Delete Multiple button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.done>} : HTML element of the Done button
   */
  done(): cyGui<pom.plans.done> {
    return cy.findByRole('button', { name: 'Done', exact: true })
  },

  /**
   * Returns the popup that appears after Delete All is clicked
   * Note that the Delete All button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.deleteAllPopup>} : HTML element of the Delete All popup
   */
  deleteAllPopup(): cyGui<pom.plans.deleteAllPopup> {
    return cy.findByTestId('delete-popup')
  },

  /**
   * Returns the Delete All button to confirm deletion that appears after clicking Delete All
   * Note that the Delete All button must be clicked before this element can be accessed
   * @param {pom.plans.deleteAllPopup} deleteAllPopup : HTML element of the Delete All popup
   * @return {cyGui<pom.plans.confirmDelete>} : HTML element of the Confirm button
   */
  confirmDeleteAll(
    deleteAllPopup: pom.plans.deleteAllPopup
  ): cyGui<pom.plans.confirmDelete> {
    return cy
      .wrap(deleteAllPopup)
      .findByRole('button', { name: 'Delete All', exact: true })
  },

  /**
   * Returns the Cancel button that appears after clicking Delete All
   * Note that the Delete All button must be clicked before this element can be accessed
   * @param {pom.plans.deleteAllPopup} deleteAllPopup : HTML element of the Delete All popup
   * @return {cyGui<pom.plans.cancelDelete>} : HTML element of the Cancel button
   */
  cancelDeleteAll(
    deleteAllPopup: pom.plans.deleteAllPopup
  ): cyGui<pom.plans.cancelDelete> {
    return cy
      .wrap(deleteAllPopup)
      .findByRole('button', { name: 'Cancel', exact: true })
  },

  /**
   * Returns the Hide All button to hide all plans or annotations
   * Note that the Options button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.hideAll>} : HTML element of the Hide All button
   */
  hideAll(): cyGui<pom.plans.hideAll> {
    return cy.findByRole('menuitem', { name: 'HIDE ALL', exact: true })
  },

  /**
   * Returns the Show All button to show all plans or annotations
   * Note that the Options button must be clicked before this element can be accessed
   * @return {cyGui<pom.plans.showAll>} : HTML element of the Show All button
   */
  showAll(): cyGui<pom.plans.showAll> {
    return cy.findByRole('menuitem', { name: 'SHOW ALL', exact: true })
  },

  /**
   * Returns the Plan button to collapse or expand the plan shown in the Annotations drawer
   * @return {cyGui<pom.plans.btnPlan>} : HTML element of the Plan button in the Annotations drawer
   */
  planBtn(): cyGui<pom.plans.btnPlan> {
    return cy.findByRole('button', {
      name: translatedPhrase(
        'Tasks.Planning.SubTasks.Annotations.AnnotationsList.Plan'
      ),
      exact: true
    })
  },

  /**
   * Returns the plan container with the specified name
   * @param {string} name : Name of the plan to be selected
   * @return {cyGui<pom.plans.planAnnotationContainer>} : HTML element of the selected plan
   */
  planContainer(name: string): cyGui<pom.plans.planAnnotationContainer> {
    return object.name(name).parents('[data-testid="plans-card"]')
  },

  /**
   * Returns the annotation container with the specified name
   * @param {string} name : Name of the annotation to be selected
   * @return {cyGui<pom.plans.planAnnotationContainer>} : HTML element of the selected annotation
   */
  annotationContainer(name: string): cyGui<pom.plans.planAnnotationContainer> {
    return object.name(name).parents('[data-testid="annotations-card"]')
  },

  /**
   * Returns the annotation container with the specified index
   * @param {number} index : Index of the annotation to be selected
   * @return {cyGui<pom.plans.planAnnotationContainer>} : HTML element of the selected annotation
   */
  annotationContainerByIndex(
    index: number
  ): cyGui<pom.plans.planAnnotationContainer> {
    return cy.findAllByTestId('annotation-container').eq(index)
  },

  /**
   * Returns all annotation containers
   * @return {cyGui<pom.plans.annotationContainerList>} : HTML elements of all annotations
   */
  annotationContainerList(): cyGui<pom.plans.annotationContainerList> {
    return cy.findByTestId('annotation-list').children()
  },

  /**
   * Returns all plan containers
   * @return {cyGui<pom.plans.planContainerList>} : HTML elements of all plans
   */
  planContainerList(): cyGui<pom.plans.planContainerList> {
    return cy.findByTestId('scrollable-list').children()
  },

  /**
   * Returns the textbox containing the specified plan or annotation name
   * @param {string} name : Name of the plan or annotation to select
   * @return {cyGui<pom.plans.name>} : HTML element of the plan or annotation name textbox
   */
  name(name: string): cyGui<pom.plans.name> {
    const planAttr = `[value="${name}"]`
    return cy.get(planAttr)
  },

  /**
   * Returns the specified plan's or annotation's unlocked state icon
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.unlockedIcon>} : HTML element of the unlocked state icon of the plan or annotation
   */
  unlockedIcon(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.unlockedIcon> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('unlock-icon', { exact: true })
  },

  /**
   * Returns the specified plan's or annotation's locked state icon
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.lockedIcon>} : HTML element of the locked state icon of the plan or annotation
   */
  lockedIcon(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.lockedIcon> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('lock-icon', { exact: true })
  },

  /**
   * Returns the visible state icon of the specified plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.visibleIcon>} : HTML element of the visible state icon of the plan or annotation
   */
  visibleIcon(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.visibleIcon> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('show-icon', { exact: true })
  },

  /**
   * Returns the hidden state icon of the specified plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.hiddenIcon>} : HTML element of the hidden state icon of the plan or annotation button
   */
  hiddenIcon(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.hiddenIcon> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('hide-icon', { exact: true })
  },

  /**
   * Returns the button to toggle the configuration menu of the specified plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.gearIcon>} : HTML element of the gear button
   */
  gearIcon(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.gearIcon> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('gear-icon', { exact: true })
  },

  /**
   * Returns the Set Target button to set the target coordinate
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.btnTarget>} : HTML element of the Set Target button
   */
  setTarget(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.btnTarget> {
    return cy
      .wrap(planAnnotationContainer)
      .findAllByRole('button')
      .contains(
        translatedPhrase(
          'Tasks.Planning.SubTasks.Plans.PlanDrawerCards.PlanCard.SetTarget'
        )
      )
  },

  /**
   * Returns the Set Entry button to set the entry coordinate
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.btnEntry>} : HTML element of the Set Entry button
   */
  setEntry(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.btnEntry> {
    return cy
      .wrap(planAnnotationContainer)
      .findAllByRole('button')
      .contains(
        translatedPhrase(
          'Tasks.Planning.SubTasks.Plans.PlanDrawerCards.PlanCard.SetEntry'
        )
      )
  },

  /**
   * Returns the slider info box, which contains the specified plan's length and
   * trajectory controls
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.sliderInfoBoxEntry>} : HTML element of the slider control box
   */
  sliderInfoBox(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.sliderInfoBox> {
    return cy.wrap(planAnnotationContainer).findByTestId('slider-info')
  },

  /**
   * Returns the current distance of the crosshairs to the target point of the
   * specified plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.distToTarget>} : Distance to target (value and units)
   */
  distanceToTarget(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.distToTarget> {
    return object
      .sliderInfoBox(planAnnotationContainer)
      .findByTestId('distance-to-target')
  },

  /**
   * Returns the current distance of the crosshairs off
   * of the specified plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.distOffPlan>} : Distance off of the current plan trajectory (value and units)
   */
  distanceOffPlan(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.distOffPlan> {
    return object
      .sliderInfoBox(planAnnotationContainer)
      .findByTestId('distance-off-plan')
  },

  /**
   * Returns the slider container, which houses the slider to move through the specified plan's trajectory
   * and the length of the specified plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.sliderContainer>} : HTML element of the slider
   */
  sliderContainer(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.sliderContainer> {
    return cy.wrap(planAnnotationContainer).findByTestId('slider-container')
  },

  /**
   * Returns the slider to move through the specified plan's trajectory
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.planSlider>} : HTML element of the slider
   */
  slider(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.planSlider> {
    return object.sliderContainer(planAnnotationContainer).findByRole('slider')
  },

  /**
   * Returns the length of the specified plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.planLength>} : HTML element of the plan length
   */
  planLength(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.planLength> {
    return object
      .sliderContainer(planAnnotationContainer)
      .findByTestId('plan-length')
  },

  /**
   * Returns the specified plan's plan control box, which houses the to target, to entry,
   * play, rewind, and fast forward buttons
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.planControlBox>} : HTML element of the plan control box
   */
  planControlBox(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.planControlBox> {
    return cy.wrap(planAnnotationContainer).findByTestId('plan-controls')
  },

  /**
   * Returns the To Entry button of the specified plan control box's plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planControlBox} planControlBox : HTML element of the plan control box
   * @return {cyGui<pom.plans.toEntry>} : HTML element of the To Entry button
   */
  toEntry(planControlBox: pom.plans.planControlBox): cyGui<pom.plans.toEntry> {
    return cy
      .wrap(planControlBox)
      .findByRole('button', { name: 'previous', exact: true })
  },

  /**
   * Returns the To Target button of the specified plan control box's plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planControlBox} planControlBox : HTML element of the plan control box
   * @return {cyGui<pom.plans.toTarget>} : HTML element of the To Target button
   */
  toTarget(
    planControlBox: pom.plans.planControlBox
  ): cyGui<pom.plans.toTarget> {
    return cy
      .wrap(planControlBox)
      .findByRole('button', { name: 'next', exact: true })
  },

  /**
   * Returns the play button of the specified plan control box's plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planControlBox} planControlBox : HTML element of the plan control box
   * @return {cyGui<pom.plans.play>} : HTML element of the play button
   */
  play(planControlBox: pom.plans.planControlBox): cyGui<pom.plans.play> {
    return cy
      .wrap(planControlBox)
      .findByRole('button', { name: 'play', exact: true })
  },

  /**
   * Returns the fast forward button of the specified plan control box's plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planControlBox} planControlBox : HTML element of the plan control box
   * @return {cyGui<pom.plans.fastforward>} : HTML element of the fast forward button
   */
  fastforward(
    planControlBox: pom.plans.planControlBox
  ): cyGui<pom.plans.fastforward> {
    return cy
      .wrap(planControlBox)
      .findByRole('button', { name: 'forward', exact: true })
  },

  /**
   * Returns the rewind button of the specified plan control box's plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planControlBox} planControlBox : HTML element of the plan control box
   * @return {cyGui<pom.plans.rewind>} : HTML element of the rewind button
   */
  rewind(planControlBox: pom.plans.planControlBox): cyGui<pom.plans.rewind> {
    return cy
      .wrap(planControlBox)
      .findByRole('button', { name: 'backward', exact: true })
  },

  /**
   * Returns the toggle to toggle the additional options for the specified plan
   * Note that this element is only available for plans
   * Note that the configuration menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.toggleOptions>} : HTML element of the toggle
   */
  toggleOptions(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.toggleOptions> {
    return cy
      .wrap(planAnnotationContainer)
      .findByRole('button', { name: 'show-more', exact: true })
  },

  /**
   * Returns the color bar to change the color or the specified plan or annotation
   * Note that the more options menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.colorBar>} : HTML element of the color bar
   */
  colorBar(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.colorBar> {
    return cy.wrap(planAnnotationContainer).findByTestId('color-bar')
  },

  /**
   * Returns the desired color's button for the specified plan or annotation
   * Note that the more options menu must be open in order to access this element
   * @param {string} color : Desired color
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.colorButton>} : HTML element of the specified color button
   */
  colorButton(
    color,
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ) {
    return object
      .colorBar(planAnnotationContainer)
      .findAllByRole('button')
      .eq(color.position)
  },

  /**
   * Returns the Virtual Craniotomy toggle for the specified plan
   * Note that this element is only available for plans
   * Note that the more options menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.craniotomy>} : HTML element of the Virtual Craniotomy toggle
   */
  virtualCraniotomy(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.craniotomy> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('virtual-craniotomy-toggle')
      .findByRole('checkbox')
  },

  /**
   * Returns the Safety Margin toggle for the specified plan
   * Note that this element is only available for plans
   * Note that the options menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan
   * @return {cyGui<pom.plans.safetyMargin>} : HTML element of the Safety Margin toggle
   */
  safetyMargin(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.safetyMargin> {
    return cy
      .wrap(planAnnotationContainer)
      .findByTestId('safety-margin-toggle')
      .findByRole('checkbox')
  },

  /**
   * Returns the Delete button for the specified plan or annotation
   * Note that the more options menu must be open in order to access this element
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.deletePlan>} : HTML element of the Delete plan or annotation button
   */
  deletePlanAnnotation(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.deletePlan> {
    return cy.wrap(planAnnotationContainer).findByText('DELETE').parent()
  },

  /**
   * Returns the color circle for the specified plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @return {cyGui<pom.plans.currentColorCircle>} : HTML element of the color circle
   */
  currentColorCircle(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ): cyGui<pom.plans.currentColorCircle> {
    return cy.wrap(planAnnotationContainer).findByTestId('plan-color')
  },

  /**
   * Returns scrollable list of the plan or annotation
   * @return {cyGui<pom.plans.scrollableList>} : HTML element of the scrollable list
   */
  scrollableList(): cyGui<pom.plans.scrollableList> {
    return cy.findByTestId('scrollable-list', { exact: true })
  }

  // TODO: JUNO-14119 was created to track the following TODO items
  // offset/mirror plan
  // plan name (under more)
  // color wheel
  // virtual craniotomy width slider
  // safety margin diamater slider
  // cone of reachability
  // display all tracks
  // rotate tracks 45 degrees
  // AC-PC coordinates
  // target presets
  // frame coordinates
  // set end point button for spine
}
