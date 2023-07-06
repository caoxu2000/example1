# ADR: When to use actions as opposed to objects

## Context

The current POM structure has objects and actions. This Architectual Decision Record provides a general guidance on how to use them in system tests repository.
Objects are the basic building blocks of POMs; they are functions that would query the DOM structure of the webpage and return DOM HTML elements. Other functions can then be chained off of them in order to perform simple actions, such as click or clear. Actions are functions used to perform either complex actions or a series of actions on the page through manipulating objects.

### When to use Actions vs when to use Objects

Actions should be used in all tests; the only exceptions are the one test per feature which will directly test the elements of the GUI. Those tests will use the objects related to the feature under test to ensure each aspect of the feature's behavior and workflow are as expected. For example, for the Images task, the Images POM actions will be used for all test cases except one; that one test will use the Images POM objects to test each individual click, slide, etc. Using actions for the majority of tests not only drastically reduces the amount of code in each test, it also abstracts the details of the implementation of each user action away from the test, thereby decreasing the number of places said implementation would need to be updated if it changed and create more behavioral driven tests from a user perspective.

Example 1: the `restartReg()` action allows two intercepts to be abstracted away from the test, thereby reducing the complexity of the code and the number of places the intercepts would need to be updated if they changed.

```

// cypress/e2e/examples/manual-registration.spec.ts

  it('Send image points and touch points using rabbit messaging, proceed to navigation', () => {

    ...

    registration.action.restartReg()

    ...

  })

```

### Actions vs Objects in the single GUI test spec

Within the single test per feature that is meant to test the details of the feature, both objects and actions can still be used. In general, objects should be used at least once for each possible user action. For example, in Images, the user can search for patient exams; this should be tested using the individual objects for the Media tab, the Search bar, the Search button, the Download button, etc, rather than by using an action to complete the entire search and download process in one line. On the other hand, if a user action will be performed multiple times within the test, POM actions should be used after the first instance of that action is performed using objects. Actions can also be used for any steps that do not directly relate to the feature under test.

Example 1: these 3 objects: `clearSearch()`, `searchBar()`, `search()` are used in the test it() block where it's testing the download feature. They are also the detailed steps used to build out the `search()` action inside the `searchAndDownload()` action.

```

// cypress/e2e/examples/images.spec.ts

  it('Download from local media', () => {

    ...

    images.media.clearSearch().click()

    images.media.searchBar().type(patient.path)

    images.media.search().click()

    ...

  })

```

Example 2: the `searchAndDownload` action is being used here because the test is not about the Images task, but instead about the Annotations task, which is why using actions to reduce the lines of code is preferred.

```

// cypress/e2e/examples/annotations.spec.ts

  before(() => {

    ...

    images.media.action.searchAndDownload(patient.examList.mr)

    ...

  })

```

## Decision

Actions will be used in all tests except one per feature, which will use objects in order to comprehensively test the GUI. Assume the use of actions unless explicitly told otherwise. In the tests that primarily use objects, actions may be used for steps that are repeated multiple times, as well as for steps that do not directly relate to the feature under test.

## Status

Proposed by Xu Cao, 2023-01-04
