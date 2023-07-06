import { wrapConsoleLog } from '@util/wrap-console-log'
import { trajectoryObject } from './trajectoryDrawer.objects'

export const trajectoryDrawer = {
  ...wrapConsoleLog<typeof trajectoryObject>(
    'spine-planning.drawers.trajectoryDrawer.object',
    trajectoryObject
  )
}
