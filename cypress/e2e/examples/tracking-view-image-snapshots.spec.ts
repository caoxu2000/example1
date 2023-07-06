import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'
import { trackingView } from '@pom/tracking-view'
import { takeAndCompareScreenshot } from '@util/take-and-compare-screenshot'

import { util } from '@util'

import { instruments } from '@global-config/instruments'

// After all test have been run, stop the camera sim
after(() => {
  util.cameraSimulator.stopCamSim()
})

describe('Image Compare: Image Tracking', () => {
  // Context Test cases expect camera sim to be stopped as pre-condition
  beforeEach(() => {
    // TODO: Remove exit, procedure selection, and Instruments click once Instruments no longer becomes blank upon refresh (defect number JUNO-24717)
    util.auth.login()
    util.exit()
    cy.visit('/')

    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    menu.action.clickInstruments()

    util.cameraSimulator.stopCamSim()
    trackingView.action.showTrackingView()

    util.cameraSimulator.startCamSim()

    util.cameraSimulator.hideTool(instruments.passivePlanarBlunt)
    util.cameraSimulator.hideTool(instruments.smallPassiveCranialFrame)
  })

  it('Set the baseline image for image compare', () => {
    // Make tool visible to the camera
    util.cameraSimulator.showTool(instruments.passivePlanarBlunt)

    // assert tool is now visible
    trackingView.assert.toolCardTrackingStatus(
      instruments.passivePlanarBlunt,
      trackingView.opt.trackingStatus.visible
    )

    // create baseline images - there must be a separate screenshot for each comparison to see difs for each in screenshot reporter
    Cypress.env('screenshotGoldenMode', true)
    takeAndCompareScreenshot(
      'tracking-view/image-tracking-match',
      trackingView.xyCanvas
    )
    takeAndCompareScreenshot(
      'tracking-view/image-tracking-mismatch1',
      trackingView.xyCanvas
    )
    takeAndCompareScreenshot(
      'tracking-view/image-tracking-mismatch2',
      trackingView.xyCanvas
    )
    takeAndCompareScreenshot('fullscreen/image-tracking-fullscreen')
    Cypress.env('screenshotGoldenMode', false)
  })

  it('Verify tracking view matches without changing anything', () => {
    trackingView.assert.toolCardTrackingStatus(
      instruments.passivePlanarBlunt,
      trackingView.opt.trackingStatus.hidden
    )
    util.cameraSimulator.showTool(instruments.passivePlanarBlunt)

    // Assert tool is visible to camera
    trackingView.assert.toolCardTrackingStatus(
      instruments.passivePlanarBlunt,
      trackingView.opt.trackingStatus.visible
    )

    // compare screenshot to baseline image
    takeAndCompareScreenshot(
      'tracking-view/image-tracking-match',
      trackingView.xyCanvas
    )
  })

  it('Hide tool and verify that difference percent under given threshold still passes', () => {
    // Hide tool from the camera
    util.cameraSimulator.hideTool(instruments.passivePlanarBlunt)

    // Initial behavior, verify toolcard displays as hidden
    trackingView.assert.toolCardTrackingStatus(
      instruments.passivePlanarBlunt,
      trackingView.opt.trackingStatus.hidden
    )

    takeAndCompareScreenshot(
      'tracking-view/image-tracking-mismatch1',
      trackingView.xyCanvas,
      0.3
    )
  })

  // This test should fail as an example of mismatching image compare for pom
  it('Hide tool and verify that screenshots no longer match', () => {
    // Hide tool from the camera
    util.cameraSimulator.hideTool(instruments.passivePlanarBlunt)

    // Initial behavior, verify toolcard displays as hidden
    trackingView.assert.toolCardTrackingStatus(
      instruments.passivePlanarBlunt,
      trackingView.opt.trackingStatus.hidden
    )

    takeAndCompareScreenshot(
      'tracking-view/image-tracking-mismatch2',
      trackingView.xyCanvas
    )
  })

  // This test should fail as an example of mismatching image compare for full screen
  it('Take Screenshot of full screen and verify that it no longer matches', () => {
    takeAndCompareScreenshot('fullscreen/image-tracking-fullscreen')
  })
})
