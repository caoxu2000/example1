import { object } from '../common/drawers.objects'

import { pom } from './type/trajectory-drawer'
import { cyGui } from '@util/type/cyGui'

export const trajectoryObject = {
  ...object,

  /**
   * Returns the Trajectories drawer button
   * @return {cyGui<pom.spinePlanning.drawers.trajectoryDrawer.trajectoryDrawerIcon>} : HTML element of the Trajectories drawer button
   */
  trajectoryDrawerIcon(): cyGui<pom.spinePlanning.drawers.trajectoryDrawer.trajectoryDrawerIcon> {
    return cy.findByRole('button', { name: 'Trajectories', exact: true })
  }
}
