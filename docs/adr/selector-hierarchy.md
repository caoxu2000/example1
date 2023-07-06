# ADR 5: Selector Hierarchy

## Context

HTML elements have may multiple attributes, including roles, test ids, and classes, all of which can be used by Cypress to select the elements. Text may also be used to select an HTML element. However, not all attributes, or selectors, can be used in every situation, and some selectors provide more value than others. Therefore, a selector hierarchy is needed to determine when to use which selector. The selectors most commonly used in this repository are arranged below from most preferred to least preferred. Most selectors used come from the testing library, https://testing-library.com/docs/queries/about.

### `findByRole`

#### Description

- Format: `findByRole(role, { name: name, exact: true })`
- Example: `findByRole(‘button’, { name: ‘DELETE’, exact: true })`
- This is used to select an element by its role, e.g. button, textbox, etc
- The name can either be the text of the element or the aria-label of the element
- Using { exact: true } contributes to the correct element being selected by disallowing the selection of partial matches
- See https://www.w3.org/TR/html-aria/#docconformance for a list of aria roles

#### Justification of Preference

- Roles are the most preferred selector because they ensure the correct type of element is being selected while decreasing the risk of failure due to the presence of multiple matching elements – for example, an exam card shows the name of the exam twice, once at the top of the card and once in the edit name textbox; using findByRole(‘textbox’, { name: examName, exact: true }) ensures only the textbox will be selected
- Using the text of the element as the name also ensures that any changes to the text of the application will be caught
- `findByRole` has clear logging, which makes it easy to see what is being selected and whether it is the desired element
- See ADR 1: Using FindByRole As Opposed to FindByText for further discussion on the benefits of using roles

### `findByText`

#### Description

- Format: `findByText(text, { exact: true })`
- Example: `findByText(‘Demo Lee’, { exact: true })`
- This is used to select an element by its text
- Using { exact: true } contributes to the correct element being selected by disallowing the selection of partial matches
- Often used to search for an element within a parent element, e.g. searching for the element containing the text 'Demo Lee' within a patient card

#### Justification of Preference

- Using the text of the element ensures that any changes to the text of the application will be caught
- `findByText` does not check for the type of an element or anything else other than its text, so it is possible to select the wrong element when there are multiple instances of the text on the page
- While not as robust as `findByRole`, `findByText` still has clear logging that clearly shows what text is being selected for, making it easier to determine whether the correct element is being selected

### `findByTestId`

#### Description

- Format: `findByTestId(testId)`
- Example: `findByTestId('gear-control-button')`
- This is used to select an element by its data-testid attribute
- Generally used for elements that do not have text and also cannot be given aria-labels, such as the right panel or slider values


#### Justification of Preference

- Test ids allow elements to be selected without relying on classes, which are brittle selectors because they change extremely frequently
- Test ids do not need to change with the GUI, meaning defects and issues may be missed by using them
- `findByTestId` logs which test id is being selected for, but that does not inherently give any indication of whether that is the correct element; rather, it depends on the test id itself being descriptive enough to give that information


### Classes (via `get`, `find`, `parents`, `siblings`)

#### Description

- Examples: `get('.status-next')`, `find('.card-container')`
- Classes can be used with any Cypress query, including `get`, `find`, `parents`, and `siblings`
- Classes are almost always auto-generated based on the CSS of the element
- The class name is prepended with a period (.) to indicate that it is a class


#### Justification of Preference

- Classes are brittle selectors because they are closely tied to CSS styles, which change frequently - a single pixel change will change the class of an element, which then breaks every Cypress test that uses the old version of the class
- Updating objects that use classes every time the class changes requires significant overhead and slows down development
- Classes are not descriptive, so when running tests, it is unclear in the logs what is being selected and whether that is the correct element

## Decision

`findByRole` will be the preferred selector for elements whenever possible. If it cannot be used, `findByText` and `findByTestId` will be used. `findByText` and `findByTestId` can also be used in conjunction with one another to ensure the correct element is being selected. Classes should be avoided as much as possible due to their brittle nature. There are also other selectors in the testing library, such as `findByDisplayValue` and `findByPlaceholderText`, that may be used in specific instances when the preferred selectors cannot be used (for example, when grabbing the username and password fields on the login page, `findByPlaceholderText` may be used since the element has no role and no text, but has the placeholder text of 'username' and 'password').

## Status

Proposed by Sabina Ula, 2022-12-09