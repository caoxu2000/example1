import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'
import { planAndAnnotation as plan } from '@pom/plans-and-annotations'
import { registration } from '@pom/manual-registration'
import { task } from '@pom/shared/task'

import { util } from '@util/index'
import { guiRoutes } from '@util/assert/config'

import { demoLee as patient } from '@fixtures/patients'
import { imagePoints, navPoints } from '@fixtures/regPoints'

describe('Example test for smart prompts', () => {
  const examMr = patient.examList.mr

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)

    // Download and select exam
    images.media.action.searchAndDownload(examMr)
    images.thisStealth.action.selectExam(patient, examMr.name)
  })

  it('Testing all next and previous task buttons', () => {
    // Go forward to Planning task from Images task, then return using previous button
    task.next.plan()
    plan.plansDrawer().should('be.visible')
    task.previous.images()
    // Return to plan task
    task.next.plan()
    plan.plansDrawer().should('be.visible')

    // Go forward to Registration task from Planning task, then return using previous button
    task.next.registration()
    task.previous.plan()
    plan.plansDrawer().should('be.visible')
    // Return to registration task
    task.next.registration()

    // Create a registration
    registration.trace().click()
    registration.touch().click()
    registration.touchReady().should('exist')
    util.createImageTouchPoints(imagePoints.demoLeeImagePoints)
    util.defineNavTouchLocations(navPoints.demoLee1mmRegTouch)
    registration.touchComplete().should('exist')

    // Go forward to TRUVerify task from Registration task, then return using previous button
    task.next.truVerify()
    task.previous.registration()
    // Return to TRUVerify task
    task.next.truVerify()

    // Go forward to Navigation task from TRUVerify task, then return using previous button
    task.next.navigation()
    plan.plansDrawer().should('be.visible')
    task.previous.truVerify()
    // Return to Navigation task
    task.next.navigation()
  })
})
