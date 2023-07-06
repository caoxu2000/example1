import { object } from './media.objects'
import { patient } from '@fixtures/type/patient'
import { exam } from '@fixtures/type/exam'
import { alias } from '@util/type/cy-alias'

export const action = {
  /**
   * Selects the 'This Stealth' tab
   */
  selectMedia() {
    object.mediaTab().click()
    object.mediaTab().should('have.attr', 'aria-selected', 'true')
  },
  /**
   * Searches patient exam from the media
   * @param {exam | patient} patientOrExam : patient/exam to search
   * */
  search(patientOrExam: exam | patient) {
    // search for patient
    action.selectMedia()
    object.clearSearch().click()
    object.searchBar().type(patientOrExam.path)
    cy.waitForApi(alias.dicomSearch, () => {
      object.search().click()
    })
  },
  /**
   * Downloads the patient exam from the media tab
   * @param {exam} exam Param to specify the desired patient exam
   */
  download(exam: exam) {
    // select and download single patient exam
    object
      .patientStudyCard(exam.studyNumber)
      .click()
      .then(($selectedStudy) => {
        cy.waitForApi(alias.dicomImport, () => {
          object.downloadExamButton($selectedStudy, exam.seriesNumber).click()
        })
      })

    // TODO: Juno 13101 - this wait is needed to allow the exam to finish loading, remove once the app is more stable
    cy.wait(5000)
  },
  /**
   * Searches and Downloads patient exam from the media tab
   * @param {exam} exam Param to specify the desired patient exam
   * */
  searchAndDownload(exam: exam) {
    action.search(exam)
    action.download(exam)
  },

  /**
   * Searches and Downloads all exams for a patient
   * @param {patient} patient : Patient to search
   * @param {string} studyNumber :Param to specify the desired exam study number
   * */
  searchAndDownloadAll(patient: patient, studyNumber: string) {
    action.search(patient)

    // select and download all patient exams from selected study
    object
      .patientStudyCard(studyNumber)
      .click()
      .then(($selectedStudy) => {
        cy.waitForApi(alias.dicomImport, () => {
          object.downloadAllExamsButton($selectedStudy).click()
        })
      })
  }
}
