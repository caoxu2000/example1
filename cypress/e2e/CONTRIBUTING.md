# End to End testing (e2e)

## File structure
- System Test files
    - Located in the `cypress/e2e` folder and are suffixed with `.spec.ts`
    - Examples of feature specific POMs are in the 'cypress/e2e' folder and are suffixed with '.spec.ts'
    - System Tests will be housed in a new folder `cypress/e2e/system/`
    - Naming convention is create a folder `<feature-name>` and then create `<test-name>.spec.ts` for the system test automation files

- Page-objects
    - Located at `cypress/pom/`
    - Represent the objects on the page that actions and asserts will be centered around
    - `cypress/pom/<page-or-component-name>/`
      - `index.ts` - aggregator of poms, exports single `pageName` object enabling `'@pom/page-name'` imports
      - `<component>.objects.ts` - wrap cypress selector functions that return front-end elements
      - `<component>.actions.ts` - utilize exported objects to encapsulate user behavior
      - `<component>.asserts.ts` - perform pre-defined, assertions for the page component

## Test Code Development Best Practices
- While drafting and reviewing your code, try to keep your code lean and keep from using unnecessary functions.
- Test structure - Use `describe()` to call out a major portion of a system test, while the `it()` is for small tasks within that `describe()` function. This makes it easier to log and debug what `it()` or `describe()` is failing.
  - Include the Requirement ID in the `context()` wrapper prior to `describe()`. The `it()` will review the test steps themselves.
  - Do not include the Requirement text in the code.
- Comments - Minimize comments unless something in the code needs clarification, e.g. workarounds, not clear function purpose.
  - Work with otto engineer if you need better self-explanatory POMs to cut down on comments in the code for review purposes.
- Semi-colons and quotations - semi-colons are ommitted from the code, and use single quotation marks as a standard.
- TO-DO section - The commented out TO-DO section is for ideas for improvement, blocked issues, workarounds, etc.:
```javascript
    // TO-DO:
    // External DICOM transfer of Images
    // Test SSO
    // Take out workaround for page load
```
- The `before()` function - This will create a general clean system function that will exit the procedure. For most system tests, this will be part of the normal workflow at the beginning of your code for a clean state.
```javascript
    before(() => {
        util.cleanPatientDb()
        util.exit()
        cy.visit('/')
```
- Pre-conditions - For your test, consider what should be a pre-condition that lives in the `before()` portion.
- String constants - Work with an otto engineer if using the same string constant multipe times. This could mean it is better stored in a standard util folder that in the test.
- POMs - If you find yourself calling out the same function or workarounds, this should be moved into a POM function. You can do this or work with an otto engineer.
- `cy.wait()` - Waits should be last resort to get the tests to work, along with a comment explaining this in the code. It can put in the script during development, but work with the otto engineer to figure out if there can be a wait in the POM function.

## MR Requests
When creating a merge request - try to include:
- Merge Review overview -  This is where you should give a summary of what the MR is doing, each of the test cases and/or other files you want to add to support your tests.
- Documented evidence which include any logs, screen recordings, and Helix TCM (once it is determined how to create and maintain this for mapping).
  - To record a video of your cypress test running, do the following command in the terminal -
  npm run cypress:run "./cypress/e2e/system/<feature_folder>/<your_test_file.ts>"
  - This will then be saved in your report folder at `./cypress/out/individual_runs/<datetime>/videos`.
