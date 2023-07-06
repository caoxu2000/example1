import { wrapConsoleLog } from '@util/wrap-console-log'
import { facetObject } from './facetDrawer.objects'

export const facetDrawer = {
  ...wrapConsoleLog<typeof facetObject>(
    'spine-planning.drawers.facetDrawer.object',
    facetObject
  )
}
