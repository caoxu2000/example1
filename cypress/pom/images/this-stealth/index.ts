import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './this-stealth.objects'
import { action } from './this-stealth.actions'

/**
 * This Stealth tab of the Images task
 */
export const thisStealth = {
  ...wrapConsoleLog<typeof object>('images.this-stealth.object', object),
  action: wrapConsoleLog<typeof action>('images.this-stealth.action', action)
}
