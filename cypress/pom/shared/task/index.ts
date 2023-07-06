import { wrapConsoleLog } from '@util/wrap-console-log'
import { next, previous } from './task.actions'

export const task = {
  next: wrapConsoleLog<typeof next>('shared.task.next', next),
  previous: wrapConsoleLog<typeof previous>('shared.task.previous', previous)
}
