/**
 * @description Takes in the key value for text from the language config file and returns the translated version of the text
 * @param {string} phraseKey Phrase key used to find the translated text from within the language json files
 * @return {string} translated phrase in currently selected language
 */
export function translatedPhrase(phraseKey: string): string {
  return Cypress.env('allLanguages')[Cypress.env('language')][phraseKey]
    .defaultMessage
}
