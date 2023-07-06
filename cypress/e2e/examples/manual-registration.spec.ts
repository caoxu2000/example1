import { registration } from '@pom/manual-registration'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'
import { images } from '@pom/images'

import { imagePoints, navPoints } from '@fixtures/regPoints'
import {
  demoLee as patient1,
  dicomTruDemoHead as patient2
} from '@fixtures/patients'
import { CssColors } from '@global-config/CssColors'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

describe('Example spec for the Manual Registration Task POMs', () => {
  const newLevelValue = '70'
  const newWidthValue = '200'
  const newPatientName = 'Patient 1'
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
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.media.action.searchAndDownload(patient1.examList.ct)
    // TODO: JUNO-24805 - update to use PACs import when functionality is added
    images.media.action.searchAndDownload(patient2.examList.ct)
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.thisStealth.action.selectExam(patient1, patient1.examList.ct.name)
    menu.action.clickRegistration()
  })

  // This test is skipped because the sliders don't update and will fail
  it.skip('Change exam level and width', () => {
    // Select adjust level/width button and edit level
    registration.adjustLevelWidth().click()
    registration.action.adjustLevel(newLevelValue)
    registration.action.adjustWidth(newWidthValue)
  })

  // TODO: JUNO-23273: This test is skipped because the settings do not update (even when selected manually) and will fail. Check these when the functionality exists.
  it.skip('Modify manual registration exam settings', () => {
    // Select settings button and change settings
    registration.gearControl().click()
    registration.editName().type(newPatientName)
    registration.editName().should('have.text', newPatientName)
    registration.action.updateColormap(
      registration.opt.Colormap.BONE_AND_VESSELS
    )
    registration.action.updateModality(registration.opt.Modality.MR)
    registration.deleteRegistration().click()
    registration.cancelDeleteRegistration().click()
    registration.deleteRegistration().click()
    registration.confirmDeleteRegistration().click()
    // TODO: JUNO-23723 - Add assert that non-current registrations delete when that functionality is available in the app
  })

  // TODO: JUNO-23723 - these buttons don't currently function - will need to be completed when the functionality is implemented.
  it('Click Edit Model, Change Image', () => {
    registration.editModel().click()
    registration.changeImage().click()
  })

  it('Send image points and touch points using rabbit messaging, proceed to navigation', () => {
    // click Touch, then assert that the page has refreshed
    // TODO: clicking TRACE first is a workaround to ensure that the touch tab fully loads
    registration.trace().click()
    registration.touch().click()
    registration.touchReady().should('exist')

    // Send navigation points that will result in high registration error, cannot proceed to navigation
    registration.action.createTouchRegistration(
      imagePoints.demoLeeImagePoints,
      navPoints.demoLee6mmRegTouch,
      '5.9'
    )
    registration.assert.touchpointColorIs(1, CssColors.TOUCHPOINT_YELLOW)
    registration.assert.touchpointColorIs(2, CssColors.TOUCHPOINT_GREEN)
    menu.mainToggle().click()
    menu.navigation().should('be.disabled')
    menu.mainToggleClose().click()

    // Send navigation points that will result in high registration accuracy, can proceed to navigation
    registration.action.restartReg()
    registration.action.createTouchRegistration(
      imagePoints.demoLeeImagePoints,
      navPoints.demoLee1mmRegTouch,
      '0.8'
    )
    menu.action.clickNavigation()
    util.assert.urlIs(guiRoutes.navigation)
    // TODO: See JUNO-13101 - This wait is being used because the app goes to a black
    // loading screen without waiting. Investigate what is causing this and remove this wait.
    cy.wait(5000)
  })

  it('Touch and Trace', () => {
    // Select touchpoint and interact with menu based on desired element
    // TODO: See JUNO-13101 - This wait is being used because the trace registration tab doesn't
    // fully load without a wait when entering registration.
    cy.wait(5000)
    registration.touch().click()
    registration.action.restartReg()
    registration.action.createTouchRegistration(
      imagePoints.demoLeeImagePoints,
      navPoints.demoLee1mmRegTouch,
      '0.8'
    )
    registration.addImagePoint().click()
    registration.touchpoint('3').click()
    registration.action.deleteLandmark()
    // workaround to close the touchpoint menu
    registration.touchpoint('2').click()
    // TODO: the delete button is not functional on EB 1888 - uncomment this assert when it is working again
    // registration.touchpoint('3').should('not.exist')
    registration.action.undoLastAction()
    registration.touchpoint('3').should('exist')
    registration.action.restartReg()
    // Select trace menu and select related buttons
    // TODO: JUNO-23723 - will need to add trace functions when the app has that function
    registration.trace().click()
    registration.traceReady().should('exist')
    registration.undoLastTrace().click()
    registration.restart().click()
  })

  it('Assign touch order to landmarks', () => {
    // TODO: See JUNO-13101 - this wait is being used to allow the landmarks to load - investigate and remove wait
    cy.wait(10000)
    registration.action.restartReg()
    // Assert that touch order is not assigned to auto detected landmarks
    registration.assert.touchOrderNotAssigned()
    registration.assert.touchOrderNotAssigned([3, 5])
    registration.assert.touchOrderNotAssigned(9)
    // Assign order to auto detected landmarks
    registration.action.assignLandmark(1)
    registration.action.assignLandmark(2)
    registration.action.assignLandmark(3)
    registration.assert.touchOrderAssigned([2, 3])
    registration.assert.touchOrderAssigned(1)
  })

  it('Collect navigation points', () => {
    // TODO: See JUNO-13101 - this wait is being used to allow the landmarks to load - investigate and remove wait
    cy.wait(10000)
    registration.action.restartReg()
    registration.assert.touchProgressOverallStatus(0)
    registration.assert.touchOrderNotAssigned()
    registration.action.defineSingleNavTouchLocation(navPoint1)
    registration.assert.touchProgressOverallStatus(1)
    registration.action.defineSingleNavTouchLocation(navPoint2)
    registration.assert.touchProgressOverallStatus(2)
    registration.action.defineSingleNavTouchLocation(navPoint3)
    registration.assert.touchProgressOverallStatus(3)
    registration.action.defineSingleNavTouchLocation(navPoint4)
    // TODO: See Defect JUNO-24523 - On EB-2008 it takes 5 points to initalize instead of the expected 4 - remove fifth point when it is working correctly
    registration.action.defineSingleNavTouchLocation(navPoint5)
    registration.assert.touchOrderAssigned([1, 4])
    registration.assert.touchProgressInitialized()
  })

  it('Assert number of landmarks', () => {
    // TODO: See JUNO-13101 to remove this wait - currently used to allow the registration page to finish loading
    cy.wait(15000)
    registration.assert.numberOfLandmarksByColor(CssColors.LANDMARK_BLUE, 10)
    menu.action.clickExitProcedure()
    procedure.action.select(procedure.opt.availableProcedures.nexframeDbs)
    // Close Demo Lee exam and select Dicom Tru Demo Head exam
    images.patient.action.clickExamCard(patient1.examList.ct.name)
    images.thisStealth.action.selectExam(patient2, patient2.examList.ct.name)
    menu.action.clickRegistration()
    // // TODO: See JUNO-13101 to remove this wait - currently used to allow the registration page to finish loading
    cy.wait(15000)
    registration.assert.noLandmarksDetected()
  })
})
