/**
 * Checks for an exact match of text on any HTML element
 *
 * Note: most of our object selectors already rely on an exact match of the display value.
 * This function will likely never be used and mostly serves as an example for an assert
 * that is generic enough to be used globally.
 * @param {JQuery<HTMLElement>} selected Any cy.get() return value
 * @param {string} name Text on element
 */
export function labelIs(selected: JQuery<HTMLElement>, name: string): void {
  const exactLabelMatch = `^${name}$`
  cy.wrap(selected, { log: false })
    .contains(new RegExp(exactLabelMatch, 'ig'))
    .then(() => cy.log(`Exact Match:${name}`))
}
