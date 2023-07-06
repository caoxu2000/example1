import { cyGui } from '@util/type/cyGui'
import { pom } from './type/tracking-view'
import { instrumentType } from '@global-config/instruments'
import { translatedPhrase } from '@util/translated-phrase'

export const object = {
  /**
   * Returns the tracking view drawer parent object
   * @return {cyGui<pom.trackingView.drawer>} : HTML Element of the tracking view drawer
   */
  drawer(): cyGui<pom.trackingView.drawer> {
    return cy.findByTestId('tracking-drawer')
  },

  /**
   * Returns the tracking view toggle button
   * @return {cyGui<pom.trackingView.drawerToggle>} : HTML Element of the toggle button
   */
  drawerToggle(): cyGui<pom.trackingView.drawerToggle> {
    return cy.findByRole('button', {
      name: translatedPhrase(
        'Components.TrackingControls.Button.ShowTrackingDrawer'
      ),
      exact: true
    })
  },

  /**
   * Returns the tracking view details toggle button
   * @param {pom.trackingView.drawer} drawer : HTML element of the tracking drawer
   * @return {cyGui<pom.trackingView.detailsToggle>} : HTML Element of the details toggle button
   */
  detailsToggle(
    drawer: pom.trackingView.drawer
  ): cyGui<pom.trackingView.detailsToggle> {
    return cy.wrap(drawer).findByRole('button', {
      name: /[Close|Open] Tracking Details/,
      exact: true
    })
  },

  /**
   * Returns the Tracking Details UI element.
   * @param {pom.trackingView.drawer} drawer : HTML element of the tracking drawer
   * @return {cyGui<pom.trackingView.details>} : HTML Element of the tracking details
   */
  details(drawer: pom.trackingView.drawer): cyGui<pom.trackingView.details> {
    return cy.wrap(drawer).findByTestId('tracking-details')
  },

  /**
   * Returns the canvas for the tracking view canvas.
   * @param {pom.trackingView.drawer} drawer : HTML element of the tracking drawer
   * @return {cyGui<pom.trackingView.xyCanvas>} : HTML Element of the xy canvas
   */
  xyCanvas(drawer: pom.trackingView.drawer): cyGui<pom.trackingView.xyCanvas> {
    return cy.wrap(drawer).findByTestId('canvas-xy')
  },

  /**
   * Returns the canvas for the tracking view depth gauge canvas.
   * @param {pom.trackingView.drawer} drawer : HTML element of the tracking drawer
   * @return {cyGui<pom.trackingView.depthCanvas>} : HTML Element of the depth canvas
   */
  depthCanvas(
    drawer: pom.trackingView.drawer
  ): cyGui<pom.trackingView.depthCanvas> {
    return cy.wrap(drawer).findByTestId('canvas-depth')
  },

  /**
   * Returns the localizer information card in the Tracking View details.
   * @param {pom.trackingView.drawer} details : HTML element of the tracking details
   * @return {cyGui<pom.trackingView.localizerCard>} : HTML Element of the localizer card
   */
  localizerCard(
    details: pom.trackingView.details
  ): cyGui<pom.trackingView.localizerCard> {
    return cy.wrap(details).findByTestId('localizer-card')
  },

  /**
   * Returns the localizer status message in the Tracking View details.
   * @param {pom.trackingView.localizerCard} localizerCard : HTML element of the localizer card
   * @return {cyGui<pom.trackingView.localizerStatus>} : HTML Element of the localizer status message
   */
  localizerStatus(
    localizerCard: pom.trackingView.localizerCard
  ): cyGui<pom.trackingView.localizerStatus> {
    return cy.wrap(localizerCard).findByTestId('localizer-connection-status')
  },

  /**
   * Returns the localizer information card in the Tracking View details.
   * @param {pom.trackingView.localizerCard} localizerCard : HTML element of the localizer card
   * @return {cyGui<pom.trackingView.localizerStatus>} : HTML Element of the localizer name
   */
  localizerName(
    localizerCard: pom.trackingView.localizerCard
  ): cyGui<pom.trackingView.localizerName> {
    return cy.wrap(localizerCard).findByTestId('localizer-name')
  },

  /**
   * Returns the instrument information card in the Tracking View details.
   * @param {pom.trackingView.drawer} details : HTML element of the tracking details
   * @param {instrumentType} instrument : the instrument whos card is desired
   * @return {cyGui<pom.trackingView.instrumentCard>} : HTML Element of the specified instrument card
   */
  instrumentCard(
    details: pom.trackingView.details,
    instrument: instrumentType
  ): cyGui<pom.trackingView.instrumentCard> {
    return cy
      .wrap(details)
      .findByText(instrument.name)
      .parents('[data-testid="tool-card"]')
  },

  /**
   * Returns the max geometry error from the instrument information card in the Tracking View details.
   * @param {pom.trackingView.instrumentCard} instrumentCard : HTML element of the specified instrument card
   *  @param {instrumentType} instrument : the instrument whos Max Error is desired
   * @return {cyGui<pom.trackingView.instrumentMaxError>} : HTML Element of max error message for the specified instrument card
   */
  instrumentMaxError(
    instrumentCard: pom.trackingView.instrumentCard,
    instrument: instrumentType
  ): cyGui<pom.trackingView.instrumentMaxError> {
    return cy
      .wrap(instrumentCard)
      .findByText(`Max Geometry Error: ${instrument.maxError} mm`, {
        exact: true
      })
  },

  /**
   * Returns the actual geometry error from the instrument information card in the Tracking View details.
   * @param {pom.trackingView.instrumentCard} instrumentCard : HTML element of the specified instrument card
   * @return {cyGui<pom.trackingView.instrumentTrackedError>} : HTML Element of the tracked error for the specified instrument card
   */
  instrumentTrackedError(
    instrumentCard: pom.trackingView.instrumentCard
  ): cyGui<pom.trackingView.instrumentTrackedError> {
    return cy.wrap(instrumentCard).findByTestId('tracked-error')
  }
}
