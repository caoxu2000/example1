// page objects
import { instrument } from '@pom/instruments'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'

// static data
import { util } from '@util/index'
import { api } from '@fixtures/api-routes'
import { instruments } from '@fixtures/instruments'

// test variable
const tools = [
  instruments.straightProbe,
  instruments.fourtyFiveDegFrontalSuction
]

describe('Requirement Number: 11-1, Juno Requirement ID: CR101415', () => {
  // TODO: b/c of the bug: JUNO-24717 we made code change below. Will revert it back once it's resolved.
  // JUNO-24744 is created to track that work
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.standardFess)
    menu.action.clickInstruments()
  })

  after(() => {
    util.exit()
    cy.request(api.logout)
  })

  // TODO: JUNO-19164 Currently there is a bug in the app (JUNO-22550). Once the bug is fixed, will update the assertions to check both Primary
  // and Secondary Text of the instrument been added to the procedure.  Currently this test only checks Primary Text
  tools.forEach((tool) => {
    it(`TC_AddInstrument_ENT_StandardFess-${tool.name}: verify ${tool.name} can be added to procedure`, () => {
      instrument.task.action.clickInstrumentCategory(tool.category)
      instrument.task.assert.isToolInProcedure(tool, false)
      instrument.task.assert.isToolInAvailable(tool, true)

      instrument.task.action.addAnInstrumentToProcedure(tool)
      instrument.task.assert.isToolInProcedure(tool, true)
      instrument.task.assert.isToolInAvailable(tool, true)

      instrument.task.action.removeAnInstrumentFromProcedure(tool)
      instrument.task.assert.isToolInProcedure(tool, false)
      instrument.task.assert.isToolInAvailable(tool, true)
    })
  })
})
