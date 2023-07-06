/**
 * Config file for the DICOM TRU Demo Head patient
 * Contains all information about DICOM TRU Demo Head that will be used in the various test files
 */
import { patient } from '../type/patient'

const ctStudyNumber = '1.2.840.113619.2.55.3.2831196198.225.1449245617.489'

export const dicomTruDemoHead: patient = {
  name: 'DICOM_TRUDemoHead_CT_12TchF_MultiAttr_1',
  mrn: 'DICOM_TRUDemoHead_CT_12TchF_MultiAttr_1',
  dob: '',
  path: '/opt/mnav/exams/S8_Nvolve/Clinical DICOM exams',
  examList: {
    ct: {
      name: 'CT-1 DICOM_TRUDemoHead',
      orientation: 'Axial',
      slices: '416',
      spacing: '0.625',
      thickness: '0',
      studyNumber: ctStudyNumber,
      seriesNumber: '2',
      path: '/opt/mnav/exams/S8_Nvolve/Clinical_DICOM_exams/DICOM_TRUDemoHead_CT_12TchF_MultiAttr_1'
    }
  }
}
