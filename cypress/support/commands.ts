import { aliasRoute } from '@util/type/cy-alias'
import { util } from '@util'

declare global {
  namespace Cypress {
    interface Chainable {
      setLanguage(newLanguage?: string, log?: boolean)
      waitForApi(alias: aliasRoute, func: any, timeout?: number)
      compareSnapshot(...args)
    }
  }
}

/**
 * Sets the language of the website and cypress environment
 * To change to default running language, run directly after cy.visit()
 *
 * To set the language to something other than the Cypress language env var,
 * Pass in the locale code of the language
 *
 * @param {string} [newLanguage=env.language] - optional language id, reads env by default
 * @param {boolean} [log=false] - optional logging override, individual commands off by default
 */
Cypress.Commands.add(
  'setLanguage',
  { prevSubject: false },
  (newLanguage = Cypress.env('language'), log = false) => {
    cy.log(`cy.setLanguage: ${newLanguage}`)

    cy.window({ log: log })
      .its('store', { log: log })
      .invoke({ log: log }, 'getState')
      .as('getState')
      .then((state) => {
        if (state.lang.locale != newLanguage) {
          cy.log('cy.setLanguage: updating language')
          // update app language
          cy.window().its('store').invoke('dispatch', {
            type: 'lang/localeSelected',
            payload: newLanguage
          })
          // update cypress env
          Cypress.env('language', newLanguage)
        }
      })
  }
)

/**
 * New Intercept Wrapper to wrap the intercept initialization and wait around the actions
 * @param {aliasRoute} alias : the api call being intercepted (including its method, path, and name)
 * @param {() => unknown} func : an anonymous function that has a series of actions in it
 * @param {number} timeout the amount of time to wait for the api call (in ms) before a timeout
 */
Cypress.Commands.add(
  'waitForApi',
  { prevSubject: false },
  (alias: aliasRoute, func: () => unknown, timeout?: number) => {
    util.intercept.addIntercept(alias)
    func()
    util.intercept.waitForIntercept(alias, timeout)
  }
)

Cypress.Commands.overwrite('log', (log, text, ...args) => {
  const stepStrings = [
    '.action.',
    '.assert.',
    '.object.',
    '.next.',
    '.previous.',
    'util.',
    'commonSetup.'
  ]
  if (stepStrings.some((phrase) => text.includes(phrase))) {
    // get the list of steps so far, or make a new list if one isn't made
    const stepArray = Cypress.env('STEPS_TAKEN')

    // add the action to the list of steps, removing asterisks if present from wrapConsoleLog
    stepArray.push(text.replace(/\*/g, ''))

    // update the environment list of steps
    Cypress.env('STEPS_TAKEN', stepArray)
  }

  return log(text, ...args)
})
