import { equipment } from '@pom/equipment'
import { equipmentType } from '@pom/equipment/equipment.options'
import { menu } from '@pom/shared/menu'

/**
 * Common setup step to remove all equipment from the procedure
 */
export function removeAllEquipment() {
  menu.action.clickEquipment()
  cy.findByTestId('views-layout').then(($layout) => {
    // check for robot cart and remove if present
    if ($layout.find('[data-testid="robot-cart"]').length) {
      cy.log('Removing robot cart from procedure')
      equipment.robotCart().then(($cart) => {
        equipment.action.removeCartFromProcedure($cart)
      })
    } else {
      cy.log('Robot cart not present in procedure, continuing...')
    }

    // check for camera cart and remove if present
    if ($layout.find('[data-testid="camera-cart"]').length) {
      cy.log('Removing camera cart from procedure')
      equipment.cameraCart().then(($cart) => {
        equipment.action.removeCartFromProcedure($cart)
      })
    } else {
      cy.log('Camera cart not present in procedure, continuing...')
    }
  })

  // check for equipment cards and remove if present
  equipment.equipmentListInProcedure().then(($ipList) => {
    if ($ipList.children().length > 0) {
      cy.log('Removing equipment from procedure')
      equipment.action.clearEquipmentCardsFromProcedure()
    } else {
      cy.log('No equipment present in procedure, continuing...')
    }
  })

  // assert no equipment is in the procedure
  equipment.assert.cartIsNotInProcedure(equipment.opt.equipment.cameraCart.name)
  equipment.assert.cartIsNotInProcedure(equipment.opt.equipment.robotCart.name)
  equipment.assert.inProcedureListLength(0)
}

/**
 * Common setup step to add specified equipment to the procedure
 * @param {Array<equipmentType>} equipList : List of equipment to add to the procedure
 */
export function addEquipment(equipList: Array<equipmentType>) {
  menu.action.clickEquipment()
  for (const equip of equipList) {
    cy.log(`Adding ${equip.name} to procedure`)
    equipment.action.addEquipmentToProcedure(equip.name)
  }
}
