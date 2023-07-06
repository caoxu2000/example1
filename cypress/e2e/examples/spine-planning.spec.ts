import { spinePlanning } from '@pom/spine-planning'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'
import { task } from '@pom/shared/task'
import { menu } from '@pom/shared/menu'

import { oarmDemoLumbar as patient } from '@fixtures/patients'
import { CssColors } from '@global-config/CssColors'

import { alias } from '@util/type/cy-alias'
import { util } from '@util/index'

const screwName = 'L2-right-screwKind'
const screwName2 = 'L2-left-screwKind'
const newScrewName = 'New Screw'
const interbodyName = 'L2-string-cageKind'
const trajectoryName = 'L2-string-trajectoryKind'
const facetName = 'L2-string-facetKind'
// TODO: Uncomment sliderValue once associated objects have test ids again - JUNO-13155
// const sliderValue = '0'

describe('Example spec for the Spine Planning POMs', () => {
  // Note that the following may need to be done before running this spec:
  //  1: Add O-arm to equipment - when there is a common setup O-arm will always be in equipment when spine procedure is initially selected
  //  2: clean patientDB

  before(() => {
    // TODO: uncomment cleanPatientDb when exams are able to be deleted
    // util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    // TODO: See JUNO-13184 - can use procedure actions to select procedures when it is updated to work for spine procedures
    // procedure.action.select(procedure.opt.availableProcedures.pelvicTrauma)
    procedure
      .anatomy(procedure.opt.availableProcedures.pelvicTrauma.anatomy)
      .click()
    procedure.surgeon('Standard Profile').click()
    procedure
      .procedure(procedure.opt.availableProcedures.pelvicTrauma.name)
      .click()

    // Remove O-arm from procedure
    menu.action.clickEquipment()
    // TODO: See JUNO-13069 - Workaround to remove O-arm from procedure. When equipment POM is added, change this to reference that instead.
    // TODO: See JUNO-13978 - Potentially add a new surgeon profile to set this up without a need for going to equipment task
    cy.findByText('O-arm™')
      .parentsUntil('[data-testid="equipment-card-ip"]')
      .parent()
      .findByRole('button', { name: 'close', exact: true })
      .click()

    // Go to images and download the O-arm Demo Lumbar Exam
    menu.action.clickImages()
    images.media.action.searchAndDownload(patient.examList.ct)
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)
    // TODO: this is a workaround to allow next button to be enabled. Remove this when not necessary.
    cy.wait(10000)
    task.next.plan()
    // TODO: this is a workaround to allow the plans page to load before interacting with it. Remove this when not necessary.
    cy.wait(5000)
  })

  it('Open Screws Drawer, Add, Edit, Remove Screws', () => {
    // Note that screws drawer is open by default. Clicking it the first time closes it so a second click was added to reopen.
    // TODO: See JUNO-13987 - add an action to know if the drawer is open or closed before clicking
    spinePlanning.drawers.screwDrawer.screwsDrawer().click()
    spinePlanning.drawers.screwDrawer.screwsDrawer().click()
    spinePlanning.drawers.screwDrawer
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L2)
      .click()
    spinePlanning.drawers.screwDrawer.plannedItemList().should('have.length', 1)
    spinePlanning.drawers.screwDrawer.addNewScrew().click()
    spinePlanning.drawers.screwDrawer
      .addScrew(spinePlanning.drawers.screwDrawer.opt.ScrewSide.LEFT)
      .click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding screws. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(15000)
    spinePlanning.drawers.screwDrawer.addNewScrew().click()
    spinePlanning.drawers.screwDrawer
      .addScrew(spinePlanning.drawers.screwDrawer.opt.ScrewSide.RIGHT)
      .click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding screws. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(15000)
    spinePlanning.drawers.screwDrawer.plannedItemList().should('have.length', 3)
    spinePlanning.drawers.screwDrawer.deleteAll().click()
    spinePlanning.drawers.screwDrawer.cancelDeleteAll().click()
    spinePlanning.drawers.screwDrawer.plannedItemList().should('have.length', 3)
    spinePlanning.drawers.screwDrawer.deleteAll().click()
    cy.waitForApi(
      alias.deleteImplant,
      () => {
        spinePlanning.drawers.screwDrawer.confirmDeleteAll().click()
      },
      15000
    )
    spinePlanning.drawers.screwDrawer.plannedItemList().should('have.length', 0)
    spinePlanning.drawers.screwDrawer.collapseRightPanel().click()
    spinePlanning.drawers.screwDrawer.expandRightPanel().click()
    spinePlanning.drawers.screwDrawer.addNewScrew().click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding screws. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(22000)
    // Make updates to plan in specfied screw container
    spinePlanning.drawers.screwDrawer
      .plannedItemContainer(screwName)
      .then(($selectedScrewCard) => {
        spinePlanning.drawers.screwDrawer.unlockIcon($selectedScrewCard).click()
        spinePlanning.drawers.screwDrawer.showIcon($selectedScrewCard).click()
        spinePlanning.drawers.screwDrawer.gearIcon($selectedScrewCard).click()
        // TODO: See JUNO-13155: the following was functional on EB1639 but doesn't work on EB1674 because test ids have been removed. Add this back in when the associated
        // objects have test ids again.
        // spinePlanning.drawers.screwDrawer.family($selectedScrewCard).click()
        // spinePlanning.drawers.screwDrawer.type($selectedScrewCard).click()
        // spinePlanning.drawers.screwDrawer.selectType(spinePlanning.drawers.screwDrawer.opt.ScrewType.ATS).click()
        // spinePlanning.drawers.screwDrawer.partiallyThreaded($selectedScrewCard).click()
        // spinePlanning.drawers.screwDrawer.sliderContainer($selectedScrewCard, spinePlanning.drawers.opt.slider.DIAMETER)
        //     .then($sliderContainer => {
        //         //adjust the Width slider and read the Width value
        //         //TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
        //         //TODO: add assert for slider value when this screw slider is functional (JUNO-6881)
        //         spinePlanning.drawers.screwDrawer.slider($sliderContainer).click()
        //     })
        // spinePlanning.drawers.screwControls($selectedScrewCard)
        //     .then($screwControls => {
        //         spinePlanning.drawers.screwDrawer.entry($screwControls).click()
        //         spinePlanning.drawers.screwDrawer.target($screwControls).click()
        //         spinePlanning.drawers.screwDrawer.rewind($screwControls).click()
        //         spinePlanning.drawers.screwDrawer.fastforward($screwControls).click()
        //         spinePlanning.drawers.screwDrawer.play($screwControls).click()
        //     })
        spinePlanning.drawers.screwDrawer.more($selectedScrewCard).click()
        spinePlanning.drawers.screwDrawer
          .colorButton(
            $selectedScrewCard,
            spinePlanning.drawers.opt.PlanColorBar.PINK
          )
          .click()
        cy.waitForApi(
          alias.deleteImplant,
          () => {
            spinePlanning.drawers.screwDrawer
              .deletePlannedItem($selectedScrewCard)
              .click()
          },
          15000
        )
        // TODO: this assert can be uncommented when the delete screw button is functional
        spinePlanning.drawers.screwDrawer
          .plannedItemList()
          .findByDisplayValue(screwName)
          .should('not.exist')
      })
    spinePlanning.drawers
      .plannedItemContainer(screwName2)
      .then(($selectedScrewCard) => {
        spinePlanning.drawers.screwDrawer.gearIcon($selectedScrewCard).click()
        spinePlanning.drawers.screwDrawer.more($selectedScrewCard).click()
        spinePlanning.drawers.screwDrawer
          .nameInput($selectedScrewCard)
          .click()
          .clear()
          .type(newScrewName)
        spinePlanning.drawers.screwDrawer.less($selectedScrewCard).click()
        // TODO: this assert can be uncommented when the screw name update is functional
        // spinePlanning.drawers.plannedItemList().findByDisplayValue(newScrewName).should('exist')
      })
    spinePlanning.drawers.screwDrawer.hideAll().click()
    spinePlanning.drawers.screwDrawer.undo().click()
  })

  it('Open Interbodies Drawer, Add, Edit, Remove Interbodies', () => {
    spinePlanning.drawers.interbodyDrawer.interbodyDrawerIcon().click()
    spinePlanning.drawers.interbodyDrawer.addNew().click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding implants. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(10000)
    spinePlanning.drawers.interbodyDrawer
      .plannedItemList()
      .should('have.length', 1)
    spinePlanning.drawers.interbodyDrawer.deleteAll().click()
    spinePlanning.drawers.interbodyDrawer.cancelDeleteAll().click()
    spinePlanning.drawers.interbodyDrawer
      .plannedItemList()
      .should('have.length', 1)
    spinePlanning.drawers.interbodyDrawer.deleteAll().click()
    spinePlanning.drawers.interbodyDrawer.confirmDeleteAll().click()
    spinePlanning.drawers.interbodyDrawer
      .plannedItemList()
      .should('have.length', 0)
    spinePlanning.drawers.interbodyDrawer.collapseRightPanel().click()
    spinePlanning.drawers.interbodyDrawer.expandRightPanel().click()
    spinePlanning.drawers.interbodyDrawer.addNew().click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding implants. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(10000)
    // Make updates to plan in specfied interbody container
    spinePlanning.drawers
      .plannedItemContainer(interbodyName)
      .then(($selectedInterbodyCard) => {
        spinePlanning.drawers.interbodyDrawer
          .unlockIcon($selectedInterbodyCard)
          .click()
        spinePlanning.drawers.interbodyDrawer
          .showIcon($selectedInterbodyCard)
          .click()
        spinePlanning.drawers.interbodyDrawer
          .gearIcon($selectedInterbodyCard)
          .click()
        // TODO: See JUNO-13155: the following was functional on EB1639 but doesn't work on EB1674 because test ids and some of the objects have been removed from the
        // interbody drawer. Add this back in when the associated objects have test ids and are in the interbody drawer again.
        // spinePlanning.drawers.system($selectedInterbodyCard).click()
        // spinePlanning.drawers.selectSystem(spinePlanning.drawers.opt.interbodySystem.SOLERA).click()
        // spinePlanning.drawers.approach($selectedInterbodyCard).click()
        // spinePlanning.drawers.sliderContainer($selectedInterbodyCard, spinePlanning.drawers.opt.slider.LENGTH)
        //     .then($sliderContainer => {
        //         //adjust the length slider and read the length value
        //         //TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
        //         //TODO: add assert for slider value when this screw slider is functional
        //         spinePlanning.drawers.slider($sliderContainer).click()
        //     })
        // spinePlanning.drawers.flipImplant($selectedInterbodyCard).click()
        // spinePlanning.drawers.toolProjection($selectedInterbodyCard).click()
        spinePlanning.drawers.interbodyDrawer
          .more($selectedInterbodyCard)
          .click()
        spinePlanning.drawers.interbodyDrawer
          .colorButton(
            $selectedInterbodyCard,
            spinePlanning.drawers.opt.PlanColorBar.ORANGE
          )
          .click()
      })
    spinePlanning.drawers.interbodyDrawer.undo().click()
    spinePlanning.drawers.interbodyDrawer.hideAll().click()
  })

  it('Open Trajectories Drawer, Add, Edit, Remove Trajectories', () => {
    spinePlanning.drawers.trajectoryDrawer.trajectoryDrawerIcon().click()
    spinePlanning.drawers.trajectoryDrawer.addNew().click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding implants. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(10000)
    spinePlanning.drawers.trajectoryDrawer
      .plannedItemList()
      .should('have.length', 1)
    // Make updates to plan in specfied trajectory container
    spinePlanning.drawers.trajectoryDrawer
      .plannedItemContainer(trajectoryName)
      .then(($selectedTrajectoryCard) => {
        spinePlanning.drawers.trajectoryDrawer
          .unlockIcon($selectedTrajectoryCard)
          .click()
        spinePlanning.drawers.trajectoryDrawer
          .showIcon($selectedTrajectoryCard)
          .click()
        spinePlanning.drawers.trajectoryDrawer
          .gearIcon($selectedTrajectoryCard)
          .click()
        // TODO: See JUNO-13155: the following was functional on EB1639 but doesn't work on EB1674 because test ids have been removed.
        // Add this back in when the associated objects have test ids again.
        // spinePlanning.drawers.trajectoryDrawer.sliderContainer($selectedTrajectoryCard, spinePlanning.drawers.opt.slider.LENGTH)
        //     .then($sliderContainer => {
        //         //adjust the length slider and read the length value
        //         //TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
        //         spinePlanning.drawers.trajectoryDrawer.slider($sliderContainer).click()
        //         spinePlanning.drawers.trajectoryDrawer.sliderValue($sliderContainer).should('have.text', sliderValue)
        //         })
        spinePlanning.drawers.trajectoryDrawer
          .more($selectedTrajectoryCard)
          .click()
        spinePlanning.drawers.trajectoryDrawer
          .colorButton(
            $selectedTrajectoryCard,
            spinePlanning.drawers.opt.PlanColorBar.GREEN
          )
          .click()
      })
    spinePlanning.drawers.trajectoryDrawer.deleteAll().click()
    spinePlanning.drawers.trajectoryDrawer.cancelDeleteAll().click()
    spinePlanning.drawers.trajectoryDrawer
      .plannedItemList()
      .should('have.length', 1)
    spinePlanning.drawers.trajectoryDrawer.deleteAll().click()
    cy.waitForApi(
      alias.deleteImplant,
      () => {
        spinePlanning.drawers.trajectoryDrawer.confirmDeleteAll().click()
      },
      15000
    )
    spinePlanning.drawers.trajectoryDrawer
      .plannedItemList()
      .should('have.length', 0)
    spinePlanning.drawers.trajectoryDrawer.undo().click()
    spinePlanning.drawers.trajectoryDrawer.hideAll().click()
  })

  it('Open Facet Decortication Drawer, Add, Edit, Remove Facet Decortications', () => {
    spinePlanning.drawers.facetDrawer.facetDrawerIcon().click()
    spinePlanning.drawers.facetDrawer.addNew().click()
    // TODO: the wait below fails on the tested build because of a 401 error with adding implants. Uncomment and remove timed wait when error is fixed
    // cy.wait(alias.addImplant.alias, { timeout: 15000 })
    cy.wait(10000)
    spinePlanning.drawers.facetDrawer.plannedItemList().should('have.length', 1)
    // Make updates to plan in specified facet container
    spinePlanning.drawers.facetDrawer
      .plannedItemContainer(facetName)
      .then(($selectedFacetCard) => {
        spinePlanning.drawers.facetDrawer.unlockIcon($selectedFacetCard).click()
        spinePlanning.drawers.facetDrawer.showIcon($selectedFacetCard).click()
        spinePlanning.drawers.facetDrawer.gearIcon($selectedFacetCard).click()
        // TODO: See JUNO-13155: the following was functional on EB1639 but doesn't work on EB1674 because test ids have been removed.
        // Add this back in when the associated objects have test ids again.
        // spinePlanning.drawers.sliderContainer($selectedFacetCard, spinePlanning.opt.drawers.slider.DEPTH)
        //     .then($sliderContainer => {
        //         //adjust the depth slider and read the depth value
        //         //TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
        //         //TODO: add assert for slider value when this facet slider is functional
        //         spinePlanning.drawers.slider($sliderContainer).click()
        //     })
        spinePlanning.drawers.facetDrawer.more($selectedFacetCard).click()
        spinePlanning.drawers.facetDrawer
          .colorButton(
            $selectedFacetCard,
            spinePlanning.drawers.opt.PlanColorBar.YELLOW
          )
          .click()
      })

    spinePlanning.drawers.facetDrawer.deleteAll().click()
    spinePlanning.drawers.facetDrawer.cancelDeleteAll().click()
    spinePlanning.drawers.facetDrawer.plannedItemList().should('have.length', 1)
    spinePlanning.drawers.facetDrawer.deleteAll().click()
    cy.waitForApi(
      alias.deleteImplant,
      () => {
        spinePlanning.drawers.facetDrawer.confirmDeleteAll().click()
      },
      15000
    )
    spinePlanning.drawers.facetDrawer.plannedItemList().should('have.length', 0)
    spinePlanning.drawers.facetDrawer.undo().click()
    spinePlanning.drawers.facetDrawer.hideAll().click()
  })

  it('Select each spine segment button', () => {
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L3)
      .click()
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L3)
      .should(
        'have.css',
        'border-color',
        CssColors.SPINE_PLAN_LEVEL_SELECTED_BLUE
      )
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L4)
      .click()
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L4)
      .should(
        'have.css',
        'border-color',
        CssColors.SPINE_PLAN_LEVEL_SELECTED_BLUE
      )
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L5)
      .click()
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.L5)
      .should(
        'have.css',
        'border-color',
        CssColors.SPINE_PLAN_LEVEL_SELECTED_BLUE
      )
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.S1)
      .click()
    spinePlanning.drawers
      .segmentButton(spinePlanning.drawers.opt.SpineSegment.S1)
      .should(
        'have.css',
        'border-color',
        CssColors.SPINE_PLAN_LEVEL_SELECTED_BLUE
      )
  })

  it('Move robotic arm', () => {
    spinePlanning.robotControls.predefinedArmPositionDropdown().click()
    spinePlanning.robotControls
      .selectPredefinedArmPosition(
        spinePlanning.robotControls.opt.RoboticArmPositions.CLEAR_RIGHT
      )
      .click()
    spinePlanning.robotControls.sendArmPredefinedPosition().click()
    spinePlanning.robotControls.relativeArmPositionDropdown().click()
    spinePlanning.robotControls
      .selectRelativeArmPosition(
        spinePlanning.robotControls.opt.RoboticArmPositions.LEFT_100mm
      )
      .click()
    spinePlanning.robotControls.sendArmRelativePosition().click()
    spinePlanning.robotControls.manualArmUp().click()
    spinePlanning.robotControls.manualArmDown().click()
    spinePlanning.robotControls.nextComponent().click()
  })
})
