import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './view-panes.objects'
import { action } from './view-panes.actions'
import { assert } from './view-panes.asserts'
import * as opt from './view-panes.options'

export const viewPanes = {
  ...wrapConsoleLog<typeof object>('views.view-panes.object', object),
  action: wrapConsoleLog<typeof action>('views.view-panes.action', action),
  assert: wrapConsoleLog<typeof assert>('views.view-panes.assert', assert),
  opt
}
