import { pom } from './type/equipment'
import { cyGui } from '@util/type/cyGui'
import { toTestIdFormat } from '@util/stringFormats'
const language = Cypress.env('allLanguages')

export const object = {
  /**
   * Returns the list of equipment cards added to the procedure
   * @return {cyGui<pom.equipment.equipmentListInProcedure>}: HTML element of the equipment card list
   */
  equipmentListInProcedure(): cyGui<pom.equipment.equipmentListInProcedure> {
    return cy.findByTestId('equipment-ip-list', { exact: true })
  },

  /**
   * Returns a specified equipment card that has been added to the procedure. This will NOT work with the optical camera and robot cart equipment
   * @param {string} equipmentName: Display name of the desired equipment card
   * @return {cyGui<pom.equipment.equipmentCard>}: HTML element of the selected equipment card
   */
  equipmentCardInProcedure(
    equipmentName: string
  ): cyGui<pom.equipment.equipmentCard> {
    return object
      .equipmentListInProcedure()
      .findByText(equipmentName, { exact: true })
      .parents('[data-testid="equipment-card-ip"]')
  },

  /**
   * Returns a title box of the specified equipment card that has been added to the procedure
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.equipmentCardTitleBox>}: HTML element of the equipment card title box
   */
  equipmentCardTitleBox(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.equipmentCardTitleBox> {
    return cy.wrap(equipmentCard).findByTestId('equipment-card-inner')
  },

  /**
   * Returns the remove from procedure button (x button) of a specified equipment card
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.removeCard>}: HTML element of the remove from procedure button
   */
  removeCard(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.removeCard> {
    return cy
      .wrap(equipmentCard)
      .findByRole('button', { name: 'remove-card', exact: true })
  },

  /**
   * Returns the gear control button that expands and collapses the equipment card information
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.gearIcon>}: HTML element of the gear control button
   */
  gearIcon(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.gearIcon> {
    return cy
      .wrap(equipmentCard)
      .findByRole('button', { name: 'gear-control-button', exact: true })
  },

  /**
   * Returns the Registration field in the expandable/collapsible fields of the equipment card
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.registrationField>}: HTML element of the Registration field
   */
  registrationField(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.registrationField> {
    return cy
      .wrap(equipmentCard)
      .find('[value="Registration"]')
      .parents('[data-testid="equipment-drawer-box"]')
      .findByTestId('textinput-input', { exact: true })
  },

  /**
   * Returns the description field of Current Error box in the expandable/collapsible fields of the equipment card
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.currentError>}: HTML element of the Current Error field
   */
  currentError(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.currentError> {
    return (
      cy
        .wrap(equipmentCard)
        // TODO: Update test-id if necessary when these errors are back in the app (not present in EB 2001)
        .findByTestId('error-box-description', { exact: true })
    )
  },

  /**
   * Returns the optical camera cart object which has been added to the procedure
   * @return {cyGui<pom.equipment.cart>}: HTML element of the camera cart
   */
  cameraCart(): cyGui<pom.equipment.cart> {
    return cy.findByTestId('camera-cart', { exact: true })
  },

  /**
   * Returns the robot cart object which has been added to the procedure
   * @return {cyGui<pom.equipment.cart>}: HTML element of the robot cart
   */
  robotCart(): cyGui<pom.equipment.cart> {
    return cy.findByTestId('robot-cart', { exact: true })
  },

  /**
   * Returns the cart connection line for a provided cart
   * @param {cyGui<pom.equipment.cart>} cart: Cart with cart connection line
   * @return {cyGui<pom.equipment.cartConnection>}: HTML element of the cart connection line
   */
  cartConnection(
    cart: pom.equipment.cart
  ): cyGui<pom.equipment.cartConnection> {
    // TODO: JUNO-24986 - move the test-id for cart-connection down a level so the connectionLineIsConnected assert doesn't have to use children().children()
    return cy.wrap(cart).findByTestId('cart-connection', { exact: true })
  },

  /**
   * Returns the remove from procedure button (x button) of the camera or robot cart
   * @param {cyGui<pom.equipment.cart>} cart: HTML element of the camera or robot cart
   * @return {cyGui<pom.equipment.removeCart>}: HTML element of the remove from procedure button
   */
  removeCart(cart: pom.equipment.cart): cyGui<pom.equipment.removeCart> {
    return cy
      .wrap(cart)
      .findByRole('button', { name: 'remove-cart', exact: true })
  },

  /**
   * Returns the details button of the camera or robot cart
   * @param {cyGui<pom.equipment.cart>} cart: HTML element of the camera or robot cart
   * @return {cyGui<pom.equipment.detailsButton>}: HTML element of the details button
   */
  detailsButton(cart: pom.equipment.cart): cyGui<pom.equipment.detailsButton> {
    return cy.wrap(cart).findByRole('button', { name: 'Details', exact: true })
  },

  /**
   * Returns the Details popup element that appears after the details button is clicked
   * @param {cyGui<pom.equipment.cart>} cart: HTML element of the camera or robot cart
   * @return {cyGui<pom.equipment.detailsPopup>}: HTML element of the details popup
   */
  detailsPopup(cart: pom.equipment.cart): cyGui<pom.equipment.detailsPopup> {
    return cy
      .wrap(cart)
      .findByTestId('camera-robot-cart-group', { exact: true })
  },

  /**
   * Returns the text field of the Details popup
   * @param {cyGui<pom.equipment.cart>} cart: HTML element of the camera or robot cart
   * @return {cyGui<pom.equipment.detailsText>}: HTML element of the details text field
   */
  detailsText(cart: pom.equipment.cart): cyGui<pom.equipment.detailsText> {
    return cy.wrap(cart).findByTestId('details-text', { exact: true })
  },

  /**
   * Returns the close button (x button) of the Details popup object
   * @param {cyGui<pom.equipment.cart>} cart: HTML element of the camera or robot cart
   * @return {cyGui<pom.equipment.detailsClose>}: HTML element of the close button
   */
  detailsClose(cart: pom.equipment.cart): cyGui<pom.equipment.detailsClose> {
    return cy
      .wrap(cart)
      .findByRole('button', { name: 'close-details', exact: true })
  },

  /**
   * Returns the right panel which contains the search bar and list of available equipment
   * @return {cyGui<pom.equipment.rightPanel>}: HTML element of the right panel
   */
  rightPanel(): cyGui<pom.equipment.rightPanel> {
    return cy.findByTestId('RightPanel', { exact: true })
  },

  /**
   * Returns the title of right panel
   * @return {cyGui<pom.equipment.rightPanelTitle>}: HTML element of the right panel title
   */
  rightPanelTitle(): cyGui<pom.equipment.rightPanelTitle> {
    return cy.findByTestId('right-panel-text', { exact: true })
  },

  /**
   * Returns the search bar to search for equipment to add to the procedure
   * @return {cyGui<pom.equipment.searchBar>}: HTML element of the search bar
   */
  searchBar(): cyGui<pom.equipment.searchBar> {
    return object.rightPanel().findByRole('textbox')
  },

  /**
   * Returns the icon to clear the search bar
   * Text must be typed in the search bar for the icon to appear
   * @return {cyGui<pom.equipment.clearSearchIcon>}: HTML element of the clear search bar icon
   */
  clearSearchIcon(): cyGui<pom.equipment.clearSearchIcon> {
    return cy.findByTestId('clear-input', { exact: true })
  },

  /**
   * Returns the scrollable list of available equipment
   * @return {cyGui<pom.equipment.availableEquipmentList>}: HTML element of the scrollable list of available equipment
   */
  availableEquipmentList(): cyGui<pom.equipment.availableEquipmentList> {
    return cy.findByTestId('scrollable-list', { exact: true })
  },

  /**
   * Returns the equipment card of the specified equipment in the right panel/available equipment list
   * @param {string} equipmentName: Display name of the desired equipment card
   * @param {string} identifier: Optional secondary label in equipment card that takes in the ip address
   * @return {cyGui<pom.equipment.equipmentCard>}: HTML element of the selected equipment card
   */
  equipmentCardInList(
    equipmentName: string,
    identifier?: string
  ): cyGui<pom.equipment.equipmentCard> {
    let testid = 'equipment-card-av'
    if (identifier) {
      testid = testid + `-${identifier}`
    }
    return object
      .availableEquipmentList()
      .findAllByText(equipmentName, { exact: true })
      .parents(`[data-testid="${testid}"]`)
  },

  /**
   * Returns the set up equipment card for scanners in the right panel/available equipment list
   * @param {string} equipmentName: Display name of the set up equipment card
   * @return {cyGui<pom.equipment.equipmentCard>}: HTML element of the selected equipment card
   */
  setUpEquipmentCard(
    equipmentName: string
  ): cyGui<pom.equipment.equipmentCard> {
    const testid = `equipment-setup-${toTestIdFormat(equipmentName)}`
    return object
      .availableEquipmentList()
      .findByText(equipmentName, { exact: true })
      .parents(`[data-testid="${testid}"]`)
  },

  /**
   * Returns the button to add an equipment to the procedure
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.addToProcedure>}: HTML element of the add button
   */
  addToProcedure(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.addToProcedure> {
    return cy.wrap(equipmentCard).findByText('ADD', { exact: true })
  },

  /**
   * Returns the set up button for set up equipment cards in the right panel. The button text toggles from set up to cancel once clicked
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.setUpCancel>}: HTML element of the set up button
   */
  setUp(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.setUpCancel> {
    return cy
      .wrap(equipmentCard)
      .findByRole('button', { name: 'setup-cancel', exact: true })
  },

  /**
   * Returns the cancel button for set up equipment cards in the right panel. The button text toggles from cancel to set up once clicked
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.setUpCancel>}: HTML element of the cancel button
   */
  cancelSetUp(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.setUpCancel> {
    return object.setUp(equipmentCard)
  },

  /**
   * Returns the expandable/collapsible equipment name field for set up equipment cards and procedure cards
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.textInput>}: HTML element of the name field
   */
  equipmentName(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.textInput> {
    return cy
      .wrap(equipmentCard)
      .findByTestId('name-input', { exact: true })
      .findByTestId('textinput-input', { exact: true })
  },

  /**
   * Returns the expandable/collapsible tracker serial number field for set up equipment cards and
   * equipment cards in procedure created by set up cards
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.textInput>}: HTML element of the ip address field
   */
  trackerSerial(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.textInput> {
    return cy
      .wrap(equipmentCard)
      .findByTestId('tracker-serial-input', { exact: true })
      .findByTestId('textinput-input', { exact: true })
  },

  /**
   * Returns the expandable/collapsible ip address field for set up equipment cards and equipment cards
   * in procedure created by set up cards
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.textInput>}: HTML element of the ip address field
   */
  ipAddress(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.textInput> {
    return cy
      .wrap(equipmentCard)
      .findByTestId('ip-input', { exact: true })
      .findByTestId('textinput-input', { exact: true })
  },

  /**
   * Returns the clear text x button in the text input fields in set up equipment cards
   * @param {pom.equipment.textInput} textInput: HTML element of the selected text input field
   * @return {cyGui<pom.equipment.clearInput>}: HTML element of the clear text button
   */
  clearInput(
    textInput: pom.equipment.textInput
  ): cyGui<pom.equipment.clearInput> {
    return cy
      .wrap(textInput)
      .parents()
      .findByTestId('clear-input', { exact: true })
  },

  /**
   * Returns the error text box for expandable/collapsible fields in set up equipment cards
   * An error is displayed if a serial number or IP is submitted with incorrect formatting for set up equipment cards in the right panel
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.setUpError>}: HTML element of the error text box
   */
  setUpError(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.setUpError> {
    return cy.wrap(equipmentCard).findByTestId('error-message')
  },

  /**
   * Returns the Cancel button in the inner expandable/collapsible fields for set up equipment cards in the right panel
   * This is different from the main cancel button which toggles with the set up button
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.innerCancelButton>}: HTML element of the Cancel button
   */
  innerCancelButton(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.innerCancelButton> {
    return cy
      .wrap(equipmentCard)
      .findByTestId('button-box', { exact: true })
      .findByRole('button', { name: 'Cancel', exact: true })
  },

  /**
   * Returns the Add To Equipment button in the expandable/collapsible set up fields for set up equipment cards in the right panel
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.setUpAddToEquipmentButton>}: HTML element of the Add To Equipment button
   */
  setUpAddToEquipmentButton(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.setUpAddToEquipmentButton> {
    return cy
      .wrap(equipmentCard)
      .findByRole('button', { name: 'Add to Equipment', exact: true })
  },

  /**
   * Returns the Delete button in the expandable/collapsible fields of equipment cards created from setup cards
   * @param {pom.equipment.equipmentCard} equipmentCard: HTML element of the selected equipment card
   * @return {cyGui<pom.equipment.deleteButton>}: HTML element of the Delete button
   */
  deleteButton(
    equipmentCard: pom.equipment.equipmentCard
  ): cyGui<pom.equipment.deleteButton> {
    return cy.wrap(equipmentCard).findByText('DELETE', { exact: true })
  },

  /**
   * Returns the Done button to close the Equipment Task and return to the previous task
   * @return {cyGui<pom.equipment.done>}: HTML element of the done button
   */
  done(): cyGui<pom.equipment.done> {
    return cy.findByText(
      language[Cypress.env('language')]['SmartPrompt.done'].defaultMessage,
      { exact: true }
    )
  }
}
