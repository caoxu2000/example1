import { wrapConsoleLog } from '@util/wrap-console-log'
import { screwObject } from './screwDrawer.objects'
import * as opt from './screwDrawer.options'

export const screwDrawer = {
  ...wrapConsoleLog<typeof screwObject>(
    'spine-planning.drawers.screwDrawer.object',
    screwObject
  ),
  opt
}
