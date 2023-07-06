import { login } from '@pom/login'
import { procedure } from '@pom/select-procedure'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

describe('Login - local auth', () => {
  beforeEach(() => {
    // log into the application and exit the procedure to ensure Select Procedure will be reached upon login in test
    util.auth.login()
    util.exit()

    // log out of procedure before visiting page to land on login page
    util.auth.apiLogout()
    cy.visit('/')
  })

  it('Login and Select Procedure', () => {
    // submit the login form
    login.action.submit({ user: 'stealth', secret: 'stealth' })
    util.assert.urlIs(guiRoutes.selectProcedure)

    // select the procedure
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
  })
})
