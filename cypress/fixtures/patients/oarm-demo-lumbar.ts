/**
 * Config file for the O-arm Demo Lumbar patient
 * Contains all information about O-arm Demo Lumbar that will be used in the various test files
 */
import { patient } from '../type/patient'

const ctStudyNumber = '1.2.276.0.7230010.3.1.2.8323329.22552.20161219214951.10'

export const oarmDemoLumbar: patient = {
  name: 'O-arm Demo Lumbar',
  mrn: '',
  dob: '',
  path: '/opt/mnav/demo-exams/spine',
  examList: {
    ct: {
      name: 'OArm-1 Low Dose',
      orientation: 'Axial',
      slices: '192',
      spacing: '0.832999999999999',
      thickness: '0.833',
      studyNumber: ctStudyNumber,
      seriesNumber: '1177579607',
      path: '/opt/mnav/demo-exams/spine/O-arm Demo Lumbar'
    }
  }
}
