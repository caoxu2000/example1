import { object } from './robot-utility.objects'
import { simulateRobot } from '@util/simulate/simulate-robot'

export const action = {
  /**
   * Create action to run Robotic Pre-op Test
   * @param {string} testName : name of test will be checked
   */
  runPreTest(testName: string) {
    object.robotTestRow(testName).then(($test) => {
      object.runTest($test).click()
    })
  },
  /**
   * Method to begin or stop the robot simulator
   * @param {string} actionType: type of action will be performed. Either start or stop
   */
  robotSimulatorAction(actionType: string) {
    simulateRobot(actionType)
  },
  /**
   * Move arm to a position
   * @param {string} position : name of arm position
   */
  moveArm(position: string) {
    object.positionDropDown().click()
    object.positionSelector(position).click()
    object.moveArm().click()
  }
}
