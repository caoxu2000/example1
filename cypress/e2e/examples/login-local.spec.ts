import { login } from '@pom/login'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'

describe('Login - local auth', () => {
  beforeEach(() => {
    // log into the application and exit the procedure to ensure Select Procedure will be reached upon login in test
    util.auth.login()
    util.exit()

    // log out of procedure before visiting page to land on login page
    util.auth.apiLogout()
    cy.visit('/')
  })
  it('Login : success', () => {
    login.action.submit({ user: 'stealth', secret: 'stealth' })
    util.assert.urlIs(guiRoutes.selectProcedure)
  })

  it('Login : fail', () => {
    login.action.submit({ user: 'stealth', secret: 'bad password' })
    util.assert.urlIs(guiRoutes.login)
  })
})
