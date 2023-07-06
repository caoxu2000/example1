import { availableProcedures } from '@pom/select-procedure/procedure.options'
import { equipment as equipmentList } from '@pom/equipment/equipment.options'
import {
  CategoryButtons,
  AngleMeasurementButtons
} from '@pom/plans-and-annotations/plans-and-annotations.options'
import { menuOptions } from '@pom/shared/menu/menu.options'

import { setup } from '@fixtures/type/setup'
import { demoLee } from '@fixtures/patients'
import { imagePoints, navPoints } from '@fixtures/regPoints'

import { guiRoutes } from '@util/assert/config'
import { util } from '@util'

import { instruments as instrumentsList } from '@global-config/instruments'

describe('Common Setup Util', () => {
  before(() => {
    // define setup config to be used by the commonSetup() util
    // TODO: JUNO-23723 - create an object for all expected registration accuracies
    const setup: setup = {
      procedure: availableProcedures.biopsy,
      patient: demoLee,
      series: [demoLee.examList.mr],
      registration: {
        method: 'TOUCH',
        imagePoints: imagePoints.demoLeeImagePoints,
        navPoints: navPoints.demoLee1mmRegTouch,
        expectedAccuracy: '0.8'
      },
      instruments: [
        instrumentsList.passivePlanarBlunt,
        instrumentsList.navigusProbe
      ],
      equipment: [equipmentList.oArm],
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
      annotations: [
        {
          name: 'Annotation 1',
          category: CategoryButtons.ANGLE,
          type: AngleMeasurementButtons.OPEN_ANGLE
        }
      ],
      task: menuOptions.NAVIGATION
    }

    // perform set up
    util.commonSetup(setup)
  })

  it('Assert the setup util ended in Navigation', () => {
    util.assert.urlIs(guiRoutes.navigation)
  })
})
