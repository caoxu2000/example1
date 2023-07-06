import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './tracking-view.objects'
import { action } from './tracking-view.actions'
import { assert } from './tracking-view.asserts'
import * as opt from './tracking-view.options'

export const trackingView = {
  ...wrapConsoleLog<typeof object>('tracking-view.object', object),
  action: wrapConsoleLog<typeof action>('tracking-view.action', action),
  assert: wrapConsoleLog<typeof assert>('tracking-view.assert', assert),
  opt
}
