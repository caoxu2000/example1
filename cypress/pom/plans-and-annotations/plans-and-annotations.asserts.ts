import { object } from './plans-and-annotations.objects'
import { pom } from './type/plans-and-annotations'
// TODO: JUNO-8621: Update String Asserts to Use Custom Child Commands
// replace asserts with custom child commands that will be called directly in the specs

export const assert = {
  /**
   * Asserts the number of plans in the DOM is as expected
   * @param {number} numPlans : Number of expected plans
   */
  numberOfPlans(numPlans: number) {
    cy.findByTestId('plan-container', { exact: true })
      .children()
      .should('have.length', numPlans)
  },

  /**
   * Asserts the distance to target is as expected
   * @param {number} specifiedDistance : Expected distance to target
   * @param {string} targetDistance : Distance to target pulled from the DOM
   */
  distanceToTargetValue(specifiedDistance: number, targetDistance: string) {
    const dist = specifiedDistance.toString() + ' mm'
    cy.wrap(targetDistance).should('eq', `${dist}`)
  },

  /**
   * Asserts the distance off plan is as expected
   * @param {number} specifiedValue : Expected distance off plan
   * @param {string} targetValue : Distance off plan pulled from the DOM
   */
  distanceOffPlanValue(specifiedValue: number, targetValue: string) {
    const dist = specifiedValue.toString() + ' mm'
    cy.wrap(targetValue).should('eq', `${dist}`)
  },

  /**
   * Asserts the plan length is as expected
   * @param {number} expectedValue : Expected plan length
   * @param {string} sliderValue : Plan length pulled from the DOM
   */
  planLengthValue(expectedValue: number, sliderValue: string) {
    const expectedVal = expectedValue.toString() + ' mm'
    cy.wrap(sliderValue).should('eq', expectedVal)
  },

  /**
   * Asserts that the selected plan or annotation is unlocked
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  containerIsUnlocked(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ) {
    object
      .unlockedIcon(planAnnotationContainer)
      .should('exist')
      .and('be.visible')
    object.lockedIcon(planAnnotationContainer).should('not.exist')
  },

  /**
   * Asserts that the selected plan or annotation is locked
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   */
  containerIsLocked(
    planAnnotationContainer: pom.plans.planAnnotationContainer
  ) {
    object.lockedIcon(planAnnotationContainer).should('exist').and('be.visible')
    object.unlockedIcon(planAnnotationContainer).should('not.exist')
  },

  /**
   * Asserts that the color of the selected plan or annotation is as expected
   * @param {pom.plans.planAnnotationContainer} planAnnotationContainer : HTML element of the selected plan or annotation
   * @param {string} expectedColor: expected RGB color value
   */
  colorIs(
    planAnnotationContainer: pom.plans.planAnnotationContainer,
    expectedColor: string
  ) {
    object
      .currentColorCircle(planAnnotationContainer)
      .should('have.css', 'background-color', expectedColor)
  },

  /**
   * Asserts the number of the plans or annotations contained in the scrollable list is expected
   * @param {number} numPlanAnnotations : Number of expected plans or annotations
   */
  numberOfPlanAnnotations(numPlanAnnotations: number) {
    object.scrollableList().children().should('have.length', numPlanAnnotations)
  }
  // TODO: JUNO-14119 was created to track the following TODO items
  // plan color was changed
  // set target/entry check mark
  // if between target and entry, text reads "TO TARGET", if past targer, reads "PAST TARGET"
  // plan locked/unlocked
  // plan shown/hidden
  // active plan shown in banner when target is defined
}
