import { object } from './patient.objects'

import { pom as pomCommon } from '../common/type/common'
import { commonAction } from '../common/common.actions'

import { alias } from '@util/type/cy-alias'

export const action = {
  ...commonAction,
  // TODO:
  // adjust level and slider width using mouse actions?

  /**
   * Clicks on desired exam Card
   * @param {string} examName : exam name to select
   * */
  clickExamCard(examName: string) {
    cy.waitForApi(alias.detail, () => {
      // select exam
      object.examCard(examName).click()
    })
  },

  /**
   * Updates the Modality dropdown to the desired Modality name
   * @param {string} modalityName: the name of the Modality to update to
   * @param {cyGui<pomCommon.images.common.seriesCard>} examCard: HTML Element of the selected exam card
   */
  updateModality(
    modalityName: string,
    examCard: pomCommon.images.common.seriesCard
  ) {
    object.modalityDropdown(examCard).click()
    object.modalityOption(modalityName).click()
    object.currentModality(examCard).should('have.value', modalityName)
  }
}
