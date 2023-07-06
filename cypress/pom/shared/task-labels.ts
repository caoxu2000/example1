import { taskLabels } from './type/task-label'
import { taskLabelName } from './type/task-label-name'
/**
 * Main configuration file for task buttons and associated routes.
 * Property are from guiwebserver: taskslice.js, workflowtranslations.js.
 * The task-buttons-t type ensures the list of names is correct and can be used to strongly type string values
 */
export const taskLabel: Record<taskLabelName, taskLabels> = {
  mainToggle: {
    id: 'MenuButton',
    label: ''
  },
  adminToggle: {
    id: '',
    label: 'Admin arrow-right7'
  },
  selectProcedure: {
    id: 'SelectProcedure',
    label: 'Select Procedure'
  },
  images: {
    id: 'Images',
    label: 'Images'
  },
  mergeImages: {
    id: 'MergeImages',
    label: 'Images'
  },
  plan: {
    id: 'Plan',
    label: 'Planning'
  },
  registration: {
    id: 'TRU',
    label: 'TRU',
    labelRight: 'Registration'
  },
  truVerify: {
    id: 'TRUVerify',
    label: 'TRUVerify'
  },
  navigation: {
    id: 'Navigation',
    label: 'Navigation'
  },
  equipment: {
    id: 'Equipment',
    label: 'Equipment'
  },
  instruments: {
    id: 'Instruments',
    label: 'Instruments'
  },
  export: {
    id: 'Export',
    label: 'Export'
  },
  about: {
    id: 'AboutThisStealth',
    label: 'About This Stealth'
  },
  surgeon: {
    id: 'SurgeonAdmin',
    label: 'Surgeon'
  },
  patient: {
    id: 'PatientAdmin',
    label: 'Patient'
  },
  dicom: {
    id: 'DicomAdmin',
    label: 'Dicom'
  },
  acquireImages: {
    id: 'AcquireImages',
    label: 'Image Acquisition'
  },
  starfix: {
    id: 'Starfix',
    label: ''
  },
  frameReg: {
    id: 'FrameRegistration',
    label: ''
  },
  exit: {
    id: 'ExitProcedureButton',
    label: 'Exit Procedure'
  }
}
