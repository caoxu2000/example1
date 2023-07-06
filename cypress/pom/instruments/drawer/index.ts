import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './drawer.actions'
import { object } from './drawer.objects'
import { assert } from './drawer.asserts'
import * as opt from './drawer.options'

export const drawer = {
  ...wrapConsoleLog<typeof object>('instruments.drawer.object', object),
  action: wrapConsoleLog<typeof action>('instruments.drawer.action', action),
  assert: wrapConsoleLog<typeof assert>('instruments.drawer.assert', assert),
  opt
}
