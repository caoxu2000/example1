import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'
import { equipment } from '@pom/equipment'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'
import { removeAllEquipment } from '@util/common-setup/common-setup-steps/equipment-steps'

// TODO: See JUNO-24411 suggestions to refactor the Equipment pom
// JUNO-24411: Investigate better approaches for asserting something doesn't exist
// Camera and robot carts should not be added to procedure and should in right panel for the following tests
describe('Example Spec for the Equipment POM', () => {
  // Constants to be used for setting up and accessing equipment cards
  const cameraDefaultName = equipment.opt.equipment.cameraCart.name
  const robotDefaultName = equipment.opt.equipment.robotCart.name
  const oArmDefaultName = equipment.opt.equipment.oArm.name
  const isoCDefaultName = equipment.opt.equipment.isoC.name
  const ziehmDigitalDefaultName = equipment.opt.equipment.ziehmDigital.name
  const ziehmRFDDefaultName = equipment.opt.equipment.ziehmRfd.name
  const philipsDefaultName = equipment.opt.equipment.philipsDigital.name

  const searchPhrase = 'Ziehm'

  const isoCRename = 'Iso-C 1'
  const ziehmRFDRename = 'ZiehmRFD 2'
  const philipsRename = 'Philips 3'

  const tracker = '123abc'
  const validIP = '1.2.3.4'
  const invalidIP1 = '1.2.3' // Too few numbers
  const invalidIP2 = '1111.2222.3333.4444' // Too many numbers

  before(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')

    procedure.action.select(procedure.opt.availableProcedures.spinalFusion)

    // TODO: Wait to make sure that the page is fully loaded - remove hardcoded waits when the app is more stable: JUNO-13101
    cy.wait(2000)
    menu.action.clickEquipment()
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')

    // TODO: Wait to make sure that the page is fully loaded - remove hardcoded waits when the app is more stable: JUNO-13101
    cy.wait(2000)
    removeAllEquipment()
  })

  it('Interact with the search bar', () => {
    // Assert expected equipment cards are found in the right panel
    equipment.assert.setUpIsAvailable(isoCDefaultName)
    equipment.assert.setUpIsAvailable(ziehmRFDDefaultName)
    equipment.assert.setUpIsAvailable(ziehmDigitalDefaultName)
    equipment.assert.setUpIsAvailable(philipsDefaultName)

    // Search for Ziehm and assert only the Ziehm cards are found in the available list
    equipment.searchBar().type(searchPhrase)
    equipment.searchBar().should('have.value', searchPhrase)

    equipment.assert.equipmentListLength(3)
    equipment.assert.setUpIsAvailable(ziehmRFDDefaultName)
    equipment.assert.setUpIsAvailable(ziehmDigitalDefaultName)

    // Clear the search and assert the string is removed
    equipment.clearSearchIcon().click()
    equipment.searchBar().should('have.value', '')
  })

  it('Add O-arm to the procedure, check its error message, and then remove', () => {
    // Add O-arm to the procedure and assert it was moved to the procedure
    equipment.action.addEquipmentToProcedure(oArmDefaultName)
    equipment.assert.equipmentIsInProcedure(oArmDefaultName)

    // Check that the O-arm is disconnected
    equipment
      .equipmentCardInProcedure(oArmDefaultName)
      .then(($equipmentCard) => {
        equipment.equipmentCardTitleBox($equipmentCard).then(($titleBox) => {
          equipment.assert.equipmentIsConnected($titleBox, false)
        })
        // Close card details
        equipment.gearIcon($equipmentCard).click()
      })
    // Assert card details
    equipment
      .equipmentCardInProcedure(oArmDefaultName)
      .contains('Current Error')
      .should('not.exist')

    // Remove O-arm from procedure and assert it is moved back to the right panel
    equipment.action.removeEquipmentFromProcedure(oArmDefaultName)
    equipment.assert.equipmentIsAvailable(oArmDefaultName)
  })

  it('Set up a ZiehmRFD C-arm equipment card in the right panel, check error handling during set up, then delete. Then start another set up and cancel', () => {
    // Start setting up an RFD C-arm - add name to card
    equipment.setUpEquipmentCard(ziehmRFDDefaultName).then(($equipmentCard) => {
      equipment.setUp($equipmentCard).click()

      equipment.equipmentName($equipmentCard).then(($field) => {
        equipment.clearInput($field).click()
      })
      equipment.equipmentName($equipmentCard).type(ziehmRFDRename)
      equipment
        .equipmentName($equipmentCard)
        .should('have.value', ziehmRFDRename)

      // Check error for no tracker serial number entered
      equipment.setUpAddToEquipmentButton($equipmentCard).click()
      equipment
        .setUpError($equipmentCard)
        .should('have.text', equipment.opt.setUpErrors.noSerialNumber)

      // Input valid tracker serial number
      equipment.trackerSerial($equipmentCard).clear().type(tracker)
      equipment.trackerSerial($equipmentCard).should('have.value', tracker)

      // Check error for invalid IP address with less than four numbers
      equipment.ipAddress($equipmentCard).clear().type(invalidIP1)
      equipment.setUpAddToEquipmentButton($equipmentCard).click()
      equipment
        .setUpError($equipmentCard)
        .should('have.text', equipment.opt.setUpErrors.invalidIpAddress)

      // Check error for invalid IP address with more than three digits per number
      equipment.ipAddress($equipmentCard).clear().type(invalidIP2)
      equipment.setUpAddToEquipmentButton($equipmentCard).click()
      equipment
        .setUpError($equipmentCard)
        .should('have.text', equipment.opt.setUpErrors.invalidIpAddress)

      // Input valid IP address
      equipment.ipAddress($equipmentCard).clear().type(validIP)
      equipment.ipAddress($equipmentCard).should('have.value', validIP)

      // Add ZiehmRFD as an equipment card
      equipment.setUpAddToEquipmentButton($equipmentCard).click()
    })

    // Assert ZiehmRFD is added to the equipment list, then delete the resulting card
    equipment.assert.equipmentIsAvailable(ziehmRFDRename, validIP)
    equipment.action.deleteEquipmentCard(ziehmRFDRename, validIP)
    equipment.assert.equipmentIsNotAvailable(ziehmRFDRename)

    // Start setting up another C-Arm equipment card but cancel it and assert it isn't added to the equipment list
    equipment.setUpEquipmentCard(isoCDefaultName).then(($equipmentCard) => {
      equipment.setUp($equipmentCard).click()
      equipment.equipmentName($equipmentCard).clear().type(isoCRename)
      equipment.innerCancelButton($equipmentCard).click()
    })
    equipment.assert.equipmentIsNotAvailable(isoCRename)
  })

  it('Set up C-arm equipment cards, add to the procedure, interact with them, then remove and delete them', () => {
    equipment.action.setUpCardAndAddToList(
      isoCDefaultName,
      isoCRename,
      validIP,
      tracker
    )
    equipment.assert.equipmentIsAvailable(isoCRename, validIP)

    // Set up a Philips-Digital C-Arm equipment card and add to the equipment card list
    equipment.action.setUpCardAndAddToList(
      philipsDefaultName,
      philipsRename,
      validIP
    )
    equipment.assert.equipmentIsAvailable(philipsRename, validIP)

    // Add the new iso-C equipment to the procedure and assert it has the correct information displayed in the procedure
    equipment.action.addEquipmentToProcedure(isoCRename, validIP)
    equipment.assert.equipmentIsInProcedure(isoCRename)

    equipment.equipmentCardInProcedure(isoCRename).then(($equipmentCard) => {
      equipment.assert.equipmentCardValues(
        $equipmentCard,
        isoCRename,
        validIP,
        tracker
      )
      equipment.equipmentCardTitleBox($equipmentCard).then(($titleBox) => {
        equipment.assert.equipmentIsConnected($titleBox, false)
      })
    })

    // Remove Iso-C from procedure and assert it is not in the procedure
    equipment.action.removeEquipmentFromProcedure(isoCRename)
    equipment.assert.equipmentIsAvailable(isoCRename, validIP)

    // Add the Philips-Digital to the procedure and assert it has the correct information displayed in the procedure
    equipment.action.addEquipmentToProcedure(philipsRename, validIP)
    equipment.assert.equipmentIsInProcedure(philipsRename)

    equipment.equipmentCardInProcedure(philipsRename).then(($equipmentCard) => {
      equipment.assert.equipmentCardValues(
        $equipmentCard,
        philipsRename,
        validIP
      )
      equipment.equipmentCardTitleBox($equipmentCard).then(($titleBox) => {
        equipment.assert.equipmentIsConnected($titleBox, false)
      })
    })

    // Remove Philips-Digital from procedure and assert it has been removed from the procedure
    equipment.action.removeEquipmentFromProcedure(philipsRename)
    equipment.assert.equipmentIsAvailable(philipsRename, validIP)

    // Delete the new equipment cards and assert that they are deleted
    equipment.action.deleteEquipmentCard(isoCRename, validIP)
    equipment.action.deleteEquipmentCard(philipsRename, validIP)
    equipment.assert.equipmentIsNotAvailable(isoCRename)
    equipment.assert.equipmentIsNotAvailable(philipsRename)
  })

  it('Add camera and robot carts to the procedure, interact with them, then remove', () => {
    // Add the camera and robot carts to the procedure and assert they are moved to the procedure
    equipment.action.addEquipmentToProcedure(cameraDefaultName)
    equipment.action.addEquipmentToProcedure(robotDefaultName)
    equipment.assert.equipmentIsNotAvailable(cameraDefaultName)
    equipment.assert.equipmentIsNotAvailable(robotDefaultName)

    equipment.assert.cartIsInProcedure(cameraDefaultName)
    equipment.cameraCart().then(($cameraCart) => {
      equipment.assert.cartStatus(
        $cameraCart,
        equipment.opt.equipment.camera.connectionInfo.DISCONNECTED
      )

      // Close the details and assert the fields go away
      equipment.detailsClose($cameraCart).click()
      cy.wrap($cameraCart)
        .contains(
          equipment.opt.equipment.camera.connectionInfo.DISCONNECTED.error
        )
        .should('not.exist')
    })

    equipment.assert.cartIsInProcedure(robotDefaultName)
    equipment.robotCart().then(($robotCart) => {
      equipment.assert.connectionLineIsConnected($robotCart, false)
    })

    // Remove the carts from the procedure and assert they were moved
    equipment.cameraCart().then(($cameraCart) => {
      equipment.action.removeCartFromProcedure($cameraCart)
    })
    equipment.robotCart().then(($robotCart) => {
      equipment.action.removeCartFromProcedure($robotCart)
    })
    equipment.assert.equipmentIsAvailable(cameraDefaultName)
    equipment.assert.equipmentIsAvailable(robotDefaultName)
    equipment.assert.cartIsNotInProcedure(cameraDefaultName)
    equipment.assert.cartIsNotInProcedure(robotDefaultName)
  })

  it('Interact with done button', () => {
    // Click done and assert we're in images task again
    equipment.done().click()
    util.assert.urlIs(guiRoutes.images)
  })
})
