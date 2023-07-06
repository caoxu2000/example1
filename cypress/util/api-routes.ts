/**
 * Description: Defines api routes for use with REST calls and Cypress intercept functions
 */

// nginx namespace prefix
const host = `${Cypress.env('protocol')}://${Cypress.env('host')}`
const proceduredata = `${host}/proceduredata/v1`
const persistentwapi = `${host}/persistentwapi/v1`
const imagestask = `${host}/imagestask/v1`
const instruments = `${host}/instruments/v1`
const proceduretask = `${host}/proceduretask/v1`
const spinePlanning = `${host}/spineplanning/v1`
const views = `${host}/viewconfig/v1`
const plandata = `${host}/plandata/v1`
const annotation = `${host}/annotation/v1`
const auth = `${host}/auth`
const vismanagerwapi = `${host}/vismgr-wapi/v1`
const equipmenttask = `${host}/equipment/v1`
const tru = `${host}/trutask/v1`
const gui = `${host}/gui`

export const api = {
  exit: `${proceduredata}/exit`,
  patients: `${persistentwapi}/patients`,
  patientImages: `${imagestask}/patients`,
  dicomSearch: `${imagestask}/media/dicom/search`,
  dicomImport: `${imagestask}/media/dicom/import`,
  enablePatient: `${imagestask}/patients/<PATIENT_OID>/disable`,
  clone: `${imagestask}/patients/*/clone`,
  detail: `${persistentwapi}/exams/*/details`,
  thumbnail: `${persistentwapi}/exams/*/thumbnail`,
  enterInstruments: `${instruments}/task/Instruments?taskAction=entry`,
  addOrRemoveTool: `${instruments}/active`,
  instrumentProcedureImage: `${instruments}/procedure/image/*`,
  instrumentAvailableImage: `${instruments}/available/image/*`,
  procedures: `${proceduretask}/cases`,
  changeView: `${views}/layout/viewtype`,
  saveLayout: `${views}/layout/save`,
  previewLayout: `${views}/layout/preview`,
  addImplant: `${spinePlanning}/implant/add`,
  deleteImplant: `${spinePlanning}/implant/delete`,
  plans: `${plandata}/plans`,
  newAnnotation: `${annotation}/create`,
  login: `${auth}/login`,
  logout: `${auth}/logout`,
  fail: `${auth}/login/fail`,
  success: `${auth}/login/success`,
  authCheck: `${auth}/is-authenticated`,
  required: `${auth}/requires-credentials`,
  loginStrategy: `${auth}/configured-strategies`,
  sliderUpdate: `${vismanagerwapi}/preset/update`,
  enterEquipment: `${equipmenttask}/task?taskAction=entry`,
  createEquipment: `${equipmenttask}/create`,
  addEquipment: `${equipmenttask}/add/*`,
  removeEquipment: `${equipmenttask}/remove/*`,
  deleteEquipment: `${equipmenttask}/*`,
  restartTouch: `${tru}/restart`,
  deleteLandmark: `${tru}/landmark/delete`,
  undoTouch: `${tru}/undo/touch`,
  enterTaskReg: `${tru}/entertask`,
  registrationTouchHelpImage: `${gui}/static/media/Touch_help.38c9a0a8e2bb3fd54dfb.png`
} as const
