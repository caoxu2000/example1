import { menu } from '@pom/shared/menu'
import { procedure } from '@pom/select-procedure'

import { util } from '@util/index'
import { guiRoutes } from '@util/assert/config'
import { alias } from '@util/type/cy-alias'

describe('Main Menu Test', () => {
  // bypass gui and reset potentially cached app
  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    util.intercept.addIntercept(alias.authCheck)
  })

  /**
   * Example asserting expected menu values
   */
  it('Click Images', () => {
    util.intercept.waitForIntercept(alias.authCheck)
    menu.action.goToMenuTask(menu.opt.menuOptions.IMAGES)
    const enabled = [menu.images, menu.export]
    const disabled = [menu.plan]
    menu.assert.menuStatus(enabled, disabled)
  })
  /**
   * Example demonstrates that the menu.action(s) for the Admin section can be used at any
   * point in a test without knowing if the Admin section has already been opened by a previous
   * click of the admin menu.
   **/
  it('Click Each Admin', () => {
    util.intercept.waitForIntercept(alias.authCheck)
    menu.action.goToMenuTask(menu.opt.menuOptions.IMAGES)
    menu.action.goToMenuTask(menu.opt.menuOptions.EXPORT)
    menu.action.goToMenuTask(menu.opt.menuOptions.SURGEON)
    // TODO: Uncomment out the following line to go to Patient Admin once the page has been fixed: JUNO-15527
    // menu.action.goToMenuTask(menu.opt.menuOptions.PATIENT)
    menu.action.goToMenuTask(menu.opt.menuOptions.DICOM)
    menu.action.goToMenuTask(menu.opt.menuOptions.ABOUT_THIS_STEALTH)
  })
})
