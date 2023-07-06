import { object } from '../common/drawers.objects'

import { pom } from './type/interbody-drawer'
import { cyGui } from '@util/type/cyGui'

export const interbodyObject = {
  ...object,

  /**
   * Returns the Interbodies drawer button
   * @return {cyGui<pom.spinePlanning.drawers.interbodyDrawer.interbodyDrawerIcon>} : HTML element of the Interbodies drawer button
   */
  interbodyDrawerIcon(): cyGui<pom.spinePlanning.drawers.interbodyDrawer.interbodyDrawerIcon> {
    return cy.findByRole('button', { name: 'Interbodies', exact: true })
  }
}
