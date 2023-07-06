/**
 * Type for options object to be passed into takeAndCompareScreenshot
 */
type screenshotOpts = {
  log?: boolean | Function
  limit?: number
  timeout?: number
  delay?: number
}
/**
 *
 * This function allows user take a screenshot of an DOM element or a screenshot of the entire page and compare it to an existing baseline image
 * If run with the environment variable 'screenshotGoldenMode' set to true, create a new baseline image (throws an error if there is an existing baseline image with matching name)
 * If 'screenshotGoldenMode' is set to false, take a screenshot then compare the screenshot to the baseline image and highlight the differences
 *
 * @param {string} screenshotName name for the screenshot to be saved under - note: this name must be unique from other screenshots to avoid overwriting images
 * @param {Function} pomObject POM object to screenshot (if no pom object supplied, the entire screen will be screenshotted)
 * @param {number} threshold  number from 0-1 of how different baseline image can be from compared image (0 meaning there can be 0% difference between the two images) - defaults to 0
 * @param {screenshotOpts} options optional options:
 *                                            log - a boolean flag or function to specify logging,
 *                                            limit - max number of iterations to retry,
 *                                            timeout - time limit in ms,
 *                                            delay - delay before next iteration in ms
 */
export function takeAndCompareScreenshot(
  screenshotName: string,
  pomObject?: Function,
  threshold = 0,
  options?: screenshotOpts
) {
  cy.log('util.takeAndCompareScreenshot')
  const filePath = `cypress-visual-screenshots/baseline/${Cypress.spec.name}-${screenshotName}.png`

  // if creating a baseline image (running in golden mode), throw error if existing baseline exists
  if (Cypress.env('screenshotGoldenMode')) {
    cy.task('checkForFileExistence', filePath)
    cy.log(`Creating new baseline image with name ${screenshotName}`)
  } else {
    // ensure that the baseline file has been created and is in the correct directory
    cy.readFile(filePath)
    cy.log(
      `Taking screenshot and comparing to baseline image. Image name is: ${screenshotName}`
    )
  }

  // if there is no pom object, compare the entire screen, otherwise screenshot the specific element
  if (!pomObject) {
    cy.compareSnapshot(screenshotName, threshold, options)
  } else {
    pomObject().compareSnapshot(screenshotName, threshold, options)
  }

  cy.log(
    `Baseline Screenshot (<root>/cypress-visual-screenshots/baseline/examples/<testFileName>-${screenshotName}.png) 
    was compared to test screenshot (Test Screenshot located: <root>/cypress-visual-screenshots/comparison/examples/<testFileName>-${screenshotName}.png)`
  )
}
