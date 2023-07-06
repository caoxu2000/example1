/**
 * Set of colors that are used for asserting css styles
 */
export enum CssColors {
  TRACKING_CARD_GREEN = 'rgb(0, 128, 0)',
  TRACKING_CARD_RED = 'rgb(255, 0, 0)',
  PATIENT_CARD_COLOR_BLUE = 'rgba(44, 158, 255, 0.9)',
  PATIENT_SELECT_COLOR_BLUE = 'rgb(40, 119, 165)',
  TOOL_CARD_YELLOW = 'rgb(233, 166, 51)',
  STATUS_COMPLETED = 'rgb(100, 156, 67)',
  STATUS_PENDING = 'rgb(233, 166, 51)',
  STATUS_FAILED = 'rgb(215, 41, 41)',
  // TODO: remove the border information from this file and create function to append border information to color - See JUNO-11453
  // TODO: note that the border width differs slightly between running cypress headlessly (7px) vs in the GUI (6.99219)
  TOUCHPOINT_YELLOW = '7px solid rgb(252, 207, 71)',
  TOUCHPOINT_GREEN = '7px solid rgb(0, 128, 0)',
  CART_CONECTION_ORANGE = 'rgb(255, 165, 0)',
  CART_CONNECTION_GREEN = 'rgb(126, 202, 42)',
  LANDMARK_BLUE = '7px solid rgb(91, 141, 222)',
  SPINE_PLAN_LEVEL_SELECTED_BLUE = 'rgb(72, 139, 178)',
  TOUCH_PROGRESS_INCOMPLETE = 'rgb(33, 33, 41)',
  TOUCH_PROGRESS_MARKER = 'rgb(36, 99, 137)'
}
