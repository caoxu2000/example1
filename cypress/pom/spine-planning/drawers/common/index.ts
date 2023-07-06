import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './drawers.objects'
import { action } from './drawers.actions'
import * as opt from './drawer.options'
import { screwDrawer } from '../screwDrawer'
import { interbodyDrawer } from '../interbodyDrawer'
import { trajectoryDrawer } from '../trajectoryDrawer'
import { facetDrawer } from '../facetDrawer'

export const drawers = {
  ...wrapConsoleLog<typeof object>(
    'spine-planning.drawers.common.object',
    object
  ),
  action: wrapConsoleLog<typeof action>(
    'spine-planning.drawers.common.action',
    action
  ),
  screwDrawer,
  interbodyDrawer,
  trajectoryDrawer,
  facetDrawer,
  opt
}
