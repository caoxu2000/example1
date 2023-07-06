import { object } from './plans-and-annotations.objects'
import {
  CategoryButtons,
  TextAnnotationButtons,
  StraightMeasurementButtons,
  AngleMeasurementButtons
} from './plans-and-annotations.options'
import { pom } from './type/plans-and-annotations'
import { PlanColorBar } from '@global-config/PlanColorBar'
import { alias } from '@util/type/cy-alias'

// TODO: JUNO-13621 - Complete actions file by adding all needed actions
export const action = {
  /**
   * Creates a new plan with the specified name
   * @param {string} planName : Name to give the newly created plan
   */
  createPlan(planName: string) {
    cy.waitForApi(alias.newPlan, () => {
      object.newPlan().click()
    })
    object
      .scrollableList()
      .findByTestId('plan-container')
      .last()
      .then(($selectedPlan) => {
        cy.wrap($selectedPlan)
          .findByTestId('plan-name')
          .clear()
          .type(planName, { delay: 200 })
      })
  },

  /**
   * Creates a new annotation of the specified type with the specified name
   * @param {CategoryButtons} annotationCategory : Category the desired annotation falls under
   * @param {TextAnnotationButtons | StraightMeasurementButtons | AngleMeasurementButtons} annotationType : Specific type of annotation to create
   * @param {string} annotationName: Name to give the newly created annotation
   */
  createAnnotation(
    annotationCategory: CategoryButtons,
    annotationType:
      | TextAnnotationButtons
      | StraightMeasurementButtons
      | AngleMeasurementButtons,
    annotationName: string
  ) {
    // define objects that can be used to open annotation menus
    const annotationCategories = {
      [CategoryButtons.TEXT]: object.addTextAnnotation,
      [CategoryButtons.STRAIGHT]: object.addStraightMeasurement,
      [CategoryButtons.ANGLE]: object.addAngleMeasurement
    }

    // define objects that can be used to create annotations
    const annotationOptions = {
      [CategoryButtons.TEXT]: object.addTextAnnotationOption,
      [CategoryButtons.STRAIGHT]: object.addStraightMeasurementOption,
      [CategoryButtons.ANGLE]: object.addAngleMeasurementOption
    }

    // create annotation
    cy.waitForApi(alias.newAnnotation, () => {
      annotationCategories[annotationCategory]().click()
      annotationOptions[annotationCategory](annotationType).click()
    })
    // TODO: JUNO-14870 - add ability to update the annotation's name once the functionality is back in the app
  },

  /**
   * Sets the target coordinates to the specified values
   * Note that the configuration menu must be open in order to use this action
   * @param {pom.plans.planAnnotationContainer} planContainer : HTML element of the selected plan
   * @param {Array<number>} target : Target coordinates
   */
  setTargetCoords(
    planContainer: pom.plans.planAnnotationContainer,
    target: Array<number>
  ) {
    // TODO: when the crosshair/F8 tool POM is created, use it to set the coordinates
    // set coordinates in the crosshair tool
    cy.wrap(planContainer).then(($selectedPlan) => {
      object.setTarget($selectedPlan).click()
    })
  },

  /**
   * Sets the entry coordinates to the specified values
   * Note that the configuration menu must be open in order to use this action
   * @param {pom.plans.planAnnotationContainer} planContainer : HTML element of the selected plan
   * @param {Array<number>} entry : Entry coordinates
   */
  setEntryCoords(
    planContainer: pom.plans.planAnnotationContainer,
    entry: Array<number>
  ) {
    // TODO: when the crosshair/F8 tool POM is created, use it to set the coordinates
    // set coordinates in the crosshair tool
    cy.wrap(planContainer).then(($selectedPlan) => {
      object.setEntry($selectedPlan).click()
    })
  },

  /**
   * Sets up a plan with the given name, target coordinates, entry coordinates, and color
   * @param {string} planName : Name to give the newly created plan
   * @param {Array<number>} target : Target coordinates
   * @param {Array<number>} entry : Entry coordinates
   * @param {string} color : Color to set the plan to
   */
  setupPlan(
    planName: string,
    target: Array<number>,
    entry: Array<number>,
    color: string
  ) {
    action.createPlan(planName)
    object.planContainer(planName).then(($selectedPlan) => {
      object.gearIcon($selectedPlan).click()
      action.setTargetCoords($selectedPlan, target)
      action.setEntryCoords($selectedPlan, entry)
      object.toggleOptions($selectedPlan).click()
      object.colorButton(PlanColorBar[color], $selectedPlan).click()
    })
  },

  /**
   * Delete all plans
   */
  deleteAllPlans() {
    object.options().click()
    object.deleteMultiple().click()
    object.deleteAll().click()
    object.deleteAllPopup().then(($popup) => {
      object.confirmDeleteAll($popup).click()
    })
  },

  /**
   * Adjusts the specified plan's slider value to update the crosshair location along the
   * plan trajectory
   * @param {number} newValue : Value to adjust the slider to
   * @param {pom.plans.planAnnotationContainer} planContainer : HTML element of the selected plan
   */
  adjustPlanSlider(
    newValue: number,
    planContainer: pom.plans.planAnnotationContainer
  ) {
    object
      .slider(planContainer)
      .invoke('val', `${newValue}`)
      .trigger('change', { force: true })
  },

  /**
   * Click the icon to show the selected plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  show(planAnnotationContainer: pom.plans.planAnnotationContainer) {
    object.hiddenIcon(planAnnotationContainer).click()
  },

  /**
   * Click the icon to hide the selected plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  hide(planAnnotationContainer: pom.plans.planAnnotationContainer) {
    object.visibleIcon(planAnnotationContainer).click()
  },

  /**
   * Click the icon to lock the selected plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  lock(planAnnotationContainer: pom.plans.planAnnotationContainer) {
    object.unlockedIcon(planAnnotationContainer).click()
  },

  /**
   * Click the icon to unlock the selected plan or annotation
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  unlock(planAnnotationContainer: pom.plans.planAnnotationContainer) {
    object.lockedIcon(planAnnotationContainer).click()
  }
  // TODO: JUNO-14119 was created to track the following TODO item
  // edit slider value
}
