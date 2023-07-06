/**
 * @description List of Robot Predefined Positions in the Navigate task
 */
export enum RoboticArmPositions {
  // TODO: add to this list as more options are included in the app
  // TODO: JUNO-23500, if determined that RobotPositions and RoboticArmPositions can be consolidated, update accordingly
  CLEAR_RIGHT = 'Clear Arm Right',
  LEFT_100mm = '100mm Left'
}
// TODO: JUNO-23500, if determined that RobotPositions and RoboticArmPositions can be consolidated, update accordingly
/**
 * @description List of Robot Predefined Positions in the Robot Utility task
 */
export enum RobotPositions {
  HOME = 'Home',
  STORAGE = 'Storage',
  CLEAR_LEFT = 'Clear Left',
  CLEAR_RIGHT = 'Clear Right',
  CLEAR_UP = 'Clear Up',
  DRAPE_RIGHT = 'Drape Right',
  DRAPE_STRAIGHT = 'Drape Straight',
  DRAPE_LEFT = 'Drape Left',
  SHIPPING = 'Shipping'
}

// TODO: JUNO-19289 - if regex matching works, update this fixture and references it to consolidate repetition of strings
/**
 * @description Permutations of the field indicating the arm's current position on the Robot Utility task.
 */
export enum ArmCurrentPosition {
  STANDBY = ' Current Position: StandBy',
  IDLE = 'Current Position: Idle',
  MOVING = 'Current Position: Moving',
  HOME = 'Current Position: Home',
  STORAGE = 'Current Position: Storage',
  CLEAR_LEFT = 'Current Position: Clear Left',
  CLEAR_RIGHT = 'Current Position: Clear Right',
  CLEAR_UP = 'Current Position: Clear Up',
  DRAPE_RIGHT = 'Current Position: Drape Right',
  DRAPE_STRAIGHT = 'Current Position: Drape Straight',
  DRAPE_LEFT = 'Current Position: Drape Left',
  SHIPPING = 'Current Position: Shipping'
}

// TODO: JUNO-19289 - if regex matching works, update this enum and references to it to consolidate repetition of strings
/**
 * @description Permutations of the field indicating the motion status of the robot arm on the Robot Utility task.
 */
export enum ArmMotionStatus {
  MOVING_HOME = ' Moving to Home position...',
  MOVING_STORAGE = ' Moving to Storage position...',
  MOVING_CLEAR_LEFT = ' Moving to Clear Left position...',
  MOVING_CLEAR_RIGHT = ' Moving to Clear Right position...',
  MOVING_CLEAR_UP = ' Moving to Clear Up position...',
  MOVING_DRAPE_RIGHT = ' Moving to Drape Right position...',
  MOVING_DRAPE_STRAIGHT = ' Moving to Drape Straight position...',
  MOVING_DRAPE_LEFT = ' Moving to Drape Left position...',
  MOVING_SHIPPING = ' Moving to Shipping position...',
  MOVED_HOME = ' Moved to Home position',
  MOVED_STORAGE = ' Moved to Storage position',
  MOVED_CLEAR_LEFT = ' Moved to Clear Left position',
  MOVED_CLEAR_RIGHT = ' Moved to Clear Right position',
  MOVED_CLEAR_UP = ' Moved to Clear Up position',
  MOVED_DRAPE_RIGHT = ' Moved to Drape Right position',
  MOVED_DRAPE_STRAIGHT = ' Moved to Drape Straight position',
  MOVED_DRAPE_LEFT = ' Moved to Drape Left position',
  MOVED_SHIPPING = ' Moved to Shipping position',
  MOVEMENT_CANCELLED = ' User cancelled Arm movement'
}

/**
 * @description Type to define the moving and moved arm status and position for a given robot position
 */
type RobotPositionsState = {
  robotPosition: RobotPositions
  armMovingStatus: ArmMotionStatus
  armMovingPosition: ArmCurrentPosition
  armMovedStatus: ArmMotionStatus
  armMovedPosition: ArmCurrentPosition
}

/**
 * @description List of robot positions and associated arm statuses and positions
 */
export const RobotPositionStatusState = {
  home: {
    robotPosition: RobotPositions.HOME,
    armMovingStatus: ArmMotionStatus.MOVING_HOME,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_HOME,
    armMovedPosition: ArmCurrentPosition.HOME
  },
  storage: {
    robotPosition: RobotPositions.STORAGE,
    armMovingStatus: ArmMotionStatus.MOVING_STORAGE,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_STORAGE,
    armMovedPosition: ArmCurrentPosition.STORAGE
  },
  clearLeft: {
    robotPosition: RobotPositions.CLEAR_LEFT,
    armMovingStatus: ArmMotionStatus.MOVING_CLEAR_LEFT,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_CLEAR_LEFT,
    armMovedPosition: ArmCurrentPosition.CLEAR_LEFT
  },
  clearRight: {
    robotPosition: RobotPositions.CLEAR_RIGHT,
    armMovingStatus: ArmMotionStatus.MOVING_CLEAR_RIGHT,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_CLEAR_RIGHT,
    armMovedPosition: ArmCurrentPosition.CLEAR_RIGHT
  },
  clearUp: {
    robotPosition: RobotPositions.CLEAR_UP,
    armMovingStatus: ArmMotionStatus.MOVING_CLEAR_UP,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_CLEAR_UP,
    armMovedPosition: ArmCurrentPosition.CLEAR_UP
  },
  drapeRight: {
    robotPosition: RobotPositions.DRAPE_RIGHT,
    armMovingStatus: ArmMotionStatus.MOVING_DRAPE_RIGHT,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_DRAPE_RIGHT,
    armMovedPosition: ArmCurrentPosition.DRAPE_RIGHT
  },
  drapeStraight: {
    robotPosition: RobotPositions.DRAPE_STRAIGHT,
    armMovingStatus: ArmMotionStatus.MOVING_DRAPE_STRAIGHT,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_DRAPE_STRAIGHT,
    armMovedPosition: ArmCurrentPosition.DRAPE_STRAIGHT
  },
  drapeLeft: {
    robotPosition: RobotPositions.DRAPE_LEFT,
    armMovingStatus: ArmMotionStatus.MOVING_DRAPE_LEFT,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_DRAPE_LEFT,
    armMovedPosition: ArmCurrentPosition.DRAPE_LEFT
  },
  shipping: {
    robotPosition: RobotPositions.SHIPPING,
    armMovingStatus: ArmMotionStatus.MOVING_SHIPPING,
    armMovingPosition: ArmCurrentPosition.MOVING,
    armMovedStatus: ArmMotionStatus.MOVED_SHIPPING,
    armMovedPosition: ArmCurrentPosition.SHIPPING
  }
} as Record<string, RobotPositionsState>
