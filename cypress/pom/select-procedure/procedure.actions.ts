import { object } from './procedure.objects'
import { procedure } from './procedure.options'
import { pom } from './type/procedure'
import { cyGui } from '@util/type/cyGui'

export const action = {
  /**
   *  Selects a procedure
   * @param {procedure} procedure
   * @param {string} surgeon defaults to 'Standard Profile'
   * @return {cyGui<pom.procedure.procedure>} returns the clicked procedure button
   */
  select(
    procedure: procedure,
    surgeon?: string
  ): cyGui<pom.procedure.procedure> {
    object.anatomy(procedure.anatomy).click()
    object.surgeon(surgeon).click()
    return object
      .procedure(procedure.name)
      .click()
      .then(() => {
        // TODO: JUNO-15658 temporary timeout to make sure that the next page has loaded (we can't wait for a specific element since we are routed to different pages)
        cy.findByTestId('selected-procedure-name', {
          exact: true,
          timeout: 8000
        })
          .should('have.text', procedure.name)
          .and('be.visible')
        // TODO: Fix the procedureRouteIs assert so that it accounts for going to instruments vs images with the Oarm
        // assert.procedureRouteIs(procedure)
      })
  }
}
