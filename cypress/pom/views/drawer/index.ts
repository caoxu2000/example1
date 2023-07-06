import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './drawer.objects'
import { action } from './drawer.actions'
import { assert } from './drawer.asserts'
import * as opt from './drawer.options'

export const drawer = {
  ...wrapConsoleLog<typeof object>('views.drawer.object', object),
  action: wrapConsoleLog<typeof action>('views.drawer.action', action),
  assert: wrapConsoleLog<typeof assert>('views.drawer.assert', assert),
  opt
}
