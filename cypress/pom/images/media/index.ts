import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './media.objects'
import { action } from './media.actions'

/**
 * Media tab of the Images task
 */

export const media = {
  ...wrapConsoleLog<typeof object>('images.media.object', object),
  action: wrapConsoleLog<typeof action>('images.media.action', action)
}
