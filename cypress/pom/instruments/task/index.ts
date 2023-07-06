import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './task.objects'
import { action } from './task.actions'
import { assert } from './task.asserts'
import * as opt from './task.options'

export const task = {
  ...wrapConsoleLog<typeof object>('instruments.task.object', object),
  action: wrapConsoleLog<typeof action>('instruments.task.action', action),
  assert: wrapConsoleLog<typeof assert>('instruments.task.assert', assert),
  opt
}
