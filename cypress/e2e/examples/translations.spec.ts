import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'
import { aboutThisStealth } from '@pom/about-this-stealth'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'

const env = Cypress.env()

// utilities
const { _ } = Cypress

describe('Translation Test with dynamic hot swap of languages', () => {
  // bypass gui and reset potentially cached app
  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    menu.action.clickAboutThisStealth()
  })

  /**
   * Test to ensure that we are pulling the text from our env language config file
   * If the language is already loaded into our config, read from the config
   * Otherwise, load in the new language then read from config
   * Note: Under normal circumstances we wouldn't dynamically read in language files
   * with cy.readFile() - we will load them from the setLanguages list in the env.
   * We're just doing this here to test that we can go through all translated languages
   */
  _.each(aboutThisStealth.opt.lang, (newLanguage) => {
    it(`Pulls correct language config file after dynamically switching to language: ${newLanguage.name}`, () => {
      aboutThisStealth.action.changeLanguage(newLanguage.code)
      if (Cypress.env('languageSet').includes(newLanguage.code)) {
        const defaultLanguageText =
          env.allLanguages[Cypress.env('language')]['SmartPrompt.done']
            .defaultMessage
        aboutThisStealth.doneButton().should('contain', defaultLanguageText)
      } else {
        cy.readFile(
          'cypress/fixtures/data/language/' + newLanguage.code + '.json'
        ).then((config) => {
          env.allLanguages[newLanguage.code] = config
          const defaultLanguageText =
            env.allLanguages[newLanguage.code]['SmartPrompt.done']
              .defaultMessage
          aboutThisStealth.doneButton().should('contain', defaultLanguageText)
        })
      }
    })
  })
})
