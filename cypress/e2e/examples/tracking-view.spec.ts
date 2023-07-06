import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'
import { trackingView } from '@pom/tracking-view'

import { CssColors } from '@global-config/CssColors'
import { instruments } from '@global-config/instruments'

import { util } from '@util'

describe('Example test for tracking view pane', () => {
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    menu.action.clickInstruments()

    // open tracking view drawer
    trackingView.drawerToggle().click()
    trackingView.drawer().then(($drawer) => {
      // open tracking view details
      trackingView.detailsToggle($drawer).click()
    })
  })

  it('Tracking View and Details are Open', () => {
    // assert tracking view drawer and details are both open
    trackingView.drawer().then(($drawer) => {
      trackingView.xyCanvas($drawer).should('be.visible')
      trackingView.details($drawer).should('be.visible')
    })
  })

  it('Camera Status Not Connected and Red', () => {
    trackingView.drawer().then(($drawer) => {
      trackingView.details($drawer).then(($details) => {
        trackingView
          .localizerCard($details)
          .should('have.css', 'background-color', CssColors.TRACKING_CARD_RED)
          .then(($localizerCard) => {
            // assert camera is visible
            trackingView
              .localizerName($localizerCard)
              .findByText('Camera', { exact: true })
              .should('be.visible')

            // assert camera status is "Not Connected"
            trackingView
              .localizerStatus($localizerCard)
              .findByText(`${trackingView.opt.CameraStatus.DISCONNECTED}`, {
                exact: true
              })
              .should('be.visible')
          })
      })
    })
  })

  it('Passive Planar Blunt is shown, Max Geometry Error is 0.5', () => {
    trackingView.drawer().then(($drawer) => {
      trackingView.details($drawer).then(($details) => {
        trackingView
          .instrumentCard($details, instruments.passivePlanarBlunt)
          .should('have.css', 'background-color', CssColors.TRACKING_CARD_RED)
          .then(($selectedObject) => {
            // assert maximum error is visible
            trackingView
              .instrumentMaxError(
                $selectedObject,
                instruments.passivePlanarBlunt
              )
              .should('be.visible')

            // assert tracked error is visible
            // TODO: tracked error is only visible when the error is nonzero, which it currently never is; uncomment when functionality is available
            // trackingView
            //   .instrumentTrackedError($selectedObject)
            //   .should('be.visible')
          })
      })
    })
  })

  it('Simulate (Optical) Tracking View', () => {
    trackingView.action.startTracking('optical')
  })

  it('Simulate (EM) Tracking View', () => {
    // TODO: remove from optical procedure when real simulators are developed. Replace in EM procedure.
    trackingView.action.startTracking('em')
  })

  it('Close Tracking View and Details', () => {
    trackingView.drawer().then(($drawer) => {
      // close tracking view details
      trackingView.detailsToggle($drawer).click()
      trackingView.details($drawer).should('not.be.visible')

      // close tracking view drawer
      trackingView.drawerToggle().click()
      trackingView.xyCanvas($drawer).should('not.be.visible')
    })
  })
})
