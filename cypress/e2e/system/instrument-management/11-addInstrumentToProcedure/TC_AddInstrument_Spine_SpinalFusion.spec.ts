// page objects
import { instrument } from '@pom/instruments'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'

// static data
import { util } from '@util/index'
import { api } from '@util/api-routes'
import { instruments } from '@global-config/instruments'

describe('CR101415', () => {
  // TODO: b/c of the bug: JUNO-24717 we made code change below. Will revert it back once it's resolved.
  // JUNO-24744 is created to track that work
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.spinalFusion)
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')
    menu.action.clickInstruments()
  })

  after(() => {
    util.exit()
    cy.request(api.logout)
  })

  // TODO: JUNO-19164 Currently there is a bug in the app  (JUNO-22550). Once the bug is fixed, will update the assertions to check both Primary
  // and Secondary Text of the instrument been added to the procedure.  Currently this test only checks Primary Text.
  it(`TC_AddInstrument_Spine_SpinalFusion: verify ${instruments.navLockGray.name} can be added to procedure`, () => {
    instrument.task.action.clickInstrumentCategory(
      instruments.navLockGray.category
    )
    instrument.task.assert.isToolInProcedure(instruments.navLockGray, false)
    instrument.task.assert.isToolInAvailable(instruments.navLockGray, true)

    instrument.task.action.addAnInstrumentToProcedure(instruments.navLockGray)
    instrument.task.assert.isToolInProcedure(instruments.navLockGray, true)
    instrument.task.assert.isToolInAvailable(instruments.navLockGray, false)

    instrument.task.action.removeAnInstrumentFromProcedure(
      instruments.navLockGray
    )
    instrument.task.assert.isToolInProcedure(instruments.navLockGray, false)
    instrument.task.assert.isToolInAvailable(instruments.navLockGray, true)
  })
})
