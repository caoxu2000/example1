import { wrapConsoleLog } from '@util/wrap-console-log'
import { action } from './login.actions'
import { object } from './login.objects'

export const login = {
  ...wrapConsoleLog<typeof object>('login.object', object),
  action: wrapConsoleLog<typeof action>('login.action', action)
}
