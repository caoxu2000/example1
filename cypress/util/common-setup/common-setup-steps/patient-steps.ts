import { menu } from '@pom/shared/menu'
import { images } from '@pom/images'

import { patient } from '@fixtures/type/patient'
import { exam } from '@fixtures/type/exam'

/**
 * Common setup step to download and select the specified patient exam(s)
 * @param {patient} patient : Patient to download and select the exam(s) of
 * @param {Array<exam>} series : Array of exams to download and select
 */
export function setupPatient(patient: patient, series: Array<exam>) {
  // TODO: JUNO-29771 - remove once multiple exams can be handled in the application
  if (series.length > 1) {
    throw new Error(
      'Only one series may be downloaded and selected in the application at this time.'
    )
  }
  menu.action.clickImages()
  for (const exam of series) {
    images.media.action.searchAndDownload(exam)
  }
  // TODO: JUNO-29771 - remove hard-coded value and update to loop through all exams and use toggle to select them once that functionality is fixed
  images.thisStealth.action.selectExam(patient, series[0].name)
}
