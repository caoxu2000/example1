import { pom } from './type/equipment'
import { object } from './equipment.objects'
import { alias } from '@util/type/cy-alias'

export const action = {
  /**
   * Add an equipment card from the available list to the procedure list
   * @param {string} equipmentName: Display name of the equipment card
   * @param {string} identifier: Optional ip address as secondary label in equipment card
   */
  addEquipmentToProcedure(equipmentName: string, identifier?: string) {
    object
      .equipmentCardInList(equipmentName, identifier)
      .then(($equipmentCard) => {
        cy.waitForApi(alias.addEquipment, () => {
          object.addToProcedure($equipmentCard).click()
        })
      })
  },

  /**
   * Remove an equipment card from the procedure list
   * @param {string} equipmentName: Display name of the equipment card
   */
  removeEquipmentFromProcedure(equipmentName: string) {
    object.equipmentCardInProcedure(equipmentName).then(($equipmentCard) => {
      cy.waitForApi(alias.removeEquipment, () => {
        object.removeCard($equipmentCard).click()
      })
    })
  },

  /**
   * Remove a cart from the procedure list
   * @param {cyGui<pom.equipment.cart>} cart: The cart being removed
   */
  removeCartFromProcedure(cart: pom.equipment.cart) {
    cy.wrap(cart).then(($cartEquipment) => {
      cy.waitForApi(alias.removeEquipment, () => {
        object.removeCart($cartEquipment).click()
      })
    })
  },

  /**
   * Add an equipment card to the available list from the set up equipment card
   * @param {string} equipmentName: Display name of the set up equipment card
   * @param {string} newName: New name of the equipment being added
   * @param {string} ipAddress: Ip address for equipment being added
   * @param {string} tracker: optional tracking serial number for physical equipment being added
   */
  setUpCardAndAddToList(
    equipmentName: string,
    newName: string,
    ipAddress: string,
    tracker?: string
  ) {
    cy.log('Creating card for equipment ' + equipmentName + ' named ' + newName)

    object.setUpEquipmentCard(equipmentName).then(($equipmentCard) => {
      object.setUp($equipmentCard).click()
      object.equipmentName($equipmentCard).clear().type(newName)
      object.ipAddress($equipmentCard).clear().type(ipAddress)
      if (tracker) {
        object.trackerSerial($equipmentCard).type(tracker)
      }
      cy.waitForApi(alias.createEquipment, () => {
        object.setUpAddToEquipmentButton($equipmentCard).click()
      })
    })
  },

  /**
   * Delete an equipment card from the available list
   * @param {string} equipmentName: Display name of the equipment card
   * @param {string} identifier: Optional ip address as secondary label in equipment card
   */
  deleteEquipmentCard(equipmentName: string, identifier?: string) {
    object
      .equipmentCardInList(equipmentName, identifier)
      .then(($equipmentCard) => {
        object.gearIcon($equipmentCard).click()
        cy.waitForApi(alias.deleteEquipment, () => {
          object.deleteButton($equipmentCard).click()
        })
      })
  },

  /**
   * Removes all equipment cards from the procedure
   * Note that this does NOT clear the camera or robot carts from the procedure
   */
  clearEquipmentCardsFromProcedure() {
    object
      .equipmentListInProcedure()
      .findAllByTestId('equipment-card-ip')
      .each(($equipmentCard) => {
        cy.waitForApi(alias.removeEquipment, () => {
          object.removeCard($equipmentCard).click()
        })
      })
  }
}
