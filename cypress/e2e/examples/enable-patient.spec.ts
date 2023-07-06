import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'

import { util } from '@util/index'
import { guiRoutes } from '@util/assert/config'

import { demoLee as patient } from '@fixtures/patients'

describe('Example spec for getPatientList and enablePatient utilities', () => {
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
  })

  it('Get patient list and enable patient', () => {
    images.media.action.searchAndDownload(patient.examList.ct)
    images.thisStealth.action.selectThisStealth()
    util.enablePatient(patient)
  })
})
