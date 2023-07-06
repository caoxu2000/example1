/**
 * Config file for the Demo Daisy patient
 * Contains all information about Demo Daisy that will be used in the various test files
 */
import { patient } from '../type/patient'

const perfusionStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.159548596142320015126122340330845573112'
const fmriStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.163420412517380239827421665142768226033'
const dtiStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.213730720011291813324208070662072995931'
const ctBoneStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.252514286224769549131452638132397411664'
const ctVantageStudyNumber =
  '1.3.6.1.4.1.9590.100.1.2.294843515813136547504059733782259203548'

export const demoDaisy: patient = {
  name: 'Demo Daisy',
  mrn: '12345',
  dob: '2019-12-19',
  path: '/opt/mnav/demo-exams/cranial/Demo Daisy',
  examList: {
    perfusion: {
      name: 'Perfusion Color Map CBV T1',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: perfusionStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/Perfusion'
    },
    fmri: {
      name: 'fMRI Color Map Language RHand',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: fmriStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/fMRI'
    },
    diffusion: {
      name: 'AX DTI 30 dir B1000',
      orientation: 'Axial',
      slices: '64',
      spacing: '2.50',
      thickness: '2.50',
      studyNumber: dtiStudyNumber,
      seriesNumber: '5',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/dMRI'
    },
    flair: {
      name: 'Flair',
      orientation: 'Axial',
      slices: '256',
      spacing: '0.98',
      thickness: '0.98',
      studyNumber: dtiStudyNumber,
      seriesNumber: '3',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/Flair'
    },
    swi: {
      name: 'Susceptibility Weighted Imaging',
      orientation: 'Axial',
      slices: '40',
      spacing: '2.00',
      thickness: '2.00',
      studyNumber: dtiStudyNumber,
      seriesNumber: '4',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/SWI'
    },
    mrT1: {
      name: 'T1',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: dtiStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/T1'
    },
    mrT1Contrast: {
      name: 'T1 w/ contrast',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: dtiStudyNumber,
      seriesNumber: '2',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/T1wContrast'
    },
    bone: {
      name: 'Bone',
      orientation: 'Axial',
      slices: '256',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: ctBoneStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/CT'
    },
    ct: {
      name: 'Elekta Vantage CT',
      orientation: 'Axial',
      slices: '134',
      spacing: '1.00',
      thickness: '1.00',
      studyNumber: ctVantageStudyNumber,
      seriesNumber: '1',
      path: '/opt/mnav/demo-exams/cranial/Demo Daisy/CT_Vantage'
    }
  }
}
