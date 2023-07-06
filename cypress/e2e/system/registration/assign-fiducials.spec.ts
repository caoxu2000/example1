import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'
import { images } from '@pom/images'
import { registration } from '@pom/manual-registration'

import { util } from '@util'
import { alias } from '@util/type/cy-alias'
// TODO: JUNO-24805 - For now Demo Lee has been used instead of DICOM
import { demoLee as patient } from '@fixtures/patients'
import { navPoints } from '@fixtures/regPoints'

describe('CR101304', () => {
  const navPoint1 = navPoints.demoLee1mmRegTouch[0]
  const navPoint2 = navPoints.demoLee1mmRegTouch[1]
  const navPoint3 = navPoints.demoLee1mmRegTouch[2]
  const navPoint4 = navPoints.demoLee1mmRegTouch[3]
  const navPoint5 = navPoints.demoLee6mmRegTouch[3]

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    images.media.action.searchAndDownload(patient.examList.ct)
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)
    menu.action.clickRegistration()
    // TODO: See JUNO-13101 - This wait is being used because the app goes to a black
    // loading screen without waiting. Investigate what is causing this and remove this wait.
    cy.wait(1000)
    // TODO: JUNO 28306 - Moving intercepts out of Registration
    util.intercept.addIntercept(alias.registrationTouchHelpImage)
    util.intercept.waitForIntercept(alias.registrationTouchHelpImage)
    registration.touch().click()
    registration.restart().click()
  })

  it('TC-CR101304-Sys-0010,  Verify that software allows touch order to be assigned for the auto-detected landmarks', () => {
    // Assert that touch order is not assigned to auto detected landmarks
    registration.assert.touchOrderNotAssigned()
    registration.action.assignOrderToAllLandmarks()
    // Assert that touch order has been assigned to the all auto detected landmarks
    registration.assert.touchOrderAssigned()
  })

  // TODO: JUNO-28217 - Can't manually define landmarks yet since we don't have views in the app
  it.skip('TC-CR101304-Sys-0020, Verify that software assigns touch order to each manually defined landmarks as they are created', () => {
    // registration.action.createTouchRegistration(
    //   imagePoints.demoLeeImagePoints,
    //   navPoints.demoLee1mmRegTouch,
    //   '0.6'
    // )
    util.defineNavTouchLocations(navPoints.demoLee1mmRegTouch)
    cy.wait(1000)
    // Assert that touch order has been assigned to the particular landmark
    registration.assert.touchOrderAssigned(1)
    registration.assert.touchOrderAssigned(3)
  })

  // TODO : JUNO-28654 Check if the verbiage of the verification point in TA has changed.
  // TODO: TODO: JUNO - 23669 - Clicking the patient card after initial selection causes the the next task to become disabled
  it('TC-CR101304-Sys-0030, Verify the software assigns an order to the auto detected landmarks as they are collected ', () => {
    registration.assert.touchOrderNotAssigned()
    registration.action.defineSingleNavTouchLocation(navPoint1)
    registration.action.defineSingleNavTouchLocation(navPoint2)
    registration.action.defineSingleNavTouchLocation(navPoint3)
    registration.action.defineSingleNavTouchLocation(navPoint4)
    registration.assert.touchOrderAssigned([1, 4])
    // navPoint5 is inaccurate and should pop up in yellow instead of green
    registration.action.defineSingleNavTouchLocation(navPoint5)
    registration.assert.touchOrderAssigned(5)
  })
})
