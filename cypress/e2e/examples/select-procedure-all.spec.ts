import { procedure } from '@pom/select-procedure'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'

// utilities
const { _ } = Cypress

/**
 * Description:
 * Test all dropdown values with the default, Standard Profile
 */
describe('Select Procedure - All Procedures', () => {
  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
  })

  _.each(procedure.opt.availableProcedures, (proc) => {
    it(`${proc.anatomy} : ${proc.name}`, () => {
      procedure.action.select(proc)
    })
  })
})
