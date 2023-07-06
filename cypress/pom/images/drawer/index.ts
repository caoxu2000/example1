import { object } from './drawer.objects'
import { action } from './drawer.actions'

import { wrapConsoleLog } from '@util/wrap-console-log'

export const drawer = {
  ...wrapConsoleLog<typeof object>('images.drawer.objects', object),
  action: wrapConsoleLog<typeof action>('images.drawer.actions', action)
}
