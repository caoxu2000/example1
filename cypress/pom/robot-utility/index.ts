import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './robot-utility.objects'
import { assert } from './robot-utility.asserts'
import { action } from './robot-utility.actions'
import * as opt from './robot-utility.options'

export const robotUtility = {
  ...wrapConsoleLog<typeof object>('robot-utility.object', object),
  action: wrapConsoleLog<typeof action>('robot-utility.action', action),
  assert: wrapConsoleLog<typeof assert>('robot-utility.assert', assert),
  opt
}
