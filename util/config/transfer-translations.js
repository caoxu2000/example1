const cp = require('child_process')
const fs = require('fs')
const Diff = require('diff')
const path = require('path')
const pathToLanguage = '../../cypress/fixtures/data/language'
/**
 *  @description Checks that each translation in the file has a default message
 *  @param {Object} language The contents of the translation config for one language
 *  @return {Array <string>} missingWords: list of words that don't have descriptions
 */
function checkValid(language) {
  const missingWords = []
  for (const word in language) {
    if (language[word].defaultMessage === undefined) {
      // store which ones don't work, then return it in error
      missingWords.push(language[word])
    }
  }
  return missingWords
}

/**
 *  @description Create a mapping of locale code to name and writes that in the cypress test folder as locales.json
 *  @param {Object} countries dictionary with all of country locale codes and names
 *  @return {Object} string of locale code to country name mapping
 */
function createLanguageMap(countries) {
  const dict = {}
  for (const country in countries) {
    if ({}.hasOwnProperty.call(country, countries)) {
      const innerValue = {
        code: countries[country].id,
        name: countries[country].label
      }
      dict[countries[country].id] = innerValue
    }
  }
  return JSON.stringify(dict)
}

/**
 *  @description Check for any words that have been added/removed from the language config files
 *  @param {Object} oldFile The old language.json from the test folder
 *  @param {Object} newFile the new language being compiled into the system test folder
 *  @param {string} lang the language code for the language file currently being checked
 */
function findNewWords(oldFile, newFile, lang) {
  const differences = Diff.diffJson(oldFile, newFile)
  differences.forEach((part) => {
    if (part.added) {
      console.log(
        'WARNING: ' + part.value + ' has been added to the language: ' + lang
      )
    }
    if (part.removed) {
      console.log(
        'WARNING: ' +
          part.value +
          ' has been removed from the language: ' +
          lang
      )
    }
  })
}

/**
 *  @description Copies each language config file from GuiWebServer
 */
;(function transferFiles(
  PATH_TO_GUIWEBSERVER = path.resolve(
    __dirname,
    '../../../StealthApplication/GuiWebServer'
  )
) {
  if (!fs.existsSync(PATH_TO_GUIWEBSERVER)) {
    throw new Error(
      'ERROR: You must situate the system-test folder to be outside of StealthApplicaiton to run'
    )
  }

  const pathToLang = path.resolve(PATH_TO_GUIWEBSERVER, 'src/translations/lang')
  let src = path.resolve(pathToLang, '../locales.json')

  const rawData = fs.readFileSync(src)
  const countries = JSON.parse(rawData)

  const locales = createLanguageMap(countries)
  const dest = path.resolve(__dirname, pathToLanguage, 'locales.json')
  fs.writeFileSync(dest, locales)

  let languageCount = 0
  for (const country in countries) {
    if ({}.hasOwnProperty.call(country, countries)) {
      if (countries[country].id !== 'en') {
        src = path.resolve(
          pathToLang,
          'translated',
          countries[country].id + '.json'
        )
      } else {
        src = path.resolve(pathToLang, 'extracted/en.json')
      }

      const fileDest = path.resolve(
        __dirname,
        pathToLanguage,
        countries[country].id + '.json'
      )
      const oldFile = JSON.parse(fs.readFileSync(fileDest))
      const readSrc = JSON.parse(fs.readFileSync(src))

      findNewWords(oldFile, readSrc, countries[country].id)

      const missingWordList = checkValid(readSrc)
      if (missingWordList.length === 0) {
        fs.copyFileSync(src, fileDest)
        languageCount += 1
      } else {
        throw new Error(
          'ERROR: ' +
            src +
            ' is not a vaild file. It is missing information for the following translations: ' +
            missingWordList
        )
      }
    }
  }

  const commitVersion = cp
    .execSync('cd ../StealthApplication \n git rev-parse HEAD')
    .toString()
    .trim()

  console.log(
    languageCount +
      " languages were written to 'fixtures/data/language' in the system test repo. \n Files were copied from " +
      'guiWebServer application commit: ' +
      commitVersion
  )

  console.log('All language configuration files have been written.')
})()
