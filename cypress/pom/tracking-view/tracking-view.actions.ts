import { simulateTrackingView } from '@util/simulate/simulate-tracking-view'
import { object } from './tracking-view.objects'
import { assert } from './tracking-view.asserts'

export const action = {
  /**
   * Method to begin the simulated tracking view, for whatever tracking type specified.
   * @param {string} trackType : Type of tracking to be simulated. Either EM or Optical.
   */
  startTracking(trackType: string) {
    simulateTrackingView(trackType)
  },

  /**
   * Method to show the Tracking View window
   */
  showTrackingView() {
    // TODO: Remove force of click when smart prompt no longer covers the toggle
    object.drawerToggle().click({ force: true })
    assert.trackingViewIsVisible(true)
  },

  /**
   * Method to hide the Tracking View window
   */
  hideTrackingView() {
    object.drawerToggle().click()
    assert.trackingViewIsVisible(false)
  },

  /**
   * Method to show Tracking View Details window
   */
  showTrackingDetails() {
    // Verify tracking view is opened before attempting to access tracking details
    assert.trackingViewIsVisible(true)

    object.drawer().then(($drawer) => {
      object.detailsToggle($drawer).click()
    })

    assert.trackingDetailsIsVisible(true)
  },

  /**
   * Method to hide Tracking View Details window
   */
  hideTrackingDetails() {
    // Verify tracking view is opened before attempting to access tracking details
    assert.trackingViewIsVisible(true)

    object.drawer().then(($drawer) => {
      object.detailsToggle($drawer).click()
    })
    assert.trackingDetailsIsVisible(false)
  }
}
