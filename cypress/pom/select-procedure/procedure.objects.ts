import { Anatomy } from './procedure.options'
import { cyGui } from '@util/type/cyGui'
import { pom } from './type/procedure'

export const object = {
  /**
   * Selects the anatomy card according to the button text
   * @param {Anatomy} name name of anatomy being found
   * @return {cyGui<pom.procedure.anatomy>} anatomy card for selected anatomy
   */
  anatomy(name: Anatomy): cyGui<pom.procedure.anatomy> {
    const sentenceCase =
      name !== Anatomy.ENT
        ? name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
        : name
    return cy.findByText(sentenceCase, { exact: true })
  },

  /**
   * Selects the Surgeon from the visible dropdown of an anatomy card
   * @param {string} name name of surgeon
   * @return {cyGui<pom.procedure.surgeon>} button for specified sugreon
   */
  surgeon(name = 'Standard Profile'): cyGui<pom.procedure.surgeon> {
    return cy.findByRole('menuitem', { name: name, exact: true })
  },

  /**
   * Selects the procedure from the nested surgeon menu
   * @param {string} name name of procedure
   * @return {cyGui<pom.procedure.procedure>} button for desired procedure
   */
  procedure(name: string): cyGui<pom.procedure.procedure> {
    return cy.findByRole('menuitem', { name: name, exact: true })
  }
}
