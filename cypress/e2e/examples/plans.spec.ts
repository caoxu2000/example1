import { planAndAnnotation as plan } from '@pom/plans-and-annotations'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'
import { task } from '@pom/shared/task'

import { demoLee as patient } from '@fixtures/patients'

import { util } from '@util/index'

describe('Example spec for the Plans drawer POMs', () => {
  const plan1Name = 'Plan 1'
  const newPlanName = 'Edited Plan'
  const plan2Name = 'Plan 2'
  const dist = 0
  const planLoc = 25
  const expectedPlanLength = 0

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    procedure.action.select(procedure.opt.availableProcedures.biopsy)

    images.media.action.searchAndDownload(patient.examList.mr)
    // select exam, go to Plans task
    images.thisStealth.action.selectExam(patient, patient.examList.mr.name)
    task.next.plan()
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')
  })

  it('Open Plans drawer, create new plans, cancel deletion, select specific plan, edit plan name, set target and entry, check distance to target and off plan', () => {
    plan.assert.numberOfPlans(1)
    plan.newPlan().click()
    plan.assert.numberOfPlans(2)
    plan.newPlan().click()
    plan.options().click()
    plan.deleteMultiple().click()
    plan.deleteAll().click()
    plan.deleteAllPopup().then(($popup) => {
      plan.cancelDeleteAll($popup).click()
    })

    plan.planContainer(plan2Name).then(($selectedPlan) => {
      // edit plan name, open configuration menu, set target and entry
      plan.name(plan2Name).clear()
      plan.name('').type(newPlanName, { delay: 200 })
      plan.name(newPlanName).should('have.value', `${newPlanName}`)
      plan.gearIcon($selectedPlan).click()
      plan.setTarget($selectedPlan).click()
      plan.setEntry($selectedPlan).click()

      // check distance to target and distance off plan
      plan
        .distanceToTarget($selectedPlan)
        .invoke('text')
        .then(($distance) => {
          plan.assert.distanceToTargetValue(dist, $distance)
        })
      plan
        .distanceOffPlan($selectedPlan)
        .invoke('text')
        .then(($distance) => {
          plan.assert.distanceOffPlanValue(dist, $distance)
        })
    })
  })

  it('Select specific plan, adjust plan slider', () => {
    plan.planContainer(plan1Name).then(($selectedPlan) => {
      // adjust the plan slider and read the plan length
      plan.action.adjustPlanSlider(planLoc, $selectedPlan)
      plan
        .planLength($selectedPlan)
        .invoke('text')
        .then(($sliderValue) => {
          plan.assert.planLengthValue(expectedPlanLength, $sliderValue)
        })
    })
  })

  it('Lock and hide plan, unlock and show plan', () => {
    plan.planContainer(plan1Name).then(($selectedPlan) => {
      // lock and hide the plan, then unlock and show plan
      plan.action.lock($selectedPlan)
      plan.action.hide($selectedPlan)
      plan.action.unlock($selectedPlan)
      plan.action.show($selectedPlan)
    })
  })

  it('Select specific plan, navigate plan trajectory', () => {
    plan.planContainer(plan1Name).then(($selectedPlan) => {
      plan.gearIcon($selectedPlan).click()
      plan.planControlBox($selectedPlan).then(($controlBox) => {
        plan.toEntry($controlBox).click()
        plan.toTarget($controlBox).click()
        plan.play($controlBox).click()
        plan.fastforward($controlBox).click()
        plan.rewind($controlBox).click()
      })
    })
  })

  it('Select specific plan, change color, toggle virtual craniotomy and safety margin, delete plan', () => {
    plan.planContainer(plan1Name).then(($selectedPlan) => {
      plan.gearIcon($selectedPlan).click()
      plan.toggleOptions($selectedPlan).click()
      plan.colorButton(plan.opt.PlanColorBar.TEAL, $selectedPlan).click()
      plan.virtualCraniotomy($selectedPlan).click()
      plan.safetyMargin($selectedPlan).click()
      plan.deletePlanAnnotation($selectedPlan).click()
    })

    plan.scrollableList().findByDisplayValue(plan1Name).should('not.exist')
  })

  it('Undo, hide all, delete all', () => {
    plan.undo().click()
    plan.options().click()
    plan.hideAll().click()
    plan.deleteMultiple().click()
    plan.deleteAll().click()
    plan.deleteAllPopup().then(($popup) => {
      plan.confirmDeleteAll($popup).click()
    })
  })
})
