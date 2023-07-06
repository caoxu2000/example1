import { pom } from './type/registration'
import { cyGui } from '@util/type/cyGui'
import { toTestIdFormat } from '@util/stringFormats'

const touchPanelActionButtonTestId = {
  assign: 'assign-touch',
  clear: 'clear-touch',
  delete: 'delete-touch',
  save: 'save-touch',
  cancel: 'cancel-touch'
}

export const object = {
  /**
   * Returns the adjust button for selected exam card
   * @return {cyGui<pom.registration.adjustLevelWidth>} : HTML element of the manual registration adjust level/width button
   */
  adjustLevelWidth(): cyGui<pom.registration.adjustLevelWidth> {
    return cy.findByRole('button', {
      name: 'level-width-control-button',
      exact: true
    })
  },

  /**
   * Returns the specified (level or width) slider container
   * Note that the adjust level/width button must be selected in order to access this element
   * @param {string} sliderName : Name of the slider to select, options are found in registration index file
   * @return {cyGui<pom.registration.sliderContainer>} : HTML element of the selected manual registration slider container (level or width)
   */
  sliderContainer(sliderName: string): cyGui<pom.registration.sliderContainer> {
    return cy.findByTestId(toTestIdFormat(sliderName) + '-slider')
  },

  /**
   * Returns the manual registration slider from within the specified slider container (level or width)
   * Note that the adjust level/width button must be selected in order to access this element
   * @param {pom.registration.sliderContainer} sliderContainer : HTML element of the selected manual registration slider container (level or width)
   * @return {cyGui<pom.registration.slider>} : HTML element of the manual registration slider (level or width)
   */
  slider(
    sliderContainer: pom.registration.sliderContainer
  ): cyGui<pom.registration.slider> {
    return cy.wrap(sliderContainer).findByRole('slider')
  },

  /**
   * Returns the current slider value from within the specified slider container
   * @param {pom.registration.sliderContainer} sliderContainer : HTML element of the selected manual registration slider container (level or width)
   * @return {cyGui<pom.registration.sliderValue>} : HTML element of the slider (level or width) value
   */
  sliderValue(
    sliderContainer: pom.registration.sliderContainer
  ): cyGui<pom.registration.sliderValue> {
    return cy
      .wrap(sliderContainer)
      .findByTestId('slider-current-value', { exact: true })
  },

  /**
   * Returns the gear control button for selected exam card
   * @return {cyGui<pom.registration.gearControl>} : HTML element of the manual registration gear control button
   */
  gearControl(): cyGui<pom.registration.gearControl> {
    return cy.findByRole('button', { name: 'gear-control-button', exact: true })
  },

  /**
   * Returns the text input to edit the exam name
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.editName>} : HTML element of the "Name" text input
   */
  editName(): cyGui<pom.registration.editName> {
    return cy.findByRole('textbox', { exact: true })
  },

  /**
   * Returns the colormap dropdown for the exam card
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.colormap>} : HTML element of the Colormap dropdown
   */
  colormap(): cyGui<pom.registration.colormap> {
    return cy.findByTestId('colormap-dropdown', { exact: true })
  },

  /**
   * Returns the specified option from the colormap dropdown
   * Note that the gear control button must be selected in order to access this element
   * @param {string} colormapName : Name of the colormap to select, options are found in registration index file
   * @return {cyGui<pom.registration.selectColormap>} : HTML element of the selected colormap from the list
   */
  selectColormap(colormapName: string): cyGui<pom.registration.selectColormap> {
    return cy.findByRole('option', { name: colormapName, exact: true })
  },

  /**
   * Returns the modality dropdown for the model
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.modality>} : HTML element of the Modality dropdown
   */
  modality(): cyGui<pom.registration.modality> {
    return cy.findByTestId('modality-dropdown', { exact: true })
  },

  /**
   * Returns the specified option from the modality dropdown
   * Note that the gear control button must be selected in order to access this element
   * @param {string} modalityName : Name of the modality to select, options are found in registration index file
   * @return {cyGui<pom.registration.selectModality>} : HTML element of the selected modality from the list
   */
  selectModality(modalityName: string): cyGui<pom.registration.selectModality> {
    return cy.findByRole('option', { name: modalityName, exact: true })
  },

  /**
   * Returns the delete button for the selected model
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.deleteRegistration>} : HTML element of the delete button
   */
  deleteRegistration(): cyGui<pom.registration.deleteRegistration> {
    return cy.findByRole('button', { name: 'DELETE', exact: true })
  },

  /**
   * Returns the "Confirm" button to delete the registration for the selected model
   * Note that the DELETE button must be clicked in order to access this element
   * @return {cyGui<pom.registration.confirmDeleteRegistration>} : HTML element of the delete button
   */
  confirmDeleteRegistration(): cyGui<pom.registration.confirmDeleteRegistration> {
    return cy.findByRole('button', { name: 'CONFIRM', exact: true })
  },

  /**
   * Returns the "Cancel" button to cancel deleting the registration for the selected model
   * Note that the DELETE button must be clicked in order to access this element
   * @return {cyGui<pom.registration.cancelDeleteRegistration>} : HTML element of the delete button
   */
  cancelDeleteRegistration(): cyGui<pom.registration.cancelDeleteRegistration> {
    return cy.findByRole('button', { name: 'CANCEL', exact: true })
  },

  /**
   * Returns the colormap value
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.colormapValue>} : HTML element of the settings value
   */
  colormapValue(): cyGui<pom.registration.colormapValue> {
    return cy.findByTestId('colormap-current-value', { exact: true })
  },

  /**
   * Returns the modality value
   * Note that the gear control button must be selected in order to access this element
   * @return {cyGui<pom.registration.modalityValue>} : HTML element of the settings value
   */
  modalityValue(): cyGui<pom.registration.modalityValue> {
    return cy.findByTestId('modality-current-value', { exact: true })
  },

  /**
   * Returns the EDIT MODEL button for selected exam card
   * @return {cyGui<pom.registration.editModel>} : HTML element of the manual registration EDIT MODEL button
   */
  editModel(): cyGui<pom.registration.editModel> {
    return cy.findByRole('button', { name: 'EDIT MODEL', exact: true })
  },

  /**
   * Returns the CHANGE IMAGE button for selected exam card
   * @return {cyGui<pom.registration.changeImage>} : HTML element of the manual registration CHANGE IMAGE button
   */
  changeImage(): cyGui<pom.registration.changeImage> {
    return cy.findByRole('button', { name: 'CHANGE IMAGE', exact: true })
  },

  /**
   * Returns the "Touch 1% to initialize" text indicating that touch registration is loaded
   * @return {cyGui<pom.registration.touchReady>} : HTML element of the touch to initialize text
   */
  touchReady(): cyGui<pom.registration.touchReady> {
    return cy.findByText('Touch %1 to initialize', { timeout: 15000 })
  },
  /**
   * Returns the "Minimum trace" text indicating that trace registration is loaded
   * @return {cyGui<pom.registration.traceReady>} : HTML element of the minimum trace text
   */
  traceReady(): cyGui<pom.registration.traceReady> {
    return cy.findByText('Minimum Trace', { timeout: 15000 })
  },

  /**
   * Returns the "Continue Touching to initialize" text
   * @return {cyGui<pom.registration.touchComplete>} : HTML element of the continue touching to initialize text
   */
  touchComplete(): cyGui<pom.registration.touchComplete> {
    return cy.findByText('Continue Touching to initialize', { timeout: 15000 })
  },

  /**
   * Returns the Manual Registration TOUCH button
   * @return {cyGui<pom.registration.touch>} : HTML element of the manual registration TOUCH button
   */
  touch(): cyGui<pom.registration.touch> {
    return cy.findByRole('button', { name: 'TOUCH', exact: true })
  },

  /**
   * Returns the list of all landmarks
   * @return {cyGui<pom.registration.landmarkList>} : HTML element of all landmarks
   */
  landmarkList(): cyGui<pom.registration.landmarkList> {
    return cy.findAllByTestId('landmark', { exact: true })
  },

  /**
   * Returns the desired landmark by position
   * @param {number} landmarkPosition: position of desired landmark (top left is 1 - increases across the row)
   * @return {cyGui<pom.registration.landmark>} : HTML element of desired landmark
   */
  landmark(landmarkPosition): cyGui<pom.registration.landmark> {
    return object.landmarkList().eq(landmarkPosition - 1)
  },

  /**
   * Returns the requested touchpoint button by number
   * @param {string} touchpointNumber : Number of the desired touchpoint
   * @return {cyGui<pom.registration.touchpoint>} : HTML element of the requested touchpoint button
   */
  touchpoint(touchpointNumber: string): cyGui<pom.registration.touchpoint> {
    return cy.findByRole('button', { name: touchpointNumber, exact: true })
  },

  /**
   * Returns the list of all empty landmark placeholders
   * @return {cyGui<pom.registration.landmarkPlaceholderList>} : HTML element of all empty landmarks
   */
  landmarkPlaceholderList(): cyGui<pom.registration.landmarkPlaceholderList> {
    return cy.findAllByTestId('landmark-empty', { exact: true })
  },

  /**
   * Returns the desired touchpoint menu button
   * Note that the touchpoint button must be selected in order to access this element
   * @param {string} touchPanelActionButtonName : name of the desired touch panel action button to interact with, options are found in registration index file
   * @return {cyGui<pom.registration.touchpointMenu>} : HTML element of the desired touchpoint menu button
   */
  touchpointMenu(
    touchPanelActionButtonName: string
  ): cyGui<pom.registration.touchpointMenu> {
    return cy.findByTestId(
      touchPanelActionButtonTestId[touchPanelActionButtonName],
      { exact: true }
    )
  },

  /**
   * Returns the registration accuracy
   * @return {cyGui<pom.registration.registrationAccuracy>} : HTML element of the registration accuracy
   */
  registrationAccuracy(): cyGui<pom.registration.registrationAccuracy> {
    return cy.findByTestId('reg-accuracy', { exact: true })
  },

  /**
   * Returns the Manual Registration TRACE button
   * @return {cyGui<pom.registration.trace>} : HTML element of the manual registration TRACE button
   */
  trace(): cyGui<pom.registration.trace> {
    return cy.findByRole('button', { name: 'TRACE', exact: true })
  },

  /**
   * Returns the Manual Registration UNDO LAST ACTION button
   * Note that the TOUCH button must be selected in order to access this element
   * @return {cyGui<pom.registration.undoLastAction>} : HTML element of the manual registration UNDO LAST ACTION button
   */
  undoLastAction(): cyGui<pom.registration.undoLastAction> {
    return cy.findByRole('button', { name: 'UNDO LAST ACTION', exact: true })
  },

  /**
   * Returns the Manual Registration UNDO LAST TRACE button
   * Note that the TRACE button must be selected in order to access this element
   * @return {cyGui<pom.registration.undoLastTrace>} : HTML element of the manual registration UNDO LAST TRACE button
   */
  undoLastTrace(): cyGui<pom.registration.undoLastTrace> {
    return cy.findByRole('button', { name: 'UNDO LAST TRACE', exact: true })
  },

  /**
   * Returns the Manual Registration plus (add image point) button
   * Note that the TOUCH button must be selected in order to access this element
   * @return {cyGui<pom.registration.addImagePoint>} : HTML element of the manual registration plus button
   */
  addImagePoint(): cyGui<pom.registration.addImagePoint> {
    return cy.findByTestId('add-image-point', { exact: true })
  },
  /**
   * Returns the Manual Registration RESTART button
   * @return {cyGui<pom.registration.restart>} : HTML element of the manual registration RESTART button
   */
  restart(): cyGui<pom.registration.restart> {
    return cy.findByRole('button', { name: 'RESTART', exact: true })
  },
  /**
   * Returns the touch progress bar (blue bar on top of gray touch track)
   * @return {cyGui<pom.registration.touchProgressBar>} : HTML element of the touch progress bar
   */
  touchProgressBar(): cyGui<pom.registration.touchProgressBar> {
    return cy.findByTestId('touch-progress', { exact: true })
  },

  /**
   * Returns the specified marker from the touch progress bar
   * @param {1|2|3|4} touchProgressMarkerNumber: the number of the desired touch progress marker (1-4 and increasing left to right)
   * @return {cyGui<pom.registration.touchProgressMarker>} : HTML element of the specified marker from the touch progress bar
   */
  touchProgressMarker(
    touchProgressMarkerNumber: number
  ): cyGui<pom.registration.touchProgressMarker> {
    return cy
      .findAllByTestId('touch-progress-marker')
      .eq(touchProgressMarkerNumber - 1)
  },
  /**
   * Returns the dot from inside the specified marker from the touch progress bar
   * @param {number} touchProgressNumber: the number of the desired touch progress marker (1-4 and increasing left to right)
   * @return {cyGui<pom.registration.touchProgressInnerDot>} : HTML element of the specified dot from the touch progress bar
   */
  touchProgressInnerDot(
    touchProgressNumber: number
  ): cyGui<pom.registration.touchProgressInnerDot> {
    return object
      .touchProgressMarker(touchProgressNumber)
      .findByTestId('touch-progress-inner-dot')
  }
}
