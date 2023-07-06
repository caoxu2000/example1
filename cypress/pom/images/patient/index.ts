import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './patient.actions'
import { object } from './patient.objects'
import * as opt from './patient.options'

/**
 * Right panel (Patient Images) of the Images task
 */
export const patient = {
  ...wrapConsoleLog<typeof object>('images.patient.object', object),
  action: wrapConsoleLog<typeof action>('images.patient.action', action),
  opt
}
