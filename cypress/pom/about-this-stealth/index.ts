import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './about-this-stealth.actions'
import { object } from './about-this-stealth.objects'
import { assert } from './about-this-stealth.asserts'
import * as opt from './about-this-stealth.options'

export const aboutThisStealth = {
  ...wrapConsoleLog<typeof object>('about-this-stealth.object', object),
  action: wrapConsoleLog<typeof action>('about-this-stealth.action', action),
  assert: wrapConsoleLog<typeof assert>('about-this-stealth.assert', assert),
  opt
}
