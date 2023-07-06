# ADR 1: Using `FindByRole` As Opposed to `FindByText`

## Context

Cypress has multiple ways to access elements within the DOM. Two of these options, which are taken from the [cypress testing library](https://testing-library.com/docs/cypress-testing-library/intro/) are `findByRole` and `findByText`, which each have their own pros and cons.

### `findByRole`

#### Pros

- `FindByRole` has very clear logging, since it is able to log the role of the element (such as logging that a button has been selected). 
- By using the {name, exact} options (which in the systemTest repository is suggested), name and aria labels can be specified for elements being search for, improving the assurance that the element being selected is the desired one
- Because a role and name are being selected, the risk of finding multiple elements from a find command are very low, which lowers the chance of errors within the tests due to multiple elements with the same name.
- `FindByRole` inherently checks that the element has the correct role (button, etc.)
- `FinByRole` only looks at the single HTML element's name and not its children's text (unless using text with findByRole() - where the text is between the open and closing tags)

#### Cons

- `FindByRole` does not enhance our ability to catch any text overflow issues by itself. Therefore, an additional framework would have to be created to check for text overflows

### `findByText`

#### Pros

- `FindByText` can catch overflows in certain situations. Specifically, it can catch overflows when the element's position is fixed, and the element is being covered up by another DOM element or it is going off the screen.
- `FindByText` selects the smallest element with the text (such as a span of text within a button), allowing checks for text overflow to happen directly on the text element.

#### Cons

- `FindByText` misses all overflows that are not formatted as stated above such as if the position isn't fixed, which leads to a lot of missed overflows using this method. As a result, another method to catch text overflows would likely need to be created regardless. 
- Finding by text can lead to issues on pages where the same text appears on multiple pages. To account for this, find commands must be chained to get the desired element which decreases the readability of the code base.
- `FindByText` does not inherently check that an element has the correct role (button, etc.) which removes some of the assurance that the elements being selected are correct.
- `FindByText` checks both the HTML element's text and its children's text.

## Decision

We will use the `findByRole` to access elements within the DOM with the `name` option specifying the name of the element and with the `exact` option being true to do an exact match on the name.

## Status

Proposed by Allison Palmer, 2022-7-7

## Consequences

### Pros

- Clearer logging messages
- Lower concern for errors due to repeat elements on the page

### Cons

- A separate method must be created to catch overflows within the application, and that method would have to be explicitly executed on any piece of text