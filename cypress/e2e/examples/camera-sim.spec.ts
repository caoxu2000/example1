import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'
import { trackingView } from '@pom/tracking-view'
import { instrument as instrumentTask } from '@pom/instruments'

import { util } from '@util'

import { instruments } from '@global-config/instruments'

// NOTE: TODO: JUNO-15593: To run this test, the Small Passive Cranial Frame and Passive Planar, Blunt must first be added to the Tumor Resection Optical

describe('Example spec for Camera Simulator methods verified with the Tracking View and Instruments Task', () => {
  // Before tests log in and proceed to Instruments task
  before(() => {
    // TODO: JUNO-15593: create new surgeon for test when available

    // Ensure Camera Sim is stopped to reset state
    util.cameraSimulator.stopCamSim()

    util.auth.login()
    util.exit()
    cy.visit('/')

    // select procedure and proceed to Instruments task where Tracking View is available
    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    menu.action.clickInstruments()
  })

  beforeEach(() => {
    // TODO: Remove exit, procedure selection, and Instruments click once Instruments no longer becomes blank upon refresh (defect number JUNO-24717)
    util.auth.login()
    util.exit()
    cy.visit('/')

    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    menu.action.clickInstruments()
  })

  // After all test have been run, exit procedure and logout of application
  after(() => {
    util.cameraSimulator.stopCamSim()
  })

  describe('Camera Sim Methods - Start and Stop Simulator', () => {
    // Context Test cases expect camera sim to be stopped as pre-condition
    beforeEach(() => {
      util.cameraSimulator.stopCamSim()
      trackingView.action.showTrackingView()
    })

    it('Can start and stop the camera simulator', () => {
      // Initial behavior: Camera is displayed as not connected
      trackingView.assert.cameraIsConnected(false)

      // Verify camera is displayed as connected when simulator is started
      util.cameraSimulator.startCamSim()
      trackingView.assert.cameraIsConnected(true)

      // Verify camera is displayed as not connected when simulator is stopped
      util.cameraSimulator.stopCamSim()
      trackingView.assert.cameraIsConnected(false)
    })
  })

  describe('Camera Sim Methods - Show/Hide Tool, Verify Tool, and other camera movement abilities', () => {
    // Tests in describe expect camerasim to be started, all tools to be hidden, and tracking view to be open
    beforeEach(() => {
      util.cameraSimulator.startCamSim()

      util.cameraSimulator.hideTool(instruments.passivePlanarBlunt)
      util.cameraSimulator.hideTool(instruments.smallPassiveCranialFrame)

      trackingView.action.showTrackingView()
      trackingView.action.showTrackingDetails()
    })

    it('Can successfully show and hide a tool to camera', () => {
      // Initial behavior, verify toolcard displays as hidden
      trackingView.assert.toolCardTrackingStatus(
        instruments.passivePlanarBlunt,
        trackingView.opt.trackingStatus.hidden
      )

      // Verify an instrument can be successfully shown to camera
      util.cameraSimulator.showTool(instruments.passivePlanarBlunt)
      trackingView.assert.toolCardTrackingStatus(
        instruments.passivePlanarBlunt,
        trackingView.opt.trackingStatus.visible
      )

      // Verify an instrument can be successfully hidden from the camera
      util.cameraSimulator.hideTool(instruments.passivePlanarBlunt)
      trackingView.assert.toolCardTrackingStatus(
        instruments.passivePlanarBlunt,
        trackingView.opt.trackingStatus.hidden
      )
    })

    it('Can succesfully verify a tool', () => {
      // Initial Behavior: Verify the tool is unverified upon entering task
      // Initial Behavior: Verify the tool is unverified upon entering task
      instrumentTask.task.assert.isToolVerified(
        instruments.passivePlanarBlunt,
        false
      )

      // Verify an instrument can be successfully verfied
      util.cameraSimulator.showTool(instruments.passivePlanarBlunt)
      util.cameraSimulator.showTool(instruments.smallPassiveCranialFrame)
      util.cameraSimulator.verifyTool(
        instruments.passivePlanarBlunt,
        instruments.smallPassiveCranialFrame
      )
      instrumentTask.task.assert.isToolVerified(
        instruments.passivePlanarBlunt,
        true
      )

      // TODO: JUNO-15593: Remove and re-add the Passive Planar to verify the tool becomes unverified
    })

    it('Can successfully simulate a new point', () => {
      util.cameraSimulator.showTool(instruments.passivePlanarBlunt)
      util.cameraSimulator.simulatePoint(
        instruments.passivePlanarBlunt,
        [10, 20, 30],
        [10, 20, 31]
      )

      // TODO: JUNO-15593 verify the tool moved in the tracking view via image compare
    })

    it('Can successfully navigate a tool', () => {
      // Verify an instrument can be successfully navigated
      util.cameraSimulator.showTool(instruments.passivePlanarBlunt)
      util.cameraSimulator.navigateTool(instruments.passivePlanarBlunt, 10)
    })
  })
})
