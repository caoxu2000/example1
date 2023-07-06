import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'

import { demoLee as patient } from '@fixtures/patients'
import { CssColors } from '@fixtures/enum/CssColors'
import { util } from '@util'
import { alias } from '@fixtures/cy-alias'

before(() => {
  util.auth.login()
  util.cleanPatientDb()
  util.exit()
  cy.visit('/')
})

beforeEach(() => {
  util.auth.login()
  cy.visit('/')
  // create intercepts for searching, downloading, and selecting a patient
  images.media.initializeIntercepts()
  images.patient.initializeIntercepts()
})

describe('JUNO Requirement ID: CR107483', () => {
  it('TC-CR107483-Sys-0010, Select procedure and Media pane, search and download patient', () => {
    // select Cranial biopsy procedure workflow
    procedure.action.select(procedure.opt.biopsy)

    // select the Media tab, search for patient
    images.media.mediaTab().click()
    images.media.selectedTab().should('have.text', 'MEDIA')
    images.media.clearSearch().click()
    images.media.searchBar().type(patient.path)
    images.media.search().click()

    // wait for the search results to load
    util.intercept.waitForIntercept(alias.dicomSearch)

    // select and download single patient exam
    images.media
      .patientStudyCard(patient.examList.ct.studyNumber)
      .click()
      .then(($selectedStudy) => {
        images.media
          .downloadExamButton($selectedStudy, patient.examList.ct.seriesNumber)
          .click()
      })

    // wait for the exams to finish downloading
    util.intercept.waitForIntercept(alias.dicomImport)
  })

  it('TC-CR107483-Sys-0020, Select downloaded Patient from the This Stealth Tab', () => {
    // select the This Stealth tab, search for the patient
    images.thisStealth.stealthTab().click()
    images.thisStealth.selectedTab().should('have.text', 'THIS STEALTH')
    images.thisStealth.searchBar().type(patient.name)

    // select the patient, assert card color
    images.thisStealth
      .patientCard(patient.name)
      .click()
      .then(($selectedCard) => {
        images.thisStealth
          .patientCardColor($selectedCard)
          .should(
            'have.css',
            'background-color',
            CssColors.PATIENT_CARD_COLOR_BLUE
          )
      })
  })

  it('TC-CR107483-Sys-0030, Select Exam from Patient Pane', () => {
    // Restore app state from previous test
    images.thisStealth.stealthTab().click()
    images.thisStealth.patientCard(patient.name).click()

    // select exam
    images.patient.examCard(patient.examList.ct.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // assert selected card background color, toggle Select, assert toggle color
    images.patient.examCard(patient.examList.ct.name).then(($selectedCard) => {
      images.patient
        .examInfoBox($selectedCard)
        .should(
          'have.css',
          'background-color',
          CssColors.PATIENT_CARD_COLOR_BLUE
        )
      images.patient.selectToggle($selectedCard).click()
      images.patient
        .selectTrack($selectedCard)
        .should(
          'have.css',
          'background-color',
          CssColors.PATIENT_SELECT_COLOR_BLUE
        )
    })
  })
})
// TODO: Update describe and it to include juno requirement id once this requirement has been added to cognition: JUNO-22323
describe('SW-L1-PAT-003 - SS40013 LLR from S8 PDR', () => {
  it('TC-SS40013-Sys-0010, Search and download additional patient exam, different image modality', () => {
    images.media.mediaTab().click()
    images.media.selectedTab().should('have.text', 'MEDIA')

    // search for patient
    images.media.clearSearch().click()
    images.media.searchBar().type(patient.path)
    images.media.search().click()

    // select and download single patient exam
    images.media
      .patientStudyCard(patient.examList.mr.studyNumber)
      .click()
      .then(($selectedStudy) => {
        images.media
          .downloadExamButton($selectedStudy, patient.examList.mr.seriesNumber)
          .click()
      })

    // wait for the exams to finish downloading
    util.intercept.waitForIntercept(alias.dicomImport)
  })

  // TODO: Update requirement number with juno requirement number when it is available: JUNO-22323
  it('TC-SS40013-Sys-0020, Select the same Patient from the This Stealth Tab', () => {
    // select the This Stealth tab, search for the patient
    images.thisStealth.stealthTab().click()
    images.thisStealth.selectedTab().should('have.text', 'THIS STEALTH')
    images.thisStealth.searchBar().type(patient.name)

    // select the patient, assert card color
    images.thisStealth
      .patientCard(patient.name)
      .click()
      .then(($selectedCard) => {
        images.thisStealth
          .patientCardColor($selectedCard)
          .should(
            'have.css',
            'background-color',
            CssColors.PATIENT_CARD_COLOR_BLUE
          )
      })
  })

  // TODO: Update requirement number with juno requirement number when it is available: JUNO-22323
  it('TC-SS40013-Sys-0030, Select the additional Exam from Patient Pane', () => {
    // select exam
    images.thisStealth.stealthTab().click()
    images.thisStealth.patientCard(patient.name).click()
    images.patient.examCard(patient.examList.mr.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // select patient exam card and toggle, assert both are selected
    images.patient
      .examCard(patient.examList.mr.name)
      .then(($selectedPtCard) => {
        images.patient
          .examInfoBox($selectedPtCard)
          .should(
            'have.css',
            'background-color',
            CssColors.PATIENT_CARD_COLOR_BLUE
          )
        images.patient.selectToggle($selectedPtCard).click()
        images.patient
          .selectTrack($selectedPtCard)
          .should(
            'have.css',
            'background-color',
            CssColors.PATIENT_SELECT_COLOR_BLUE
          )
      })
  })
})
