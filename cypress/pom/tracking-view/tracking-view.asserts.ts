import * as opt from './tracking-view.options'
import { object } from './tracking-view.objects'
import { instrumentType } from '@global-config/instruments'

export const assert = {
  /**
   * Asserts a given tool's visbility status in its tracking view tool card
   *
   * @param {instrumentType} tool: Name of the instrument to verify
   * @param {opt.trackingState} status: the tool's expected visbility status
   */
  toolCardTrackingStatus(tool: instrumentType, status: opt.trackingState) {
    object.drawer().then(($drawer) => {
      object.details($drawer).then(($details) => {
        object
          .instrumentCard($details, tool)
          .should('have.css', 'border-bottom', status.toolCardColor)
      })
    })
  },

  /**
   * Asserts if the camera is successfully connected/disconnected
   *
   * @param {boolean} isConnected: The expected camera status
   *                                  If True - the camera should display as connected
   *                                  If False - the camera should display as not connected
   */
  cameraIsConnected(isConnected: boolean) {
    object.drawer().then(($drawer) => {
      object.details($drawer).then(($details) => {
        object.localizerCard($details).then(($localizerCard) => {
          object
            .localizerStatus($localizerCard)

            .should(
              'have.text',
              isConnected
                ? opt.CameraStatus.CONNECTED
                : opt.CameraStatus.DISCONNECTED
            )
        })
      })
    })
  },

  /**
   * Asserts if the Tracking View window is Visbile
   *
   * @param {boolean} isVisible: The expected visibility of the tracking view
   *                                  If True - the tracking view is displayed
   *                                  If False - the tracking view is not displayed
   */
  trackingViewIsVisible(isVisible: boolean) {
    const trackingViewWindow = 'Asserting tracking view drawer visibility'
    object.drawer().should(($drawer) => {
      if (isVisible) {
        expect($drawer, trackingViewWindow).to.be.visible
      } else {
        expect($drawer, trackingViewWindow).to.be.hidden
      }
    })
  },

  /**
   * Asserts if the Tracking Details window is open or closed
   *
   * @param {boolean} isVisible: The expected visibility of the tracking details window
   *                                  If True - the tracking view details is displayed
   *                                  If False - the tracking view details is not displayed
   */
  trackingDetailsIsVisible(isVisible: boolean) {
    object.drawer().then(($drawer) => {
      object.detailsToggle($drawer).should(($drawerToggle) => {
        expect(
          $drawerToggle,
          'Asserting tracking view details visibility'
        ).to.have.text(
          isVisible
            ? opt.TrackingDetailsToggleText.CLOSED
            : opt.TrackingDetailsToggleText.OPEN
        )
      })
    })
  }
}
