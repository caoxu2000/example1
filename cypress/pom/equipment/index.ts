import { object } from './equipment.objects'
import { action } from './equipment.actions'
import { assert } from './equipment.asserts'
import * as opt from './equipment.options'
import { wrapConsoleLog } from '@util/wrap-console-log'

export const equipment = {
  ...wrapConsoleLog<typeof object>('equipment.object', object),
  action: wrapConsoleLog<typeof action>('equipment.action', action),
  assert: wrapConsoleLog<typeof assert>('equipment.assert', assert),
  opt
}
