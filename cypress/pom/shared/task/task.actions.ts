import { object } from './task.objects'
import { taskLabel } from '../task-labels'
import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

export const next = {
  /**
   * Clicks the next task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  images() {
    object.nextButton().should('have.text', taskLabel.images.label).click()
    util.assert.urlIs(guiRoutes.images)
  },

  /**
   * Clicks the next task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  plan() {
    object
      .nextButton()
      .should('have.text', taskLabel.plan.label)
      .parent()
      .click()
    util.assert.urlIs(guiRoutes.plan)
  },

  /**
   * Clicks the next task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  registration() {
    object
      .nextButton()
      .should('have.text', taskLabel.registration.labelRight)
      .click()
    util.assert.urlIs(guiRoutes.registration)
  },

  /**
   * Clicks the next task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  truVerify() {
    object.nextButton().should('have.text', taskLabel.truVerify.label).click()
    util.assert.urlIs(guiRoutes.truVerify)
  },

  /**
   * Clicks the next task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  navigation() {
    object.nextButton().should('have.text', taskLabel.navigation.label).click()
    util.assert.urlIs(guiRoutes.navigation)
  }
}

export const previous = {
  /**
   * Clicks the previous task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  images() {
    object.previousButton().should('have.text', taskLabel.images.label).click()
    util.assert.urlIs(guiRoutes.images)
  },

  /**
   * Clicks the previous task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  plan() {
    object.previousButton().should('have.text', taskLabel.plan.id).click()
    util.assert.urlIs(guiRoutes.plan)
  },

  /**
   * Clicks the previous task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  registration() {
    object
      .previousButton()
      .should('have.text', taskLabel.registration.label)
      .click()
    util.assert.urlIs(guiRoutes.registration)
  },

  /**
   * Clicks the previous task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  truVerify() {
    object
      .previousButton()
      .should('have.text', taskLabel.truVerify.label)
      .click()
    util.assert.urlIs(guiRoutes.truVerify)
  },

  /**
   * Clicks the previous task button if it has the correct label, asserts the current URL is correct for the desired task after clicking.
   */
  navigation() {
    object
      .previousButton()
      .should('have.text', taskLabel.navigation.label)
      .click()
    util.assert.urlIs(guiRoutes.navigation)
  }
}
