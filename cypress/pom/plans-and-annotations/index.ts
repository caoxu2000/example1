import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './plans-and-annotations.actions'
import { object } from './plans-and-annotations.objects'
import { assert } from './plans-and-annotations.asserts'
import * as opt from './plans-and-annotations.options'

export const planAndAnnotation = {
  ...wrapConsoleLog<typeof object>('plans-and-annotations.object', object),
  action: wrapConsoleLog<typeof action>('plans-and-annotations.action', action),
  assert: wrapConsoleLog<typeof assert>('plans-and-annotations.assert', assert),
  opt
}
