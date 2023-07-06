import { registration } from '@pom/manual-registration'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'
import { images } from '@pom/images'
// TODO : JUNO-24805 :For now Demo Lee has been used instead of DICOM
import { demoLee as patient } from '@fixtures/patients'
import { guiRoutes } from '@util/assert/config'
import { CssColors } from '@global-config/CssColors'
import { util } from '@util'
import { alias } from '@util/type/cy-alias'

describe('CR101302', () => {
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
    // Select the procedure
    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    images.media.action.searchAndDownload(patient.examList.ct)
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
  })

  it('TC-CR101302-Sys-0010, Let the model generation and  the fiducial detection complete and verify that all fiducials are detected', () => {
    procedure.action.select(
      procedure.opt.availableProcedures.tumorResectionOptical
    )
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)
    menu.action.clickRegistration()
    // TODO: See JUNO-13101 to remove this wait - currently used to allow the registration page to finish loading
    cy.wait(500)
    // JUNO 28306 - Moving intercepts out of Registration
    util.intercept.addIntercept(alias.registrationTouchHelpImage)
    util.intercept.waitForIntercept(alias.registrationTouchHelpImage)
    // Assert that 10 fiducials are detected in Demo Lee exam
    registration.assert.numberOfLandmarksByColor(CssColors.LANDMARK_BLUE, 10)
  })

  it.skip('TC-CR101302-Sys-0020, Start a NexFrame procedure and import the same exam. Verify that all the fiducials are NOT detected and NOT displayed as landmarks', () => {
    procedure.action.select(procedure.opt.availableProcedures.nexframeDbs)
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)
    menu.action.clickRegistration()
    // JUNO-24987 - Juno Defect :Demo Lee exam shows 10 landmakrs instead of 0.
    // This is a workaround of not waiting till the exam completely loads.
    // JUNO 28306 - Moving intercepts out of Registration
    util.intercept.addIntercept(alias.registrationTouchHelpImage)
    util.intercept.waitForIntercept(alias.registrationTouchHelpImage)
    registration.assert.noLandmarksDetected()
  })
})
