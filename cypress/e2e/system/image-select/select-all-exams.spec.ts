import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'

import { demoDaisy as patient } from '@fixtures/patients'
import { CssColors } from '@fixtures/enum/CssColors'
import { util } from '@util'
import { alias } from '@fixtures/cy-alias'

// test variables
const examMr1 = patient.examList.swi
const examMr2 = patient.examList.mrT1Contrast
const examMr3 = patient.examList.flair
const examMr4 = patient.examList.mrT1
const examDiffusion = patient.examList.diffusion

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
  it('TC-CR107483-Sys-0010, Select procedure and Media pane, search and download all patient exams', () => {
    // select Biopsy procedure workflow
    procedure.action.select(procedure.opt.biopsy)

    // select the Media tab, search for patient
    images.media.mediaTab().click()
    images.media.selectedTab().should('have.text', 'MEDIA')
    images.media.clearSearch().click()
    images.media.searchBar().type(patient.path)
    images.media.search().click()

    // wait for the search results to load
    // TODO: JUNO-8380: Update patientStudyCard() to first check that the search list is not empty
    util.intercept.waitForIntercept(alias.dicomSearch)

    // select the desired study, download all exams
    images.media
      .patientStudyCard(examMr1.studyNumber)
      .click()
      .then(($selectedStudy) => {
        images.media.downloadAllExamsButton($selectedStudy).click()
      })

    // wait for the exams to finish downloading
    util.intercept.waitForIntercept(alias.dicomImport)
  })

  it('TC-CR107483-Sys-0020, Select Downloaded Patient from the This Stealth Tab', () => {
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

  it('TC-CR107483-Sys-0030, Select single MR Weighted Exam from Patient Pane', () => {
    // select exam
    images.thisStealth.stealthTab().click()
    images.thisStealth.patientCard(patient.name).click()
    images.patient.examCard(examMr1.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // select patient exam card and toggle, assert both are selected
    images.patient.examCard(examMr1.name).then(($selectedPtCard) => {
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

  it('TC-CR107483-Sys-0040, Select next two sets of the downloaded exams in the Patient Pane', () => {
    // TODO: workaround - Unable to select three exams in a row on the patient pane within the same it()
    // select exam
    images.thisStealth.stealthTab().click()
    images.thisStealth.patientCard(patient.name).click()
    images.patient.examCard(examMr2.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // Select MR2 exam and toggle, assert both are selected
    images.patient.examCard(examMr2.name).then(($selectedPtCard) => {
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

    // select MR3 exam
    images.patient.examCard(examMr3.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // select MR3 exam and toggle, assert both are selected
    images.patient.examCard(examMr3.name).then(($selectedPtCard) => {
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

  it('TC-CR107483-Sys-0050, Select last two sets of the downloaded exams in the Patient Pane', () => {
    // select MR4 exam
    images.thisStealth.stealthTab().click()
    images.thisStealth.patientCard(patient.name).click()
    images.patient.examCard(examMr4.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // select MR4 exam and toggle, assert both are selected
    images.patient.examCard(examMr4.name).then(($selectedPtCard) => {
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

    // select diffusion exam
    images.patient.examCard(examDiffusion.name).click()

    // wait for api calls to succeed to help ensure the page has reloaded
    util.intercept.waitForIntercept(alias.detail)
    util.intercept.waitForIntercept(alias.thumbnail)

    // Select Diffusion exam and assert
    images.patient.examCard(examDiffusion.name).then(($selectedPtCard) => {
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

  it.skip('TC-CR107483-Sys-0060, Select all patient exams on the Patient Pane', () => {
    // select each downloaded exam on the patient pane and assert it is selected
    images.patient.examCard(examMr1.name).then(($selectedPtCard) => {
      images.patient.selectToggle($selectedPtCard).click()
      images.patient
        .selectTrack($selectedPtCard)
        .should(
          'have.css',
          'background-color',
          CssColors.PATIENT_SELECT_COLOR_BLUE
        )
    })
    images.patient.examCard(examMr2.name).then(($selectedPtCard) => {
      images.patient.selectToggle($selectedPtCard).click()
      images.patient
        .selectTrack($selectedPtCard)
        .should(
          'have.css',
          'background-color',
          CssColors.PATIENT_SELECT_COLOR_BLUE
        )
    })
    images.patient.examCard(examMr3.name).then(($selectedPtCard) => {
      images.patient.selectToggle($selectedPtCard).click()
      images.patient
        .selectTrack($selectedPtCard)
        .should(
          'have.css',
          'background-color',
          CssColors.PATIENT_SELECT_COLOR_BLUE
        )
    })
    images.patient.examCard(examMr4.name).then(($selectedPtCard) => {
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

// TO-DO:
// Take out unnecessary it() for workaround to select more than 2 exams per it in patient pane
