import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './menu.actions'
import { object } from './menu.objects'
import { assert } from './menu.asserts'
import * as opt from './menu.options'
/**
 * Main Menu functions
 * Actions, Objects and Assertions for the main menu
 * @module menu
 *
 * @example
 * // Action:
 * // Combined click operations and asserts:
 * menu.actions.clickSurgeon()
 *
 * // Object:
 * // Chain other cypress functions on the object:
 * menu.surgeon.click()
 * menu.surgon.should('be.visible')
 *
 * // Assert:
 * // Built into the actions or can be called directly:
 * menu.assert.surgeon()
 */
export const menu = {
  ...wrapConsoleLog<typeof object>('shared.menu.object', object),
  action: wrapConsoleLog<typeof action>('shared.menu.action', action),
  assert: wrapConsoleLog<typeof assert>('shared.menu.assert', assert),
  opt
}
