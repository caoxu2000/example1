import { instrument } from '@pom/instruments'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'
import { images } from '@pom/images'
import { registration } from '@pom/manual-registration'
import { equipment } from '@pom/equipment'
import { InstrumentsDropdownOptions } from '@pom/instruments/task/task.options'
import { instruments, drivers } from '@global-config/instruments'
import { oarmDemoLumbar as patient } from '@fixtures/patients'
import { imagePoints, navPoints } from '@fixtures/regPoints'

import { util } from '@util'

// This example requires the following before the tests run:
// 1. O-arm should be in the procedure
// 2. The 'NavLock Gray' to be removed from the instruments in Spine->Pelvic Trauma procedure
// 3. The 'Passive Planar, Blunt' to be added to the instruments in the Cranial->Biopsy procedure

describe('Example spec for the Instruments Task POMs', () => {
  const opacityValue = 47
  const widthValue = 17
  const lengthValue = 100

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    procedure.action.select(procedure.opt.availableProcedures.pelvicTrauma)

    // Remove O-arm from procedure
    menu.action.clickEquipment()
    // TODO: See JUNO-13978 - Potentially add a new surgeon profile to set this up without a need for going to equipment task
    equipment.action.removeEquipmentFromProcedure(
      equipment.opt.equipment.oArm.name
    )

    // Download patient exam
    menu.action.clickImages()
    images.media.action.searchAndDownload(patient.examList.ct)
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)

    // Create registration and proceed to Navigation
    menu.action.clickRegistration()
    registration.trace().click()
    registration.touch().click()
    registration.touchReady().should('exist')
    registration.action.createTouchRegistration(
      imagePoints.demoLeeImagePoints,
      navPoints.demoLee1mmRegTouch,
      '0.6'
    )
    menu.action.clickNavigation()
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')
  })

  it('Go to Instruments Task and add instrument to procedure', () => {
    menu.action.clickInstruments()
    instrument.task.showGroups().click()
    instrument.task.action.addAnInstrumentToProcedure(instruments.navLockGray)
    instrument.task.assert.isToolInProcedure(instruments.navLockGray, true)
    instrument.task.assert.isToolInAvailable(instruments.navLockGray, false)
  })

  it('In Navigation, select instrument, change opacity, category and tip, width and length, show/hide screw', () => {
    instrument.drawer.rightPanelTitle().should('have.text', 'Instruments')
    instrument.drawer
      // TODO: replace the following with 'Awl Sharp' when run this test b/c this bug: JUNO-22550. Revert back when it's fixed
      .toolCard(instruments.navLockGray.name)
      .should('exist')
      .then(($toolCard) => {
        // Click gear icon, then change opacity
        instrument.drawer.gearIcon($toolCard).click()
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.OPACITY,
            0
          )
          .then(($slider) => {
            instrument.drawer.action.adjustSlider(opacityValue, $slider)
            // TODO: this assert demonstrates proper use but currently fails because it's not functional yet
            // instrument.drawer
            //   .currentSliderValue($slider)
            //   .should('eq', String(opacityValue))
          })

        // Interact with the category and tip drop downs
        instrument.drawer.categoryTab($toolCard).click()
        instrument.drawer
          .parameterDropdown(
            $toolCard,
            instrument.drawer.opt.InstrumentDropdowns.CATEGORY
          )
          .click()
        instrument.drawer
          .parameterOption(InstrumentsDropdownOptions.AWLS_AND_PROBES)
          .click()
        instrument.drawer
          .currentDropdownValue(
            instrument.drawer.opt.InstrumentDropdowns.CATEGORY
          )
          .should('have.value', drivers.awlsAndProbes.category)

        instrument.drawer
          .parameterDropdown(
            $toolCard,
            instrument.drawer.opt.InstrumentDropdowns.TIP
          )
          .click()
        instrument.drawer
          .parameterOption(InstrumentsDropdownOptions.AWL_SHARP)
          .click()
        instrument.drawer
          .currentDropdownValue(instrument.drawer.opt.InstrumentDropdowns.TIP)
          .should('have.value', drivers.awlsAndProbes.tips.awlSharp.toolCardID)

        // Change Screw width and length
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.WIDTH,
            1
          )
          .then(($slider) => {
            instrument.drawer.action.adjustSlider(widthValue, $slider)
            // TODO: this assert demonstrates proper use but currently fails because it's not functional yet
            // instrument.drawer
            //   .currentSliderValue($slider)
            //   .should('eq', String(widthValue))
          })
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.LENGTH,
            2
          )
          .then(($slider) => {
            instrument.drawer.action.adjustSlider(lengthValue, $slider)
            // TODO: this assert demonstrates proper use but currently fails because it's not functional yet
            // instrument.drawer
            //   .currentSliderValue($slider)
            //   .should('eq', String(lengthValue))
          })

        // Hide and assert the Screw
        instrument.drawer.screwVisibilityIcon($toolCard).click()
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.WIDTH,
            1
          )
          .then(($slider) => {
            instrument.drawer.slider($slider).should('be.disabled')
          })
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.LENGTH,
            2
          )
          .then(($slider) => {
            instrument.drawer.slider($slider).should('be.disabled')
          })
        // Show and assert the Screw
        instrument.drawer.screwVisibilityIcon($toolCard).click()
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.WIDTH,
            1
          )
          .then(($slider) => {
            instrument.drawer.slider($slider).should('be.enabled')
          })
        instrument.drawer
          .sliderContainer(
            $toolCard,
            instrument.drawer.opt.SliderNames.LENGTH,
            2
          )
          .then(($slider) => {
            instrument.drawer.slider($slider).should('be.enabled')
          })
        // Show/Hide the plan
        // TODO: uncomment when show/hide functionalities become available
        // instrument.drawer.action.show($toolCard)
        // instrument.drawer.action.hide($toolCard)
      })
  })

  it('Go to Instruments Task, search, show groups, remove instrument from procedure', () => {
    menu.action.clickInstruments()

    // Search and show groups, scroll through instruments list
    instrument.task
      .searchBar()
      .type(`${instruments.sureTrakPassiveSilver.name}`)
    instrument.task.clearSearchIcon().click()
    instrument.task.searchBar().should('be.empty')
    cy.wait(4000)
    instrument.task.showGroups().click()
    instrument.task.instrumentsList().scrollTo('bottom').wait(4000)
    instrument.task.assert.toolIsDisplayedInAvailableList(
      instruments.SP14MH30TMR8,
      true
    )

    // Remove instrument from procedure
    instrument.task.action.removeAnInstrumentFromProcedure(
      instruments.passivePlanarBlunt
    )
    instrument.task.assert.isToolInProcedure(
      instruments.passivePlanarBlunt,
      false
    )
    instrument.task.assert.isToolInAvailable(
      instruments.passivePlanarBlunt,
      true
    )
  })
})
