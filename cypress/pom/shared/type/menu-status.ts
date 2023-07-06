/**
 * @description a list of enabled or disabled tasks
 */
export type menuStatus = (() => Cypress.Chainable<JQuery<HTMLElement>>)[]
