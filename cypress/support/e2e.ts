// This support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { configure } from '@testing-library/cypress'
import '@testing-library/cypress/add-commands'
import './commands'
import addContext from 'mochawesome/addContext'
import * as path from 'path'
import compareSnapshotCommand from 'cypress-image-diff-js/dist/command'
import { sshExe } from '@util/ssh-exe'

configure({ testIdAttribute: 'data-testid' })

// disableTimersAndAnimations allows for image compare retries
compareSnapshotCommand({ disableTimersAndAnimations: false })

// Reset the steps taken array at the beginning of a spec and betwen tests to log steps taken in each test
before(() => {
  Cypress.env('STEPS_TAKEN', [])
})
afterEach(() => {
  Cypress.env('STEPS_TAKEN', [])
})

// This generateReport comes from the cypress image diff module and is necessary to generate the image comparison report
after(() => {
  cy.task('generateReport')
})

// After a test run, if a failure occurs add the failure screenshot to the mocha log reports
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let screenshotDir = `${Cypress.config('screenshotsFolder')}/${
      Cypress.spec.name
    }`
    // Generate screenshot name from test title and hook location
    const screenshotFileBaseName =
      runnable.titlePath().join(' -- ').replace(/[:/]/g, '') +
      (test.hookName ? ` -- ${test.hookName} hook` : '')
    let screenshot = `${screenshotDir}/${screenshotFileBaseName} (failed).png`

    // CYPRESS_REPORT_DIR is an env variable used in test-runner files to collect report assets.
    // If it has been set, modify the screenshot path to be a relative path before adding context.
    if (Cypress.env('REPORT_DIR')) {
      // If running Cypress in Windows, convert the path to Linux
      screenshotDir = screenshotDir.replace(/\\/g, '/')
      const [, relativeDir] = screenshotDir.split(
        Cypress.env('REPORT_DIR') + '/'
      )
      screenshot = path.join(
        relativeDir,
        `${screenshotFileBaseName} (failed).png`
      )
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Ignoring typescript error where expected extra fields from test are not correct
    addContext({ test }, screenshot)
  }
})

/**
 * Return a list of last step messages that can then be appended to the end of existing error message
 * @param {Cypress.CypressError} error : Cypress Error when there is a failure in test
 * @param {string[]} steps : log messages of the steps in test
 * @param {Mocha.Runnable} runnableObj : Mocha Runnable object
 * @return {string} : a list of last step messages appended to the end of existing error message
 */
const createCustomErrorMessage = (
  error: Cypress.CypressError,
  steps: string[],
  runnableObj: Mocha.Runnable
): string => {
  let lastSteps = 'Last logged steps:\n'

  // map the steps to a list of numbers to create a numbered list when printed
  steps.map((step, index) => {
    lastSteps += `${index + 1}. ${step}\n`
  })

  // add the list of last steps to the end of the existing error message
  // add test name and a line for a clearer error as well
  const messageArr = [
    `Test: ${runnableObj.title}`,
    '----------',
    `${error.message}`,
    `\n${lastSteps}`
  ]

  return messageArr.join('\n')
}

Cypress.on('fail', (err, runnable) => {
  sshExe('/opt/mnav/auth-service/502_diagnostics/run.sh')
  let message: Array<string>
  if (Cypress.env('STEPS_TAKEN').length === 0) {
    message = ['No app actions were performed before the test errored']
  } else {
    // Display the number of steps as specified in the numberStepsDisplayed environment variable
    message = Cypress.env('STEPS_TAKEN').slice(
      -Cypress.env('numberStepsDisplayed')
    )
  }
  // Keep base error and add new message
  err.message = createCustomErrorMessage(err, message, runnable)

  throw err
})
