import { pom } from './type/patient'
import { commonObject } from '../common/common.objects'
import { pom as pomCommon } from '../common/type/common'

import { cyGui } from '@util/type/cyGui'

export const object = {
  ...commonObject,
  /**
   * Returns the exam card with the provided exam name
   * @param {string} examName : Name of the patient exam to be selected
   * @return {cyGui<pomCommon.images.common.seriesCard>} : HTML Element of the selected exam card
   */
  examCard(examName: string): cyGui<pomCommon.images.common.seriesCard> {
    return commonObject
      .rightPanel()
      .contains(examName)
      .parents('[data-testid="exam-card"]')
  },
  /**
   * Returns the portion of the exam card that houses the exam info
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.examInfoBox>} : HTML element of the exam info box
   */
  examInfoBox(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.examInfoBox> {
    return cy.wrap(examCard).findByTestId('inner-card')
  },
  /**
   * Returns the toggle to select or unselect the specified exam card
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.select>} : HTML element of the select/unselect exam toggle
   */
  selectToggle(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.select> {
    return cy
      .wrap(examCard)
      .findByRole('checkbox', { name: 'Select', exact: true })
  },
  /**
   * Returns the track of the select toggle for the specified exam card
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.selectTrack>} : HTML element of the select track
   */
  selectTrack(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.selectTrack> {
    return cy.wrap(examCard).find('[class="MuiSwitch-track"]')
  },
  /**
   * Returns the adjust exam button for the specified exam card
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.adjust>} : HTML element of the adjust exam button
   */
  adjustButton(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.adjust> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'level-width-control-button', exact: true })
  },

  /**
   * Returns the textbox to edit the exam name for the specified exam card
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.examNameTextbox>} : HTML element of the exam name textbox
   */
  examNameTextbox(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.examNameTextbox> {
    return cy.wrap(examCard).findByRole('textbox')
  },
  /**
   * Returns the modality drop-down menu for the specified exam card
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {pom.images.patient.modalityDropdown} : HTML element of the modality drop-down menu
   */
  modalityDropdown(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.modalityDropdown> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'modality-dropdown', exact: true })
  },
  /**
   * Returns the button for the desired modality drop-down menu option
   * Note that the settings sub-menu must be open in order to access this element
   * @param {string} modalityName : Modality option to select, options found within images.patient.opt
   * @return {cyGui<pom.images.patient.modalityOption>} : HTML element of the modality option button
   */
  modalityOption(
    modalityName: string
  ): cyGui<pom.images.patient.modalityOption> {
    return cy.findByRole('option', { name: modalityName, exact: true })
  },
  /**
   * Returns the current modality
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.currentModality>} : HTML element of the current modality indicator
   */
  currentModality(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.currentModality> {
    return cy.wrap(examCard).findByTestId('modality-current-value')
  },
  /**
   * Returns the button to delete the specified exam card
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.deleteExam>} : HTML element of the delete button
   */
  deleteExam(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.deleteExam> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'Delete', exact: true })
  },
  /**
   * Returns the button to cancel deletion of the specified exam card
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.cancelDeleteExam>} : HTML element of the cancel button
   */
  cancelDeleteExam(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.cancelDeleteExam> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'Cancel', exact: true })
  },
  /**
   * Returns the button to confirm deletion of the specified exam card
   * Note that the settings sub-menu must be open in order to access this element
   * @param {pomCommon.images.common.seriesCard} examCard : HTML element of the selected exam card
   * @return {cyGui<pom.images.patient.confirmDeleteExam>} : HTML element of the confirm button
   */
  confirmDeleteExam(
    examCard: pomCommon.images.common.seriesCard
  ): cyGui<pom.images.patient.confirmDeleteExam> {
    return cy
      .wrap(examCard)
      .findByRole('button', { name: 'CONFIRM', exact: true })
  },
  /** Returns the button to close the lightbox
   * // TODO: JUNO-24986 - update to use test id
   * @return {cyGui<pom.images.patient.closeLightbox>} : HTML element of the close lightbox button
   */
  closeLightbox(): cyGui<pom.images.patient.closeLightbox> {
    return cy.findByTestId('views-layout').find('#Close_Icon')
  }
}
