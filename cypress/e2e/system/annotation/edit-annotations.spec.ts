// page objects
import { planAndAnnotation as annotation } from '@pom/plans-and-annotations'
import { planAndAnnotation as plan } from '@pom/plans-and-annotations'
import { AnnotationColorBar as annotationColors } from '@fixtures/enum/AnnotationColorBar'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'

// static data
import { demoLee as patient } from '@fixtures/patients'
import { task } from '@pom/shared/task'
import { util } from '@util/index'
import { guiRoutes } from '@fixtures/gui-routes'
import { login } from '@util/auth/login'

describe('Basic Cranial Procedure Planning - Annotations Drawer', () => {
  const newAnnotationName = 'Edited Annotation'
  const anotherAnnotationName = 'Another Annotation Name'
  const currentPlanName = 'Plan 1'

  before(() => {
    login()
    // TODO: uncomment the line below once the functionality is available (JUNO-13304)
    // util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
    // Select the biopsy procedure
    procedure.action.select(procedure.opt.biopsy)

    images.media.action.searchAndDownload(patient.examList.mr)
  })

  beforeEach(() => {
    login()
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
    // Select the biopsy procedure
    procedure.action.select(procedure.opt.biopsy)
    images.thisStealth.action.selectExam(patient, patient.examList.mr.name)
    task.next.plan()

    // Add guard to make sure page is completed rendering before perform click action or will run into detached issue
    plan.name(currentPlanName).should('exist')
    annotation.annotationsDrawer().should('exist').and('be.visible').click()

    annotation.assert.numberOfPlanAnnotations(0)
    annotation.new().click()
    annotation.assert.numberOfPlanAnnotations(1)
  })

  // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
  describe('SS40661', () => {
    // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
    it('TC-SS40661-Sys-0010, Verify user can delete an unlocked annotation', () => {
      annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
        annotation.assert.containerIsUnlocked($selectedAnnotation)
        annotation.gearIcon($selectedAnnotation).click()
        annotation.deletePlanAnnotation($selectedAnnotation).click()
      })
      annotation.assert.numberOfPlanAnnotations(0)
    })

    // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
    it('TC-SS40661-Sys-0020, Verify user cannot delete a locked annotation', () => {
      annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
        annotation.assert.containerIsUnlocked($selectedAnnotation)
        annotation.action.lock($selectedAnnotation)
        annotation.assert.containerIsLocked($selectedAnnotation)
        annotation.gearIcon($selectedAnnotation).click()
        annotation.deletePlanAnnotation($selectedAnnotation).click()
        annotation.name('').should('exist')
        annotation.colorBar($selectedAnnotation).should('exist')
        annotation.gearIcon($selectedAnnotation).should('exist')
        annotation.deletePlanAnnotation($selectedAnnotation).should('exist')
      })
      annotation.assert.numberOfPlanAnnotations(1)

      // JUNO-15613: replace the below clean-up with the 'Delete All' once it's working on the latest build
      // clean-up
      annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
        annotation.action.unlock($selectedAnnotation)
        annotation.deletePlanAnnotation($selectedAnnotation).click()
      })
    })

    // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
    describe('SS40662, SS40665', () => {
      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it('TC-SS40662-SS40665-Sys-0010, Verify user can change annotation color when it is unlocked', () => {
        annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
          annotation.assert.containerIsUnlocked($selectedAnnotation)
          annotation.assert.colorIs(
            $selectedAnnotation,
            annotationColors.PERIWINKLE.color
          )
          annotation.gearIcon($selectedAnnotation).click()
          annotation
            .colorButton(annotationColors.TEAL, $selectedAnnotation)
            .click()
          annotation.assert.colorIs(
            $selectedAnnotation,
            annotationColors.TEAL.color
          )

          // JUNO-15613: replace the below clean-up with the 'Delete All' once it's working on the latest build
          // clean-up
          annotation.deletePlanAnnotation($selectedAnnotation).click()
        })
      })

      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it('TC-SS40662-SS40665-Sys-0020, Verify user cannot change annotation color when it is locked', () => {
        annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
          annotation.assert.containerIsUnlocked($selectedAnnotation)
          annotation.assert.colorIs(
            $selectedAnnotation,
            annotationColors.PERIWINKLE.color
          )
          annotation.gearIcon($selectedAnnotation).click()
          annotation.action.lock($selectedAnnotation)
          annotation.assert.containerIsLocked($selectedAnnotation)
          annotation
            .colorButton(annotationColors.PINK, $selectedAnnotation)
            .click()
          annotation.assert.colorIs(
            $selectedAnnotation,
            annotationColors.PERIWINKLE.color
          )

          // JUNO-15613: replace the below clean-up with the 'Delete All' once it's working on the latest build
          // clean-up
          annotation.action.unlock($selectedAnnotation)
          annotation.deletePlanAnnotation($selectedAnnotation).click()
        })
      })
    })

    // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
    describe('SS40663, SS40665', () => {
      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it.skip('**Skipped feature not implemented**: TC-SS40663-SS40665-Sys-0010, Verify user can change annotation notes when it is unlocked', () => {
        // Feature is not available yet therefore tests are not implemented
      })

      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it.skip('**Skipped feature not implemented**: TC-SS40663-SS40665-Sys-0020, Verify user cannot change annotation notes when it is locked', () => {
        // Feature is not available yet therefore tests are not implemented
      })
    })

    // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
    describe('SS40665', () => {
      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it('TC-SS40665-Sys-0010, Verify user can edit annotation name when it is unlocked', () => {
        annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
          annotation.assert.containerIsUnlocked($selectedAnnotation)
          annotation.name('').click().type(newAnnotationName, { delay: 500 })
          annotation
            .name(newAnnotationName)
            .should('have.value', newAnnotationName)

          // JUNO-15613: replace the below clean-up with the 'Delete All' once it's working on the latest build
          // clean-up
          annotation.deletePlanAnnotation($selectedAnnotation).click()
        })
      })

      // TODO: JUNO-22323 - update requirement tracings to use Juno requirement IDs when available
      it('TC-SS04665-Sys-0020, Verify user cannot edit annotation name when it is locked', () => {
        annotation.annotationContainerByIndex(0).then(($selectedAnnotation) => {
          annotation.assert.containerIsUnlocked($selectedAnnotation)
          annotation.action.lock($selectedAnnotation)
          annotation.assert.containerIsLocked($selectedAnnotation)
          annotation
            .name('')
            .type(anotherAnnotationName, { delay: 500, force: true })
          // TODO: This test is currently failing because this bug logged: JUNO-13338. It should pass once the bug is fixed
          annotation.name('').should('exist')
          annotation.name(anotherAnnotationName).should('not.exist')

          // JUNO-15613: replace the below clean-up with the 'Delete All' once it's working on the latest build
          // clean-up
          annotation.action.unlock($selectedAnnotation)
          annotation.deletePlanAnnotation($selectedAnnotation).click()
        })
      })
    })
  })
})
