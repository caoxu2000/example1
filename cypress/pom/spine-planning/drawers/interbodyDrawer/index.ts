import { wrapConsoleLog } from '@util/wrap-console-log'
import { interbodyObject } from './interbodyDrawer.objects'
import * as opt from './interbodyDrawer.options'

export const interbodyDrawer = {
  ...wrapConsoleLog<typeof interbodyObject>(
    'spine-planning.drawers.interbodyDrawer.object',
    interbodyObject
  ),
  opt
}
