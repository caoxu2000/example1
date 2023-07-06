import { procedure } from '@pom/select-procedure'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'

/**
 * Test a set of dropdown values with the default, Standard Profile
 */
describe('Select Procedure', () => {
  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
  })

  it('Cranial : Biopsy', () => {
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
  })

  it('ENT : Standard FESS', () => {
    procedure.action.select(procedure.opt.availableProcedures.standardFess)
  })

  it('Spine : Pelvic Trauma', () => {
    procedure.action.select(procedure.opt.availableProcedures.pelvicTrauma)
  })
})
