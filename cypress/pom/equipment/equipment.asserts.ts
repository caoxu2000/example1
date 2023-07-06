import { pom } from './type/equipment'
import { object } from './equipment.objects'
import * as opt from './equipment.options'
import { CssColors } from '@global-config/CssColors'
import { robotUtility } from '@pom/robot-utility'

const STATUS_CONNECTED = CssColors.TRACKING_CARD_GREEN
const STATUS_DISCONNECTED = CssColors.TOOL_CARD_YELLOW
const CART_CONNECTED = CssColors.CART_CONNECTION_GREEN
const CART_DISCONNECTED = CssColors.CART_CONECTION_ORANGE

export const assert = {
  /**
   * Assert that an equipment card is in the procedure list
   * @param {string} equipmentName: Display name of the equipment card expected to be in the procedure
   * TODO: JUNO-24411: Investigate better approaches for asserting whether or not something exists
   */
  equipmentIsInProcedure(equipmentName: string) {
    object.equipmentListInProcedure().findByText(equipmentName).should('exist')
    object
      .availableEquipmentList()
      .findByText(equipmentName, { exact: true })
      .should('not.exist')
  },

  /**
   * Assert that the specified cart (camera or robot) is in the procedure
   * @param {string}  cartName: The name of the cart expected to be in procedure
   * TODO: JUNO-24411: Investigate better approaches for asserting whether or not something exists
   */
  cartIsInProcedure(cartName: string) {
    if (cartName === opt.equipment.cameraCart.name) {
      cy.findByTestId('camera-cart', { exact: true }).should('exist')
    } else if (cartName === opt.equipment.robotCart.name) {
      cy.findByTestId('robot-cart', { exact: true }).should('exist')
    } else {
      throw Error(
        'Cart: ' +
          cartName +
          ' is not defined. Only the camera cart and robot cart are defined in the app.'
      )
    }
  },

  /**
   * Assert that the specified cart is not in the procedure
   * @param {string} cartName: Name of the cart expected to not be in the procedure
   * TODO: Find a way to make object accessor work where DOM object doesn't exist. JUNO-24411
   */
  cartIsNotInProcedure(cartName: string) {
    if (cartName === opt.equipment.cameraCart.name) {
      cy.findByTestId('camera-cart', { exact: true }).should('not.exist')
    } else if (cartName === opt.equipment.robotCart.name) {
      cy.findByTestId('robot-cart', { exact: true }).should('not.exist')
    } else {
      throw Error(
        'Cart: ' +
          cartName +
          ' is not defined. Only the camera cart and robot cart are defined in the app.'
      )
    }
  },

  /**
   * Assert that an equipment card is in the available list in the right panel
   * @param {string} equipmentName: Display name of the equipment card expected to be in the equipment list
   * @param {string} identifier: IP address to act as a secondary label
   * TODO: Consider other potential function names to clarify that the equipment not in procedure list is being checked
   * TODO: JUNO-24411: Investigate better approaches for asserting whether or not something exists
   */
  equipmentIsAvailable(equipmentName: string, identifier?: string) {
    object.equipmentCardInList(equipmentName, identifier).should('exist')
    object
      .equipmentListInProcedure()
      .findByText(equipmentName, { exact: true })
      .should('not.exist')
  },

  /**
   * Assert that a set up equipment card is in the available list in the right panel. Works for cards created by setup cards only
   * @param {string} equipmentName: Display name of the set up equipment card expected to be in the equipment list
   * TODO: Consider other potential function names to clarify that the equipment not in procedure list is being checked
   * TODO: JUNO-24411: Investigate better approaches for asserting whether or not something exists
   */
  setUpIsAvailable(equipmentName: string) {
    object.setUpEquipmentCard(equipmentName).should('exist')
  },

  /**
   * Assert that an equipment card is not in the available list in the right panel
   * TODO: Find a way to make object accessor work where DOM object doesn't exist. JUNO-24411
   * TODO: Consider other potential function names to clarify that the equipment not in procedure list is being checked
   * @param {string} equipmentName: Display name of the equipment card expected to not be in the equipment list
   */
  equipmentIsNotAvailable(equipmentName: string) {
    object
      .availableEquipmentList()
      .findByText(equipmentName, { exact: true })
      .should('not.exist')
  },

  /**
   * Check the status bar in the equipment card or details popup and assert it is connected/disconnected
   * The status is implemented as a color bar where green means connected and yellow means disconnected
   * @param {cyGui<pom.equipment.equipmentCardTitleBox> | cyGui<pom.equipment.detailsPopup>} element: HTML element to check status color of
   * @param {boolean} connected: A boolean to indicate whether or not the cart is connected
   */
  equipmentIsConnected(
    element: pom.equipment.equipmentCardTitleBox | pom.equipment.detailsPopup,
    connected: boolean
  ) {
    cy.wrap(element).should(
      'have.css',
      'border-bottom-color',
      connected ? STATUS_CONNECTED : STATUS_DISCONNECTED
    )
  },

  /**
   * Description: Check the status of the cart connection line and assert it is connected/disconnected
   * The color green means connected and orange means disconnected
   * @param {cyGui<pom.equipment.cart>} element: HTML element to check the status color of
   * @param {boolean} connected: A boolean to indicate whether or not the cart is connected
   */
  connectionLineIsConnected(element: pom.equipment.cart, connected: boolean) {
    cy.wrap(element).then((cart) => {
      object
        .cartConnection(cart)
        // TODO: JUNO-24986 - remove additional .children() when cartConnection test id placement is updated
        .children()
        .children()
        .should(
          'have.css',
          'background-color',
          connected ? CART_CONNECTED : CART_DISCONNECTED
        )
    })
  },

  /**
   * Assert values in an equipment card
   * @param {cyGui<pom.equipment.equipmentCard>} equipmentCard: the equipment card
   * @param {string} name: name of the equipment
   * @param {string} ipAddress: the ip address of the equipment
   * @param {string} tracker: the tracker serial number of the equipment
   */
  equipmentCardValues(
    equipmentCard: pom.equipment.equipmentCard,
    name?: string,
    ipAddress?: string,
    tracker?: string
  ) {
    object.gearIcon(equipmentCard).click()
    if (name) {
      object.equipmentName(equipmentCard).should('have.value', name)
    }
    if (ipAddress) {
      object.ipAddress(equipmentCard).should('have.value', ipAddress)
    }
    if (tracker) {
      object.trackerSerial(equipmentCard).should('have.value', tracker)
    }
  },

  /**
   * Assert that the error messages and connection status of the cart are correct
   * @param {cyGui<pom.equipment.cart>} cart: the cart being checked
   * @param {opt.connectionStatus} connectionData: the information for the connection data (including error messages and intended status color)
   */
  cartStatus(cart: pom.equipment.cart, connectionData: opt.connectionStatus) {
    object.detailsButton(cart).click()
    object.detailsText(cart).should('contain.text', connectionData.error)
    if (connectionData.fixErrorStep1) {
      object
        .detailsText(cart)
        .should('contain.text', connectionData.fixErrorStep1)
    }
    if (connectionData.fixErrorStep2) {
      object
        .detailsText(cart)
        .should('contain.text', connectionData.fixErrorStep2)
    }

    object.detailsPopup(cart).then(($detailsPopup) => {
      cy.wrap($detailsPopup).should(
        'have.css',
        'border-bottom-color',
        connectionData.status_color
      )
    })
    if (connectionData.cart_connection_color) {
      object
        .cartConnection(cart)
        .children()
        .should(
          'have.css',
          'background-color',
          connectionData.cart_connection_color
        )
    }
  },
  /**
   * Assert the available equipment list has a certain size
   * @param {number} numEquipment: the number of equipment that should be in the available equipment list
   */
  equipmentListLength(numEquipment: number) {
    object
      .availableEquipmentList()
      .children()
      .should('have.length', numEquipment)
  },
  /**
   * Assert the in procedure list has a certain size
   * @param {number} numEquipment: the number of equipment that should be in the in procedure list
   */
  inProcedureListLength(numEquipment: number) {
    object
      .equipmentListInProcedure()
      .children()
      .should('have.length', numEquipment)
  },

  /**
   * Asserts a cart disconnection is indicated on the robot card within the required time
   * @param {number} startTimeOfConnectionChange: the start time of the change in connection
   */
  robotCartDisconnectCheck(startTimeOfConnectionChange) {
    cy.log('assert.robotCartDisconnectCheck')
    object.robotCart().then(($connection) => {
      assert.connectionLineIsConnected($connection, false)
    })
    const elapsedTime = Date.now() - startTimeOfConnectionChange
    cy.log(`Cart disconnect detected in ${elapsedTime} milliseconds`)
    expect(elapsedTime).to.be.lessThan(robotUtility.opt.maxDisconnectTime)
  }
}
