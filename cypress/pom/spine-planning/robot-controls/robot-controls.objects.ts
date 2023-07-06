import { pom } from './type/robot-controls'
import { cyGui } from '@util/type/cyGui'

export const object = {
  /**
   * Returns the dropdown for predefined robotic arm positions
   * TODO: See JUNO-13155: Add testid to this button
   * @return {cyGui<pom.spinePlanning.robotControls.predefinedArmPositionDropdown>} : HTML element of the predefined robotic arm positions dropdown
   */
  predefinedArmPositionDropdown(): cyGui<pom.spinePlanning.robotControls.predefinedArmPositionDropdown> {
    return cy
      .findAllByRole('button', { name: 'Without label', exact: true })
      .first()
  },

  /**
   * Returns the button to select the desired predefined positon from the dropdown
   * Note that the predefined position dropdown needs to be selected in order to access this element
   * @param {string} predefinedPosition: the desired predefined position to send the arm to, options are found in robot-controls index file
   * @return {cyGui<pom.spinePlanning.robotControls.selectPredefinedArmPosition>} : HTML element of the button to select the desired predefined position
   */
  selectPredefinedArmPosition(
    predefinedPosition: string
  ): cyGui<pom.spinePlanning.robotControls.selectPredefinedArmPosition> {
    return cy
      .findByRole('listbox', { exact: true })
      .findByText(predefinedPosition, { exact: true })
  },

  /**
   * Returns the button to send the arm to the selected predefined position
   * @return {cyGui<pom.spinePlanning.robotControls.sendArmPredefinedPosition>} : HTML element of the button to send the arm to the selected predefined position
   */
  sendArmPredefinedPosition(): cyGui<pom.spinePlanning.robotControls.sendArmPredefinedPosition> {
    // TODO: See JUNO-13114 - add test-id for send arm buttons to better distinguish between them
    return cy.findAllByRole('button', { name: 'Send Arm', exact: true }).first()
  },

  /**
   * Returns the dropdown for the relative robotic arm positions dropdown
   * //TODO: See JUNO-13114 : add test id to this button
   * @return {cyGui<pom.spinePlanning.robotControls.relativeArmPositionDropdown>} : HTML element of the relative robotic arm positions dropdown
   */
  relativeArmPositionDropdown(): cyGui<pom.spinePlanning.robotControls.relativeArmPositionDropdown> {
    return cy
      .findAllByRole('button', { name: 'Without label', exact: true })
      .last()
  },

  /**
   * Returns the button to select the desired relative positon from the dropdown
   * Note that the relative position dropdown needs to be selected in order to access this element
   * @param {string} relativePosition: the desired relative position to send the arm to, options are found in robot-controls index file
   * @return {cyGui<pom.spinePlanning.robotControls.selectRelativeArmPosition>} : HTML element of button to select the desired relative positon
   */
  selectRelativeArmPosition(
    relativePosition: string
  ): cyGui<pom.spinePlanning.robotControls.selectRelativeArmPosition> {
    return cy
      .findByRole('listbox', { exact: true })
      .findByText(relativePosition, { exact: true })
  },

  /**
   * Returns the button to send the arm to the selected relative position
   * @return {cyGui<pom.spinePlanning.robotControls.sendArmRelativePosition>} : HTML element of the button to send the arm to the selected relative position
   */
  sendArmRelativePosition(): cyGui<pom.spinePlanning.robotControls.sendArmRelativePosition> {
    // TODO: See JUNO-13114 - add test-id for send arm buttons to better distinguish between them
    return cy.findAllByRole('button', { name: 'Send Arm', exact: true }).last()
  },

  /**
   * Returns the manual arm up arrow button
   * @return {cyGui<pom.spinePlanning.robotControls.manualArmUp>} : HTML element of the manual arm up arrow button
   */
  manualArmUp(): cyGui<pom.spinePlanning.robotControls.manualArmUp> {
    return cy.findByRole('button', { name: 'arrow-up3', exact: true })
  },

  /**
   * Returns the manual arm down arrow button
   * @return {cyGui<pom.spinePlanning.robotControls.manualArmDown>} : HTML element of the manual arm down arrow button
   */
  manualArmDown(): cyGui<pom.spinePlanning.robotControls.manualArmDown> {
    return cy.findByRole('button', { name: 'arrow-down3', exact: true })
  },

  /**
   * Returns the the next component button
   * @return {cyGui<pom.spinePlanning.robotControls.nextComponent>} : HTML element of the next component button
   */
  nextComponent(): cyGui<pom.spinePlanning.robotControls.nextComponent> {
    return cy.findByRole('button', { name: 'Next Component', exact: true })
  }
}
