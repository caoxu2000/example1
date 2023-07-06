import * as equipmentSteps from './equipment-steps'
import * as instrumentSteps from './instrument-steps'
import * as patientSteps from './patient-steps'
import * as plansAndAnnotationsSteps from './plans-and-annotations-steps'
import * as registrationSteps from './registration-steps'
import { wrapConsoleLog } from '@util/wrap-console-log'

export const commonSetupSteps = {
  ...wrapConsoleLog<typeof equipmentSteps>(
    'commonSetup.equipmentSteps',
    equipmentSteps
  ),
  ...wrapConsoleLog<typeof instrumentSteps>(
    'commonSetup.instrumentSteps',
    instrumentSteps
  ),
  ...wrapConsoleLog<typeof patientSteps>(
    'commonSetup.patientSteps',
    patientSteps
  ),
  ...wrapConsoleLog<typeof plansAndAnnotationsSteps>(
    'commonSetup.plansAndAnnotationsSteps',
    plansAndAnnotationsSteps
  ),
  ...wrapConsoleLog<typeof registrationSteps>(
    'commonSetup.registrationSteps',
    registrationSteps
  )
}
