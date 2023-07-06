/**
 * @description List of procedure names
 * This type restricts property names on the procedures
 * config to this list of string literals
 */
type procedureNames =
  | 'biopsy'
  | 'catheterPlacementEm'
  | 'catheterPlacementOptical'
  | 'nexframeDbs'
  | 'starfixDbs'
  | 'stereotacticFrameBiopsy'
  | 'stereotacticFrameDbs'
  | 'tractography'
  | 'tumorResectionEm'
  | 'tumorResectionOptical'
  | 'endoscopicSkullBase'
  | 'lateralSkullBase'
  | 'standardFess'
  | 'pelvicTrauma'
  | 'spinalFusion'

/**
 * @description Custom type representing the generated procedures config
 */
export type procedure = {
  name: string
  type: string
  anatomy: Anatomy
}

/**
 * @description List of anatomy options.
 * These values map to the set of objects originating from the /cases api.
 */
export enum Anatomy {
  CRANIAL = 'CRANIAL',
  ENT = 'ENT',
  SPINE = 'SPINE'
}

/**
 * @description List of available procedures
 */
export const availableProcedures = {
  biopsy: {
    name: 'Biopsy',
    type: 'BiopsyOptical',
    anatomy: 'CRANIAL'
  },
  catheterPlacementEm: {
    name: 'Catheter Placement (EM)',
    type: 'ShuntEM',
    anatomy: 'CRANIAL'
  },
  catheterPlacementOptical: {
    name: 'Catheter Placement (Optical)',
    type: 'ShuntOptical',
    anatomy: 'CRANIAL'
  },
  nexframeDbs: {
    name: 'Nexframe DBS',
    type: 'NexFrameOptical',
    anatomy: 'CRANIAL'
  },
  tumorResectionEm: {
    name: 'Tumor Resection (EM)',
    type: 'TumorResectionEM',
    anatomy: 'CRANIAL'
  },
  tumorResectionOptical: {
    name: 'Tumor Resection (Optical)',
    type: 'TumorResectionOptical',
    anatomy: 'CRANIAL'
  },
  endoscopicSkullBase: {
    name: 'Endoscopic Skull Base',
    type: 'ESBEM',
    anatomy: 'ENT'
  },
  lateralSkullBase: {
    name: 'Lateral Skull Base',
    type: 'LSBEM',
    anatomy: 'ENT'
  },
  standardFess: {
    name: 'Standard FESS',
    type: 'StdFESS',
    anatomy: 'ENT'
  },
  pelvicTrauma: {
    name: 'Pelvic Trauma',
    type: 'SpinalFusion',
    anatomy: 'SPINE'
  },
  spinalFusion: {
    name: 'Spinal Fusion',
    type: 'SpinalFusion',
    anatomy: 'SPINE'
  }
} as Record<procedureNames, procedure>
