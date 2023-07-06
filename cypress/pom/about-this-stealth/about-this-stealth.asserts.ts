import { util } from '@util'
import { guiRoutes } from '@util/assert/config'
/**
 * Description:
 * Validations for the about-this-stealth page
 */
export const assert = {
  /**
   * Assert the correct language is displayed in the language dropdown
   * @param {string} language : the language that gets displayed for the language dropdown
   */
  language(language: string) {
    util.assert.urlIs(guiRoutes.about)
    cy.findByTestId('combo-box-value').findByText(language).should('exist')
  }
}
