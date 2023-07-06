import { api } from '../api-routes'
import { ApiMethods } from '../option/ApiMethods'

type path = typeof api[keyof typeof api]

export type aliasRoute = {
  path: path
  name: string
  method: ApiMethods
}

// TODO: JUNO-28607 - split this file by task/feature to make it more manageable
/**
 * Description: Wraps api-routes in a name with an alias
 */

export const alias: Record<string, aliasRoute> = {
  // api call used to search for exam in images tab
  dicomSearch: {
    path: api.dicomSearch,
    name: 'dicomSearch',
    method: ApiMethods.POST
  },
  // api call used to download an exam from images tab
  dicomImport: {
    path: api.dicomImport,
    name: 'dicomImport',
    method: ApiMethods.POST
  },
  // api call that selects clicked exam
  detail: {
    path: api.detail,
    name: 'detail',
    method: ApiMethods.GET
  },
  // api call that loads the exam thumbnails
  thumbnail: {
    path: api.thumbnail,
    name: 'thumbnail',
    method: ApiMethods.GET
  },
  // api call that adds a new plan
  newPlan: {
    path: api.plans,
    name: 'newPlan',
    method: ApiMethods.POST
  },
  // api call that adds a new annotation
  newAnnotation: {
    path: api.newAnnotation,
    name: 'newAnnotation',
    method: ApiMethods.POST
  },
  // api call that clones a patient
  clone: {
    path: api.clone,
    name: 'clone',
    method: ApiMethods.POST
  },
  // api call that adds a tool in the instruments page
  addTool: {
    path: api.addOrRemoveTool,
    name: 'addTool',
    method: ApiMethods.POST
  },
  // api call that removes a tool from the instruments page
  removeTool: {
    path: api.addOrRemoveTool,
    name: 'removeTool',
    method: ApiMethods.PUT
  },
  // app call that loads the images of instruments currently used in procedure
  instrumentProcedureImage: {
    path: api.instrumentProcedureImage,
    name: 'instrumentProcedureImage',
    method: ApiMethods.GET
  },
  // app call that loads the images of available instruments for a selected procedure
  instrumentAvailableImage: {
    path: api.instrumentAvailableImage,
    name: 'instrumentAvailableImage',
    method: ApiMethods.GET
  },
  // api call that adds an implant in spine planning
  addImplant: {
    path: api.addImplant,
    name: 'addImplant',
    method: ApiMethods.PUT
  },
  // api call that deletes an implant in spine planning
  deleteImplant: {
    path: api.deleteImplant,
    name: 'deleteImplant',
    method: ApiMethods.DELETE
  },
  // api call that gives a list of patients
  patients: {
    path: api.patientImages,
    name: 'patients',
    method: ApiMethods.GET
  },
  // api call that specifies possible procedures
  cases: {
    path: api.procedures,
    name: 'cases',
    method: ApiMethods.GET
  },
  // api call that restarts touch registration
  restartTouch: {
    path: api.restartTouch,
    name: 'restartTouch',
    method: ApiMethods.PUT
  },
  // api call that deletes touch registration landmark
  deleteLandmark: {
    path: api.deleteLandmark,
    name: 'deleteLankmark',
    method: ApiMethods.DELETE
  },
  // api call that undoes a touch point
  undoTouch: {
    path: api.undoTouch,
    name: 'undoTouch',
    method: ApiMethods.PUT
  },
  // api call for entering instruments task
  enterInstruments: {
    path: api.enterInstruments,
    name: 'enterInstruments',
    method: ApiMethods.POST
  },
  // api call for entering equipment task
  enterEquipment: {
    path: api.enterEquipment,
    name: 'enterEquipment',
    method: ApiMethods.POST
  },
  // api call for entering registration task
  enterTaskReg: {
    path: api.enterTaskReg,
    name: 'enterTaskReg',
    method: ApiMethods.POST
  },
  // api call that changes view in view pane
  changeView: {
    path: api.changeView,
    name: 'changeView',
    method: ApiMethods.POST
  },
  // api call that updates slider position
  sliderUpdate: {
    path: api.sliderUpdate,
    name: 'sliderUpdate',
    method: ApiMethods.PUT
  },
  // api call that saves the layout selection
  saveLayout: {
    path: api.saveLayout,
    name: 'saveLayout',
    method: ApiMethods.POST
  },
  // api call to change layout option in preset
  previewLayout: {
    path: api.previewLayout,
    name: 'previewLayout',
    method: ApiMethods.PUT
  },
  createEquipment: {
    path: api.createEquipment,
    name: 'createEquipment',
    method: ApiMethods.PUT
  },
  addEquipment: {
    path: api.addEquipment,
    name: 'addEquipment',
    method: ApiMethods.POST
  },
  removeEquipment: {
    path: api.removeEquipment,
    name: 'removeEquipment',
    method: ApiMethods.POST
  },
  deleteEquipment: {
    path: api.deleteEquipment,
    name: 'deleteEquipment',
    method: ApiMethods.DELETE
  },
  // api call that checks authentication
  authCheck: {
    path: api.authCheck,
    name: 'authCheck',
    method: ApiMethods.GET
  },
  registrationTouchHelpImage: {
    path: api.registrationTouchHelpImage,
    name: 'registrationTouchHelpImage',
    method: ApiMethods.GET
  }
}
