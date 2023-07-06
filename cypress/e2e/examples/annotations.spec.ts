import { planAndAnnotation as annotation } from '@pom/plans-and-annotations'
import { planAndAnnotation as plan } from '@pom/plans-and-annotations'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'
import { task } from '@pom/shared/task'

import { demoLee as patient } from '@fixtures/patients'

import { util } from '@util/index'

describe('Example spec for the Annotations drawer POMs', () => {
  const newAnnotationName = 'Edited Annotation'
  const currentPlanName = 'Plan 1'

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    procedure.action.select(procedure.opt.availableProcedures.biopsy)

    images.media.action.searchAndDownload(patient.examList.mr)
    // select exam, go to Plans task, open Annotations drawer
    images.thisStealth.action.selectExam(patient, patient.examList.mr.name)
    task.next.plan()
    // TODO: will update the following to the better solution from the result of JUNO-14068
    plan.name(currentPlanName).should('exist')
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')

    annotation.annotationsDrawer().click()
    annotation.addAngleMeasurement().click()
    annotation
      .addAngleMeasurementOption(
        annotation.opt.AngleMeasurementButtons.CLOSED_ANGLE
      )
      .click()
  })

  it('Open Annotations drawer, create new annotation, hide all, show all, hide plan, edit annotation name, change color, undo', () => {
    annotation.options().click()
    annotation.hideAll().click()
    annotation.showAll().click()
    annotation.planBtn().click()
    annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
      annotation.name('').click().type(newAnnotationName, { delay: 500 })
      annotation
        .name(newAnnotationName)
        .should('have.value', `${newAnnotationName}`)
      annotation.gearIcon($selectedAnnotation).click()
    })

    // change annotation color
    annotation
      .annotationContainer(newAnnotationName)
      .then(($selectedAnnotation) => {
        annotation.gearIcon($selectedAnnotation).click()
        annotation
          .colorButton(
            annotation.opt.AnnotationColorBar.TEAL,
            $selectedAnnotation
          )
          .click()
      })

    // undo, delete annotation
    annotation.undo().click()
    annotation.options().click()
    annotation.deleteMultiple().click()
    annotation.deleteAll().click()
    annotation.deleteAllPopup().then(($popup) => {
      annotation.confirmDeleteAll($popup).click()
    })
  })

  it('Lock and hide annotation, unlock and show annotation, delete annotation', () => {
    annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
      annotation.action.lock($selectedAnnotation)
      annotation.action.hide($selectedAnnotation)
      annotation.action.unlock($selectedAnnotation)
      annotation.action.show($selectedAnnotation)
      annotation.gearIcon($selectedAnnotation).click()
      annotation.deletePlanAnnotation($selectedAnnotation).click()
    })
  })

  it('Create new annotation, cancel deletion, confirm deletion', () => {
    annotation.addAngleMeasurement().click()
    annotation.addAngleMeasurementOption(
      annotation.opt.AngleMeasurementButtons.RIGHT_ANGLE
    )
    annotation.options().click()
    annotation.deleteMultiple().click()
    annotation.deleteAll().click()
    annotation.deleteAllPopup().then(($popup) => {
      annotation.cancelDeleteAll($popup).click()
    })
    annotation.deleteAll().click()
    annotation.deleteAllPopup().then(($popup) => {
      annotation.confirmDeleteAll($popup).click()
    })
  })
})
