/**
 * Reassigns Cypress.Chainable for readablity and consistency across the automation framework POMS
 *
 * Both the cypress -> cy.get() and testing-library -> cy.find() queries return
 * a generic of type Cypress.Chainable<JQuery<HTMLElement>>.
 *
 * The cygui<> generic type should be used across all object acessssor files to return a custom type
 * named according to the chosen object name as described in the example.
 *
 * @example cygui<chkSelect> where the `chkSelect` type is a re-assigned JQuery<HTMLElement>>
 */

export type cyGui<T> = Cypress.Chainable<T>
