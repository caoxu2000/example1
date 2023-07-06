import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './robot-controls.objects'
import * as opt from './robot-controls.options'

export const robotControls = {
  ...wrapConsoleLog<typeof object>(
    'spine-planning.robot-controls.object',
    object
  ),
  opt
}
