# Juno Automation Framework (JAF)

# Architecture

The Juno Automation Framework utilizes [`Cypress.io`]('https://www.cypress.io') with a "lean page object" model that places an emphasis on modeling user actions among individual page components rather than modeling pages in an object oriented fashion. The approach is based off the article [Page Objects That Suck Less](https://johnfergusonsmart.com/page-objects-that-suck-less-tips-for-writing-more-maintainable-page-objects) by John Ferguson Smart, author of `Modern Agile Test Automation Playbook`.

The following key conventions achieve the described _lean pom_ architecture:

- Test files are located in the `cypress/e2e` folder and are suffixed with `.spec.ts`
- Page-Objects:
  - Design pattern for creating an object repository of DOM elements, which are then used in multiple tests for reduced code duplication
  - Located at `cypress/pom/`
  - Split across related sets of files : `<pom-name>.objects.ts`, `<pom-name>.actions.ts`, `<pom-name>.asserts.ts` 
  - Always roll-up to be exported via one `index.ts` file. See the `cypress/pom/images` directory as an example.
  - Each object has a type alias which can be used to relate objects to each other by including the type as a parameter to other objects.

### File structure:
- `cypress/e2e/` - All files should be in kabob-lower-case. 
  - `<page-name>.spec.ts` - Test specification files must include `.spec.` in the name. These files import poms, execute actions and assertions. 
- `cypress/pom/<page-or-component-name>/`
  - `index.ts` - Aggregates pom objects to single exported `pageName` object enabling aliased `'@pom/page-name'` imports to the spec file
  - `/type/<component>.ts` - Type alias definition for objects
  - `<component>.objects.ts` - Wraps cypress selector functions that return front-end elements
  - `<component>.actions.ts` - Actions are functions used to perform either complex actions or a series of actions on the page through manipulating objects. Simple actions can be performed directly on the object,  more complex actions will be used in all tests except one per feature, which will use objects in order to comprehensively test the GUI.
  - `<component>.asserts.ts` - Most assertions should be written with [Cypress.Chai](https://docs.cypress.io/guides/references/assertions#Chai) library directly in the `spec` file instead of abstracting to  the `pom.asserts` file which is intended more for non-standard, complex or compound assertions.
  - `<component>.options.ts` - The options file contains all of the values used to configure the application, such as slider dropdown options, screw types, and robotic arm positions. These values are defined within the application and used to change the state of the application.

## Function Declaration

In general, use [function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) or [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#object_initializers) syntaxt to build poms. This syntax takes advantage of hoisting so function declaration order does not matter and ensures better error logging due to the function name being attached to the object.
That said, also feel free to use [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function#description) syntax where it makes sense (such as callbacks or helper functions), taking into account scope binding differences that can cause unexpected behavior such as [the issue described in the cypress docs](https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Avoiding-the-use-of-this) concerning the use of `this` within the `it()` fucnction.

## POMs In Use

The set of javascript objects defined as `poms` integrate with cypress in the following key aspects:

- Each plural named pom file should export a singular corresponding object (`object`, `action`, `assert`)
  - Prefer: images.`action.patient.`selectExam(), not: images.`actions.patients`.selectExam()
  - Creates consistency across pom objects such that if a user imports a `'@pom/page-name'` they know it will have at least a nested `object`, possibly `action`, and `assert` sub-object to work with.
- The `<pom-name>.objects.ts` files include references to a custom type alias for each front-end element. These typescript types are used as return and parameter types to create typed relationships among all objects.  

Example: A single exported object with typescript parent child relationship:
```javascript
/** cypress/pom/instruments/drawer.objects.ts **/
export const object = {
  toolCard(toolName: string): cyGui<pom.instruments.toolCard> {
    return object.rightPanel().findByText(toolName, { exact: true })
  },
  toolButton(toolCard: pom.instruments.toolCard): cyGui<pom.instruments.toolButton> {
    return cy.wrap(toolCard).children().findByText('TOOL', { exact: true })
  }
}
```
Example: Within the spec file, DOM element relationships are further expressed through `pom` use where a particular `toolButton` is depenent on the selected `toolCard`:
```javascript
/**  cypress/e2e/examples/instruments.spec.ts **/
instrument.drawer.toolCard(toolName).should('exist')
  .then(($toolCard) => {
    instrument.drawer.toolButton($toolCard).click()
  })
```
## Utilities
Two sets of utilities, one javascript with access to cypress, and the other written in Node with access to the file-system. 
- `cypress/util`
  - Access to the Cypress `cy` object and javascript run-time
  - May call Node utilities via `cy.task`
- `util` 
  - Set of Node functions
    - @todo - in progress:
        - Migrate node functions to [system-test-util](https://code.medtronic.com/ET/te/system-test-util)
        - Udpate to newer module syntax instead of commonJs
        - Update Cypress to import this library


## Referencing long variables 

In test specs , nested variables may become too long when accessing a specific parameter. 

example: equipment.opt.equipment.camera.connectionInfo.DISCONNECTED.error

To maintain the readability and cleanliness of the test spec, for such variables:

-  `Check the structure of the options file`\
Try to keep it simple and avoid nesting whenever possible.

- `Declare it as test variable at the top of the spec if used more than twice`\
If the nested variable is used in the spec more than twice, save the nested variable as a constant and reuse this declared variable throughout the spec.\
\
example: const cameraError = equipment.opt.equipment.camera.connectionInfo.DISCONNECTED.error\
\
If the nested variable is NOT used in the spec more than twice, do not save it as a constant in order to avoid unnecessary declarations and confusion.

- `Check the changes made by the linter`\
If the linter is breaking a single nested variable into multiple different lines, it is better to declare the nested variable as a test variable as shown above (in `Declare it as test variable at the top of the spec`). 


## Testing-Library.com for DOM queries

The [Testing-Library.com Cypress plugin](https://testing-library.com/docs/cypress-testing-library/intro/) is installed and its dom queries are preferred over the the standard `cy.get()` due to the following benefits:

- Standardized helper functions with targeted element filters (by role, by label, etc)
- Displays nicely in Cypress visual logs and IDE intellisense
- Assertions built in such that if exact match, or multiple elements are found an error will be thrown

The main documentation is not `Cypress` specific and covers more than is available within the plugin. Utilze the [cheatsheet](https://testing-library.com/docs/dom-testing-library/cheatsheet/) and [query functions](https://testing-library.com/docs/queries/about) docs.

# General Syntax

- Files and folders named in kebab-case (dash separator for compound file/folder names)
- Functions and variables use camel case as defined at [google.github.io/styleguide/jsguide](https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined)

## Comments with JSDoc

Use JSDoc comments to describe functions.

- JSDoc comes bundled with the Vs Code IDE and provides rich IntelliSense
- JSDoc comment snippet comes by typing `/**` above a function
- The first line in the comment is the description and all functions should include it
- More info:\
   https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support \
   https://jsdoc.app

## Trailing slashes are always omitted

When defining a path variable, always leave the trailing slash off.

```javascript
// incorrect:
const path = "/path/to/thing/"
// correct:
const path = "/path/to/thing"
```

## Semicolons are omitted
Javascript performs automatic semicolon insertion which makes the semicolon terminator optional except for a few edge cases that can be avoided.\
ref: https://flaviocopes.com/javascript-automatic-semicolon-insertion

### Best practices from the article:
 - Be careful with return statements. If you return something, add it on the same line as the return (same for break, throw, continue)
 - Never start a line with parentheses, those might be concatenated with the previous line to form a function call, or array element reference

## [ x ] Mochawesome Reporter
- The reporter is intended to run with CICD pipeline, the reports save on `cypress/reports` folder by default
- Default reporter is set in `cypress.json`
- To generate report against a spec file use: 
  ```javascript
    // Run specific file:
    npm run cypress:run "./cypress/e2e/examples/select-procedure.spec.ts"
    // Or use pattern matching:
    npm run cypress:run "./cypress/e2e/examples/select*"
    
    // Or using a headed browser:
    npm run cypress:run-headed "./cypress/e2e/examples/select*"
  ```
- for more reporter options, visit `https://www.npmjs.com/package/cypress-mochawesome-reporter`

# Merge Requests (MR)
We follow `C-712 Software Code Review Minutes` guidelines for our code reviews - please review the document and its Appendixes prior to your first MR (both as owner as well as reviewer).
For MRs that need Quality Engineering review please also read the QE review guidlines in the [NPI Quality SharPoint site](https://medtronic.sharepoint.com/sites/NPIQualityNavigation) Stakeholder Communication section  .
When creating the Merge Request, Please use the system test MR template, the template will pre-populate a description that includes many of the needed information fields to fill out.
Before adding reviewers to your MR please review your own code and make any updates based on these guidelines and best practices.
### MR Description
Every MR should have a description that contains the important inforamtion below as well as any specific information that is important to note, both for reviewers understaning of the context, or for future references.
- Title the MR with the relevent Jira issue number (`juno-#### or JUNO-####`) and the branch name (which should be short and informative)
  - Use the word `Draft` in the title to signify the MR is NOT ready for review - before you reviewed it yourself and made necessary updates.
  - Remove the word `Draft` from the title when the code is ready for review.
  - First add Test automation reviewers and when most comments from original reviewers are addressed, and the code is stable (no additional major code changes expected) add any necessary cross-functional reviewers (QE, SW, etc.)
- Include brief explaination of the changes introduced
- When adding or significantly refactoring a `.spec` file, upload a visual evidence of successful execusion such as a mp4 link of the succesful run, a successful pipeline run that includes the test, or an output log file (see the Reporter section in the CONTRIBUTOR document for instructions on how to generate). Update as needed upon major changes during the MR process.
- When adding a `.spec` file that is linked to requirement: 
  - Reference the test case or test approach and attach any documented evidence required such as log file, output screenshots, Helix test case, and link to test approach.
  - Reference the requirement number in the code, but do not include the exact requirement wording (requirements wording may change over the life of the product, and we want to maintain the PDR as the source of truth and we do not like out of date requirements wording to stay in the code). You may paraphrase requirements/tests  intent as needed to clarify the intent of the test.
- When complexity is higher than normal, note it in the description and/or add comments and explain for QA. You can add comments in the specific relevant file and line to clarify.
- Make sure to TEST your code, and explain how the code was tested (what was run, which software version/EB)
- If a test fails, create a JIRA defect and reference it in the MR description
### Roles
- *Asignee* is the MR Creator 
- *Approvers*:
  - When changes include spec files in `cypress/e2e/system`, 1 Otto, 1 QE
  - When changes include only non-spec files (poms, configs, infrastructure, etc) 2 Otto
    - Changes to example spec files in `cypress/e2e/examples` are considered infrastructure
    - One test automation engineer will be the designated main reviewer/approver (Must be an authorized automation main reviewer)
  - Reviewers are 3rd party to the code they review (did not write the code themselves)
  - The reviewers will click approve button when they determine the code is ready for merge   
  - All Threads must be solved and the minimum required reviewers must approve code for it to be merged

### Conversation Threads
GitLab threads are used to make comments regarding the code
 - The assignee and Reviewers can use the threads or discuss offline to reach agreement on needed updates.
 - The assignee will make code updates or create and document follow up traceable actions to make sure concerns were or will be addressed.
 - The asignee shall not resolve the GitLab conversation threads - but they should notify reviewers when they address the comment (by either replying with a comment, thumbsup, IM, or the automated JIRA message that line was changed).
 - It is the reviewer's responsibility to review the change or follow up issue to make sure it addresses their concern.
 - Before the thread can be resolved, all reviewers that are part of the thread must confirm resolving with thumbs-up or comment.
 - The main approver is the ONLY one to mark threads as resolved.

### What to look for in reviews 
This is not an exaustive list, but a list of topics to consider. Additional topics can be found in `C-712 Software Code Review Minutes`
  - Was the code tested on a recent Clinical Application Engineering Build?
  - Ensure changes don't break other tests that share the code (by analysis and testing)
  - Ensure Acceptance Criteria is met, linter errors and warning are resolved, and the code behaves as intended, create and reference follow up Jira issues as needed
  - Ensure code logic is correct  
  - Does the code under review respect coding conventions? 
  - Are units of numeric data clearly stated? 
  - Is the code commented appropriately?
  - Is the code readable and clear? Is there a simpler way to implement?
  - Have any code changes negatively impacted future maintainability of the code?
  - Is logging used appropriately? Will test errors be easy to debug for application and/or script issues?
  - Is there good error catching?
  - For common methods, have error handling of possible misuses been considered?
  - Does code functionality already exists / No code duplication
  - If any 3rd party code/libraries are used - will they need to be validated? Ensure Jira issues are created and tools are validated prior to any formal use
  - Has the code been examined for unintended infinite loops and infinite recursion?
  - Does the code make any assumptions about hardware or setup configurations? Is the setup checked?
  - Has error handling code been tested?
  - Are there extensive comments that might get outdated that should be removed?
  - Were Jira issues created for any needed follow up work (and referenced as a comment in appropriate places)?
  - Should any tests (or example tests) be added to the smoke suite or to the system test CI pipeline for regression? (and include an update to add)
Questions specific to tests reviewes: (for tests that will be used formally in protocols, and/or are traced to requirements)
  - Is the output documented evidence sufficient?
  - Does the test verify the requiremnt under test (or part of it)?
  
# Dev-Mode
The front-end `GuiWebServer` project can serve a development build of the react app to a different URL which enables breakpoints to be added via the [chrome dev-tools](https://developer.chrome.com/docs/devtools/javascript/#line-breakpoint) interface.

To point Cypress to the `GuiWebServer` development URL, edit the [cypress.env.json](./cypress.env.json) > `build` property to `"dev"` which will change the baseUrl for all test executions. Next, be sure the stealth application is running and GuiWebServer is started separately with [npm run dev-start](https://code.medtronic.com/ET/juno/GuiWebServer#dev-start).


