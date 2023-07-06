import { commonSetupSteps } from './common-setup-steps'

import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'

import { setup } from '@fixtures/type/setup'
import { util } from '@util/index'

const { _ } = Cypress

/**
 * Common test setup is done through usage of this function. This function takes a setup interface as the main argument
 * and moves the system under test through the application applying all specified argument parameters.
 * @param {setup} setup : Interface (called setup) of settings that describes how to set up the application for tests
 * @param {boolean} clean : Optional argument to clean application before running tests; it is strongly preferred that this be performed. Defaults to true
 * @param {boolean} retainEquipment : Optional argument to retain the equipment currently in the procedure. Defaults to false
 * @param {boolean} retainInstruments : Optional argument to retain the instruments currently in the procedure. Defaults to false
 * Example setup (to be defined in the before() of each spec file):
 * const setup : setup = {
            procedure: 'biopsy',
            patient: demoLee,
            series: [
                'mr',
                'ct'
            ],
            registration: {
                method: 'touch',
                imagePoints: 'demoLeeImagePoints',
                navPoints: 'demoLee1mmRegTouch'
            },
            instruments: [
                'Passive Planar, Blunt',
                'Scope Probe'
            ],
            equipment: [
                'O-arm'
            ],
            plans: [
                {
                    name: 'Plan 1',
                    entry: [1, 2, 3],
                    target: [4, 5, 6],
                    color: 'TEAL'
                },
                {
                    name: 'Plan 2',
                    entry: [10, 20, 30],
                    target: [40, 50, 60],
                    color: 'YELLOW'    
                }
            ],
            task: 'Navigation'
        }
 */
export function commonSetup(
  setup: setup,
  clean = true,
  retainEquipment = false,
  retainInstruments = false
) {
  // create a deep copy of the setup object to keep track of which steps have been completed
  const copiedSetup = _.cloneDeep(setup)

  // log in to the application
  util.auth.login()

  // clean the patient database if patients are not being retained, select procedure
  if (clean) {
    cy.log('Cleaning patient database')
    util.cleanPatientDb()
  }
  cy.visit('/')
  util.exit()
  procedure.action.select(setup.procedure)
  delete copiedSetup.procedure

  // go to Instruments task, remove instruments from procedure if not being retained, add instruments to procedure
  if (!retainInstruments) {
    commonSetupSteps.removeAllInstruments()
  }
  if (setup.instruments) {
    commonSetupSteps.addInstruments(setup.instruments)
    delete copiedSetup.instruments
  }

  // go to Equipment task, remove equipment from procedure if not being retained, add equipment to procedure
  if (!retainEquipment) {
    commonSetupSteps.removeAllEquipment()
  }
  if (setup.equipment) {
    commonSetupSteps.addEquipment(setup.equipment)
    delete copiedSetup.equipment
  }

  // go to Images task, search for and download patient and exams
  if (setup.patient) {
    commonSetupSteps.setupPatient(setup.patient, setup.series)
    delete copiedSetup.patient
    delete copiedSetup.series
  }

  // define the functions needed for the remaining possible setup steps
  const setupSteps = {
    registration: commonSetupSteps.setupRegistration,
    plans: commonSetupSteps.setupPlans,
    annotations: commonSetupSteps.setupAnnotations,
    task: menu.action.goToMenuTask
  }

  // execute the remaining tasks specified in the new setup object
  for (const task in copiedSetup) {
    setupSteps[task](copiedSetup[task])
  }

  return
}
