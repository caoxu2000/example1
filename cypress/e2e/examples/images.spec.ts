import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'
import { menu } from '@pom/shared/menu'

import { CssColors } from '@global-config/CssColors'
import { Colormap } from '@global-config/Colormap'
import { Display } from '@global-config/Display'
import { CutType } from '@global-config/CutType'

import { crwDemo as patient1, demoLee as patient2 } from '@fixtures/patients'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'
import { alias } from '@util/type/cy-alias'

describe('Example spec file for the Images POM', () => {
  const patientImportDate = new Date().toISOString().substring(0, 10)
  // const newName = "T2 Weighted MR"
  const sliderValue = '683'
  const newLevelValue = '70'
  const newOpacityValue = '70'
  const newWindowValue = '200'

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    // TODO: replace with downloadAll once that functionality is in the app
    images.media.action.searchAndDownload(patient1.examList.mrT2)
    images.media.action.searchAndDownload(patient2.examList.mr)
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
  })

  it('Search in local media, sort results', () => {
    // select the Media tab, search for the patient
    images.media.action.selectMedia()
    images.media.clearSearch().click()
    images.media.searchBar().type(patient1.path)
    cy.waitForApi(alias.dicomSearch, () => {
      images.media.search().click()
    })

    // select the desired study, sort the study exams, download all exams
    images.media
      .patientStudyCard(patient1.examList.mrT2.studyNumber)
      .click()
      .then(($selectedStudy) => {
        images.media.sortByDescription($selectedStudy).click()
        images.media.sortByDate($selectedStudy).click()
        images.media.sortBySlices($selectedStudy).click()
      })
  })

  it('Select downloaded patient from the This Stealth tab', () => {
    // select the This Stealth tab, search for the patient
    images.thisStealth.action.selectThisStealth()
    images.thisStealth.searchBar().type(patient1.name)

    // select patient, assert patient card color, name, MRN, import date
    images.thisStealth.patientCard(patient1.name).click()
    images.thisStealth.patientCard(patient1.name).then(($selectedCard) => {
      cy.wrap($selectedCard).should(
        'have.css',
        'border-color',
        CssColors.PATIENT_CARD_COLOR_BLUE
      )
      images.thisStealth
        .patientName($selectedCard)
        .should('have.text', patient1.name)
      images.thisStealth
        .patientMRN($selectedCard)
        .should('include.text', patient1.mrn)
      images.thisStealth
        .patientImportDate($selectedCard)
        .should('have.text', patientImportDate)
    })

    // sort patients by date, name, and MRN, clear search bar
    images.thisStealth.sortByDate().click()
    images.thisStealth.sortByName().click()
    images.thisStealth.sortByMRN().click()
    images.thisStealth.clearSearch().click()
    images.thisStealth.searchBar().should('be.empty')
  })

  it('Select exam from Patient pane, assert background color and toggle color', () => {
    // select exam from Patient pane
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)

    // assert selected card background color, toggle Select, assert toggle color
    images.patient
      .examCard(patient1.examList.mrT2.name)
      .then(($selectedCard) => {
        images.patient
          .examInfoBox($selectedCard)
          .should('have.css', 'border-color', CssColors.PATIENT_CARD_COLOR_BLUE)
        // TODO: - the selectToggle is missing from EB2094, uncomment when it is back
        // images.patient.selectToggle($selectedCard).click()
        // TODO: - the selectToggle is not currently working so this will fail (track stays gray).
        // Check this again when functionality is updated.
        // images.patient.selectTrack($selectedCard)
        // .should('have.css', 'background-color', CssColors.PATIENT_SELECT_COLOR_BLUE)
      })
  })

  it('Open settings sub-menu, click delete, cancel deletion', () => {
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)
    images.patient
      .examCard(patient1.examList.mrT2.name)
      .then(($selectedCard) => {
        images.patient.gearControl($selectedCard).click()
        images.patient.deleteExam($selectedCard).click()
        // images.patient.cancelDeleteExam($selectedCard).click()
        images.patient.examCard(patient1.examList.mrT2.name).should('exist')
      })
  })

  it('Edit exam name, interact with the colormap drop-down in settings', () => {
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)
    images.patient
      .examCard(patient1.examList.mrT2.name)
      .then(($selectedCard) => {
        images.patient.gearControl($selectedCard).click()
        // TODO: uncomment this line once the exam names can be edited
        // images.patient.examNameTextbox($selectedCard).type(newName)
        images.patient.action.updateColormap(Colormap.RAINBOW, $selectedCard)
      })
  })

  it('Interact with the modality drop-down in settings', () => {
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)
    images.patient
      .examCard(patient1.examList.mrT2.name)
      .then(($selectedCard) => {
        images.patient.gearControl($selectedCard).click()
        images.patient.action.updateModality(
          images.patient.opt.Modality.CT,
          $selectedCard
        )
      })
  })

  it('Open the adjust sub-menu, interact with the level and width sliders', () => {
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)
    images.patient
      .examCard(patient1.examList.mrT2.name)
      .then(($selectedCard) => {
        images.patient.adjustButton($selectedCard).click()

        // interact with level slider
        images.patient.action.adjustLevel(newLevelValue, $selectedCard)

        // interact with width slider
        images.patient
          .sliderContainer(
            images.patient.opt.LevelWidthSlider.WIDTH,
            $selectedCard
          )
          .then(($sliderContainer) => {
            images.patient.slider($sliderContainer).click()
            images.patient
              .sliderValue($sliderContainer)
              .should('have.text', sliderValue)
          })
      })
  })

  it('Interact with 2D and 3D tabs in Images drawer', () => {
    images.patient.action.clickExamCard(patient1.examList.mrT2.name)
    images.thisStealth.action.selectExam(patient2, patient2.examList.mr.name)
    menu.action.clickPlanning()
    images.drawer.imagesDrawer().click()
    images.drawer.imageCard(patient2.examList.mr.name).then(($card) => {
      images.drawer.visibleIcon2d($card).click()
      images.drawer.hideIcon3d($card).click()
      images.drawer.gearControl($card).click()
      // 2D Tasks
      images.drawer.action.adjustOpacity(newOpacityValue, $card)
      images.drawer.action.adjustWindow(newWindowValue, $card)
      images.drawer.action.adjustLevel(newLevelValue, $card)
      images.drawer.action.updateColormap(Colormap.RAINBOW, $card)
      // 3D Tasks
      images.drawer.drawerTab3d($card).click()
      images.drawer.action.adjustLevel(newLevelValue, $card)
      images.drawer.action.adjustWindow(newWindowValue, $card)
      images.drawer.action.adjustOpacity(newOpacityValue, $card)
      images.drawer.action.updateColormap(Colormap.RAINBOW, $card)
      images.drawer.action.updateDisplay(Display.VR, $card)
      images.drawer.cutMode($card).click()
      images.drawer.freeze($card).click()
      images.drawer.action.updateCutType(CutType.SHADED, $card)
      images.drawer.drawerTab2d($card).click()
    })
  })

  /**
   * TODO: JUNO - 23669 - Clicking the patient card after initial selection causes the the next task to become disabled
   * Uncomment this block and erase the above block once the defect is fixed
   * it('Interact with 2D and 3D tabs in Images drawer', () => {
    images.patient.action.clickExamCard(patient.examList.mrT2.name)
    menu.action.clickPlanning()
    images.drawer.imagesDrawer().click()
    images.drawer.imageCard(patient.examList.mrT2.name).then(($card) => {
      images.drawer.visibleIcon2d($card).click()
      images.drawer.hideIcon3d($card).click()
      images.drawer.gearControl($card).click()
      // 2D Tasks
      images.drawer.action.adjustOpacity(newOpacityValue, $card)
      images.drawer.action.adjustWindow(newWindowValue, $card)
      images.drawer.action.adjustLevel(newLevelValue, $card)
      images.drawer.action.updateColormap(Colormap.RAINBOW, $card)
      // 3D Tasks
      images.drawer.drawerTab3d($card).click()
      images.drawer.action.adjustLevel(newLevelValue, $card)
      images.drawer.action.adjustWindow(newWindowValue, $card)
      images.drawer.action.adjustOpacity(newOpacityValue, $card)
      images.drawer.action.updateColormap(Colormap.RAINBOW, $card)
      images.drawer.action.updateDisplay(Display.VR, $card)
      images.drawer.cutMode($card).click()
      images.drawer.freeze($card).click()
      images.drawer.action.updateCutType(CutType.SHADED, $card)
      images.drawer.drawerTab2d($card).click()
    })
  })
   */

  it('Open patient history and clone patient', () => {
    images.patient.closeLightbox().click()
    images.thisStealth.action.selectThisStealth()
    // open patient history, clone patient
    images.thisStealth.patientCard(patient1.name).then(($selectedCard) => {
      images.thisStealth.history($selectedCard).click()
      cy.waitForApi(alias.clone, () => {
        images.thisStealth.clonePatient($selectedCard).click()
      })
    })

    // assert patient was cloned
    images.thisStealth
      .clonedPatient(patient1.name)
      .should('exist')
      .then(($selectedCard) => {
        images.thisStealth
          .patientName($selectedCard)
          .should('have.text', patient1.name)
        images.thisStealth
          .patientMRN($selectedCard)
          .should('include.text', patient1.mrn)
      })
  })
})
