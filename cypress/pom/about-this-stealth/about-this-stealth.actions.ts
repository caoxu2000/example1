import { object } from './about-this-stealth.objects'
import { assert } from './about-this-stealth.asserts'
import * as opt from './about-this-stealth.options'

/**
 * Actions for the about this stealth page
 * @module about-this-stealth.action
 */
export const action = {
  /**
   * Change the language setting for the app
   * @param {string} language : new language to set in the application
   */
  changeLanguage(language: string = Cypress.env('language')) {
    object.languageDropdown().click()
    object.languageSelector(opt.lang[language].name).click()
    assert.language(opt.lang[language].name)
    Cypress.env('language', language)
  },
  /**
   * Click the 'Done' button to leave the current page
   */
  leavePage() {
    object.doneButton().click()
  }
}
