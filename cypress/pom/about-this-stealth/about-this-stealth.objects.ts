import { pom } from './type/about-this-stealth'
import { cyGui } from '@util/type/cyGui'
import { translatedPhrase } from '@util/translated-phrase'
/**
 * Description:
 * Object accessors for the about this stealth page.
 * Objects are found by label
 */

export const object = {
  /**
   * Returns the language currently selected in the language dropdown
   * @return {cyGui<pom.aboutThisStealth.languageDropdown>} : HTML element of the language currenly selected in the language dropdown
   */
  languageDropdown(): cyGui<pom.aboutThisStealth.languageDropdown> {
    return cy.findByTestId('combo-box-value')
  },
  /**
   * Returns the language option from the language dropdown with specified name
   * @param {string} name :  language option the user would like to select from the language dropdown list
   * @return {cyGui<pom.aboutThisStealth.languageSelector>} : HTML element of the language option from the language dropdown
   */
  languageSelector(name: string): cyGui<pom.aboutThisStealth.languageSelector> {
    return cy.findByRole('button', { name: name, exact: true })
  },
  /**
   * Returns 'Done' button on the page
   * @return {cyGui<pom.aboutThisStealth.doneButton>} : HTML element of the 'Done' button on the page
   */
  doneButton(): cyGui<pom.aboutThisStealth.doneButton> {
    return cy.findByText(translatedPhrase('SmartPrompt.done'), { exact: true })
  }
}
