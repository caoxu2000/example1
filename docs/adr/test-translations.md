# ADR 3: Language Translations within Tests

## Context

The Stealth application can be run in many different languages, so there must be language integration within the existing testing suite. To make sure that the translations being tested match those being used in the application, the language configuration files are directly copied over from the application to the test directory. To get the translated config files into the cypress test framework: from `SystemTest` run: '`npm run language:make`. This runs the code within `util/config/transfer-translations.js` and copies the translated language files and a list of locale codes and names to `cypress/fixtures/data/language`, and logs any differences between the new and old language files into the console. To specify which language(s) will be used in the tests and to dynamically switch between languages, include each desired language code in the cypress environment variable `languageSet`. The combined language configs of languages specified in the `languageSet` list in the cypress environment are then added to the cypress environment variable `allLanguages` via code in `cypress.config.ts`, in the function `defineConfig()`, making the file usable from anywhere within cypress. It is important to note that the more languages are specified in `languageSet`, the larger the space needed in the cypress environment which can cause problems when trying to view the environment variables from the Cypress GUI.

To dynamically read languages that have not been specified, call `cy.readFile()` as shown in `translations.spec.ts`, being sure to wrap the rest of the code in a `.then()` to avoid issues with synchronous vs asynchronous code. Note that this approach is not preferred because it can lead to extra sync/async errors while also taking more time to read files mid-test. Instead, it is preferred to simply include all desired languages in the `languageSet` variable as described above.

To allow the test files to run in other languages, the following code structures must be followed:

#### Cypress Environment Variable
To select a language to run the tests in, change the `language` cypress environment variable within cypress.json into the target language code

#### Cypress Spec Files
To change the test to the target language specified within the cypress env, run the command `cy.setLanguage()` directly after`cy.visit()`.

#### POM Objects
POM objects utilize the new language options by using the `translatedPhrase(keyPhrase)` method found in `cypress/util/translated-phrase.ts`, which takes in the key phrase for the desired phrase from the json file and returns the translated version of the text. For an example of what this looks like, see `doneButton()` within `pom/about-this-stealth/about-this-stealth.objects.ts`.

The application is still in development, meaning that not every string is translated. Therefore, with each update of the application, it will be important to run the command `npm run language:make` (as explained above), and to change any newly-translated objects to use the dynamic language selection specified above.

This method for translating tests takes a bit of modifying existing tests. In return, it is highly flexible and will withstand changes being made to the application since the language files can be rebuilt, and the buttons are not found by any hard-coded values. Additionally, once implemented, this structure will be clear in what is happening in the code and is a fairly slim addition to the overall code base.

## Decision
The translation approach described above will be used to translate tests within the testing suite.

## Status
Proposed by Allison Palmer, 2022-7-14

## Consequences

### Pros
- Tests can be run in any language specified within guiWebServer
- Testing framework will be flexible to future changes both within the testing suite and from guiWebServer
- Code will be self-explanatory within the tests

### Cons
- Changes must happen within many files which could cause possible errors in updating the framework
- Updates will need to be made as more strings are translated to switch from hardcoded strings to the dynamic language selection