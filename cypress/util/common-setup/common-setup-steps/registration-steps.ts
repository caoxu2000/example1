import { registration } from '@pom/manual-registration'
import { menu } from '@pom/shared/menu'
import { TRURegistrationType } from '@pom/manual-registration/registration.options'

import { touchImagePoint, touchNavPoint } from '@fixtures/type/regPoint'
import { util } from '@util'
import { rabbitMessage } from '@util/rabbit-message'
import { manualRegTopics } from '@util/simulate/type/routingKeys'

/**
 * Common setup step to collect a single navigated touch location for touch registration using rabbit messaging
 * @param {{offset: number, point:Array<number>}} touchPayload : The touch location to collect
 * {
    offset: number,
    point: number[];
   }
 */
export function defineSingleNavTouchLocation(touchPayload: {
  offset: number
  point: Array<number>
}) {
  cy.log('action.defineSingleNavTouchLocation')
  // send nav location using rabbit
  rabbitMessage(
    manualRegTopics.regTouchPoint,
    touchPayload,
    manualRegTopics.regTouchInst
  )
}

/**
 * Common setup step to simulate touch registration with given image points and nav points using rabbit messaging
 * @param {touchImagePoint} imagePoints: An array of image points for touch registration
 * @param {touchNavPoint} navPoints: An array of nav points for touch registration
 * @param {string} expectedAccuracy: the expected accuracy of the registration from the given points
 */
export function createTouchRegistration(
  imagePoints: touchImagePoint,
  navPoints: touchNavPoint,
  expectedAccuracy: string
) {
  cy.log('action.createTouchRegistration')
  util.createImageTouchPoints(imagePoints)
  // TODO: JUNO-23723 - investigate whether there are API calls or messages that can be waited in instead of using a hard-coded wait
  cy.wait(5000)
  util.defineNavTouchLocations(navPoints)
  cy.wait(5000)
  registration
    .registrationAccuracy()
    .should('have.text', expectedAccuracy + ' mm')
}

/**
 * Common setup step to set up a registration according to the specified parameters
 * @param {TRURegistrationType} reg : Registration data, including name of the registration method to use, image points, and navigation points
 * @throws {Error} if provided registration method is not supported
 */
export function setupRegistration(reg: TRURegistrationType) {
  menu.action.clickRegistration()
  if (reg.method === 'TOUCH') {
    // TODO: Workaround: clicking TRACE first ensures that the touch tab fully loads, remove when the tabs load correctly
    registration.trace().click()
    registration.touch().click()
    registration.touchReady().should('exist')

    createTouchRegistration(reg.imagePoints, reg.navPoints, '0.8')
  } else if (reg.method === 'TRACE') {
    registration.trace().click()
    throw new Error(
      'Trace registration is currently unable to be performed in the application.'
    )
  } else {
    throw new Error(
      reg.method +
        ' is not a valid registration method. Only touch and trace registrations may be performed in the application.'
    )
  }
}
