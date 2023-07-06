import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './registration.actions'
import { object } from './registration.objects'
import { assert } from './registration.asserts'
import * as opt from './registration.options'

export const registration = {
  ...wrapConsoleLog<typeof object>('manual-registration.object', object),
  action: wrapConsoleLog<typeof action>('manual-registration.action', action),
  assert: wrapConsoleLog<typeof assert>('manual-registration.assert', assert),
  opt
}
