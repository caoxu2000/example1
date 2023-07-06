/**
 * Config file for the Demo Lee patient
 * Contains all information about Demo Lee that will be used in the various test files
 */
import { patient } from '../type/patient'

const mrStudyNumber = '1.2.124.113532.10.35.102.3.20071116.131216.943760'
const ctStudyNumber = '1.2.124.113532.10.35.102.3.20071128.72257.958594'

export const demoLee: patient = {
  name: 'Demo Lee',
  mrn: 'MR2668',
  dob: '1952-02-02',
  path: '/opt/mnav/demo-exams/cranial/Demo Lee',
  examList: {
    mr: {
      name: 'T1W_3D_TFE AX',
      orientation: 'Axial',
      slices: '120',
      spacing: '1.50',
      thickness: '1.50',
      studyNumber: mrStudyNumber,
      seriesNumber: '901',
      path: '/opt/mnav/demo-exams/cranial/Demo Lee/lee_mr'
    },
    ct: {
      name: 'Stereotactic Soft Tissue 1.0 H40s',
      orientation: 'Axial',
      slices: '183',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: ctStudyNumber,
      seriesNumber: '2',
      path: '/opt/mnav/demo-exams/cranial/Demo Lee/lee_ct'
    }
  }
}
