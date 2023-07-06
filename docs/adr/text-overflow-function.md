# ADR 2: Catching Overflows with `checkOverflow()` Method

## Context

A big problem, especially within translations, is making sure that text remains readable to the user, and overflowing text can make this difficult or impossible. To account for this, methods located in `cypress/util/checkOverflow.ts` will be used to check for overflows. According to the design specifications from S8, which are planned on carrying over to JUNO, static UI elements (such as the text on a button) should never have any text overflow. Therefore, the `checkOverflow` method checks for the sizes of the elements, and fails the test if the text is overflowing at all, regardless of whether or not it is blocking other text/is cut off the screen, with the only exception being if there is a scroll-bar present (since a scroll bar being present would mean that longer text is expected there).

The design specifications also state that for user-inputted information that is too long, the text should be cut off with an ellipsis to show that there is more text than what is being shown. The method `checkUserTextOverflow` checks for this by checking for overflow (similar to the `checkOverflow` method), and if there is an overflow checks for the presence of ellipsis within the css formatting of that element.

Because these overflow functions are checking for overflow of the boundaries for the text, the functions are only applicable for testing overflows on texts with fixed-sized containers. For text within dynamic containers, the `checkOverflowInDynamicContainers` function can be used. This function checks the size of the text in comparison to the size of the text's parent element. By doing this, there are concrete boundaries that can be used to limit the size of the text. For certain elements, such as text within the heading bar, the parent element may be larger than we want, such as the header bar being bigger than what we'd want to check with small pieces of text in the heading. Therefore, this function may not be applicable for all elements with dynamic containers, but it is useful for certain elements within the application.

As a result of this checking method, the overflow assertion will fail if there is any overflow for text within a fixed-size container, regardless of whether or not the overflow impacts the user experience. While this will create some failed tests that are trivial (since the problem does not necessarily impact the application's use), this more rigorous checking will keep more overflows from being missed, improving the overall testing capability for overflows.

The methods are being added to the util folder to make them accessible to all spec files that will be checking for overflows. Additionally, their location consolidates all overflow-related code to a single file. Because of this organization, in order to avoid errors caused by mixing synchronous and asynchronous code the object being checked for overflow must be found first, with the overflow then checked within a chained `.then()` statement to ensure the object has been found when being checked for overflow. For example of what this looks like, see `text-overflow-poc.spec`

## Decision

We will use the overflow methods as described above for checking objects for text overflow.

## Status

Proposed by Allison Palmer, 2022-8/18

## Consequences

### Pros
- CheckOverflow function adds clarity through logs for when an overflow is occuring
- Text overflows will be consistently caught within the tests, making it easier to know which objects need to be adjusted to remove the overflow issue
- Shifting existing code base to include checkOverflow is a fairly simple change, with adding this function to each object


### Cons
- Overflows that do not obstruct the text will still be caught as overflows, creating additional failed tests for cases that are permissible.
- The current overflow functions do not necessarily catch all overflows (this is dependent on the HTML format of each text string)
- CheckOverflow function must get added to every object being tested for overflow which might muddy up code