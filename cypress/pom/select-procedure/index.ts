import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './procedure.objects'
import { action } from './procedure.actions'
import { assert } from './procedure.asserts'
import * as opt from './procedure.options'

export const procedure = {
  ...wrapConsoleLog<typeof object>('procedure.object', object),
  action: wrapConsoleLog<typeof action>('procedure.action', action),
  assert: wrapConsoleLog<typeof assert>('procedure.assert', assert),
  opt
}
