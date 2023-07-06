import { object } from '../common/drawers.objects'

import { pom } from './type/screw-drawer'
import { cyGui } from '@util/type/cyGui'
import { ScrewSide } from './screwDrawer.options'

export const screwObject = {
  ...object,

  /**
   * Returns the Screws drawer button
   * @return {cyGui<pom.spinePlanning.drawers.screwDrawer.screwsDrawerIcon>} : HTML element of the Screws drawer button
   */
  screwsDrawer(): cyGui<pom.spinePlanning.drawers.screwDrawer.screwsDrawerIcon> {
    return cy.findByRole('button', { name: 'Screws', exact: true })
  },

  /**
   * Returns the button to create a new screw
   * TODO: See JUNO-13155: change all plus/add buttons in spine planning to have the same name and remove addNewScrew object (screw is currently 'circle-plus', while interbody, trajectory, and facet all have 'add-new')
   * TODO: See JUNO-13155: add a test-id for this button. Currently have to use findByTitle because the name for findByRole changes when there are existing screws in the plan vs no screws currently in plan
   * @return {cyGui<pom.spinePlanning.drawers.screwDrawer.addNewScrew>} : HTML element of the create new screw button
   */
  addNewScrew(): cyGui<pom.spinePlanning.drawers.screwDrawer.addNewScrew> {
    return cy.findByTitle('circle-plus', { exact: true }).parent()
  },

  /**
   * Returns the specified button to add either a Right Screw or Left Screw
   * Note that the add new screw (plus button) must be selected in the Screws drawer in order to access this element
   * @param {string} screwSide : the side to add a screw to ('Left Screw' or 'Right Screw') - see options in screw drawer sub POM
   * @return {cyGui<pom.spinePlanning.drawers.screwDrawer.addNewScrewaddScrew>} : HTML element of the button to add specified Right Screw or Left Screw button
   */
  addScrew(
    screwSide: ScrewSide
  ): cyGui<pom.spinePlanning.drawers.screwDrawer.addScrew> {
    return cy.findByRole('menuitem', { name: screwSide, exact: true })
  }
}
