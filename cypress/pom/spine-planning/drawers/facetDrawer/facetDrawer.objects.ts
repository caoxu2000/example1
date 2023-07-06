import { object } from '../common/drawers.objects'

import { pom } from './type/facet-drawer'
import { cyGui } from '@util/type/cyGui'

export const facetObject = {
  ...object,

  /**
   * Returns the Facet Decortications drawer button
   * @return {cyGui<pom.spinePlanning.drawers.facetDrawer.facetDrawerIcon>} : HTML element of the Facet Decortications drawer button
   */
  facetDrawerIcon(): cyGui<pom.spinePlanning.drawers.facetDrawer.facetDrawerIcon> {
    return cy.findByRole('button', {
      name: 'Facet Decortications',
      exact: true
    })
  }
}
