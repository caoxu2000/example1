import { CssColors } from '@global-config/CssColors'

// This is a requirements based value for the maximum time that the UI can take to notify the user of robot cart disconnection
// TODO: JUNO-22780, update this parameter as appropriate if requirements based values should be stored in another manner
export const maxDisconnectTime = 4000

/**
 * @description List of Pre-Operative Robotic Tests on the Robot Utility task.
 * These values map to the test names in the table.
 */
export enum PreOpRoboticTest {
  ARM_ACCURACY = 'Robotic Arm Accuracy Verification',
  BRAKE = 'Brake Test',
  MOUNT = 'Mounting of Robotic Cart',
  CLEAN_STOP = 'Clean Stop',
  ELECTRONIC_COMPS = 'Electronic Components Test'
}

/**
 * @description List of statuses for the Pre-Operative Robotic Tests on Robot Utility task.
 */
enum PreOpTestStatus {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  FAILED = 'Failed'
}
/**
 * @description Type to define an overall test state
 */
export type testState = {
  testStatus: PreOpTestStatus
  testColor: CssColors
}
/**
 * @description List of overall test status conditions
 */
export const PreOpTestStatusState = {
  completed: {
    testStatus: PreOpTestStatus.COMPLETED,
    testColor: CssColors.STATUS_COMPLETED
  },
  pending: {
    testStatus: PreOpTestStatus.PENDING,
    testColor: CssColors.STATUS_PENDING
  },
  failed: {
    testStatus: PreOpTestStatus.FAILED,
    testColor: CssColors.STATUS_FAILED
  }
} as Record<string, testState>

/**
 * @description List of statuses for robot cart on Robot Utility task.
 */
enum RobotCartStatus {
  COMMUNICATING = ' Communicating',
  NOT_COMMUNICATING = ' Not Communicating'
}

/**
 * @description Type to define overall robot cart state
 */
export type cartState = {
  communicatingStatus: RobotCartStatus
  communicatingColor: CssColors
}

/**
 * @description List of overall robot cart status conditions
 */
export const RobotCartStatusState = {
  communicating: {
    communicatingStatus: RobotCartStatus.COMMUNICATING,
    communicatingColor: CssColors.TRACKING_CARD_GREEN
  },
  notCommunicating: {
    communicatingStatus: RobotCartStatus.NOT_COMMUNICATING,
    communicatingColor: CssColors.TRACKING_CARD_RED
  }
} as Record<string, cartState>
