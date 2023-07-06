import { commonAction } from './common.actions'
import { commonObject } from './common.objects'

import { wrapConsoleLog } from '@util/wrap-console-log'

export const common = {
  ...wrapConsoleLog<typeof commonObject>('images.common.object', commonObject),
  action: wrapConsoleLog<typeof commonAction>(
    'images.common.actions',
    commonAction
  )
}
