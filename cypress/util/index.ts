// general utilities
import { exit } from './exit-procedure'
import { cleanPatientDb } from './clean-patient-db'
import { getPatientList } from './get-patient-list'
import { enablePatient } from './enable-patient'
import { commonSetup } from './common-setup/common-setup'
import {
  createImageTouchPoints,
  defineNavTouchLocations
} from './simulate/manualRegistration'
import { simulateTrackingView } from './simulate/simulate-tracking-view'
import { simulateRobot } from './simulate/simulate-robot'
import { sshExe } from './ssh-exe'
import { auth } from './auth'
import { request } from './request'
import { generateEndpoint } from './generate-endpoint'
import * as cameraSimulator from './camera-sim'
import { intercept } from './intercept'
import { takeAndCompareScreenshot } from './take-and-compare-screenshot'
import { wrapConsoleLog } from './wrap-console-log'

// global asserts
import { assert } from './assert'

/**
 * Set of cypress dependent functions to be used globally
 */
export const util = {
  exit,
  cleanPatientDb,
  getPatientList,
  enablePatient,
  commonSetup,
  createImageTouchPoints,
  defineNavTouchLocations,
  simulateTrackingView,
  simulateRobot,
  assert,
  sshExe,
  auth,
  request,
  generateEndpoint,
  cameraSimulator,
  intercept,
  takeAndCompareScreenshot,
  wrapConsoleLog
}
