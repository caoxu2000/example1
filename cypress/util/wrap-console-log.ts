const { _ } = Cypress
/**
 * Replaces each function wrapped with a log statement for the function name and parameters
 * @param {string} prefix - path from pom folder in object notation
 * TODO: JUNO-28002 Use better typing in docstring for pom and copiedPom than types any and T
 * @param {any} pom - pom object file
 * @return {T} copiedPom - modified pom object file
 */
export function wrapConsoleLog<T>(prefix: string, pom: any): T {
  // a deep copy is necessary here to avoid mutating the original pom objects which would affect the unwrapped methods
  const copiedPom = _.cloneDeep(pom)
  for (const func in copiedPom) {
    if (Object.prototype.hasOwnProperty.call(copiedPom, func)) {
      copiedPom[func] = _.wrap(copiedPom[func], (func, ...args) => {
        cy.log(`**pom.${prefix}.${func.name}**`, ...args)
        return func(...args)
      })
    }
  }
  return copiedPom
}
