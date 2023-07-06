/**
 * Config file for the CRW Demo patient
 * Contains all information about CRW Demo that will be used in the various test files
 */
import { patient } from '../type/patient'

const mrT1studyNumber =
  '1.3.6.1.4.1.9590.100.1.2.424287628511718186904564535222577683087'
const mrT2StudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.424287628511718186904564535222577683087'
const ctStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.240879134811444039511978052422853341126'

export const crwDemo: patient = {
  name: 'CRW Demo',
  mrn: 'BRW Demo Doe',
  dob: '',
  path: '/opt/mnav/demo-exams/advcranial/CRW Demo',
  examList: {
    mrT1: {
      name: 'MR T1',
      orientation: 'Axial',
      slices: '120',
      spacing: '1.30',
      thickness: '1.30',
      studyNumber: mrT1studyNumber,
      seriesNumber: '3',
      path: '/opt/mnav/demo-exams/advcranial/CRW Demo/MR_T1'
    },
    mrT2: {
      name: 'MR T2',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.09',
      thickness: '1.09',
      studyNumber: mrT2StudyNumber,
      seriesNumber: '4',
      path: '/opt/mnav/demo-exams/advcranial/CRW Demo/MR_T2'
    },
    ct: {
      name: '',
      orientation: 'Axial',
      slices: '132',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: ctStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/advcranial/CRW Demo/CT'
    }
  }
}
