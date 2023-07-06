/**
 * @description List of acceptable tracking statuses for a given tool.
 */

enum _ToolCardTrackingColors {
  TOOL_VISIBLE_GREEN = '3px solid rgb(0, 128, 0)',
  TOOL_HIDDEN_RED = '0px none rgb(255, 255, 255)'
}

export type trackingState = { toolCardColor: _ToolCardTrackingColors }

// Options related to the visibility status of the tool in the tracking view, to be used in tests
export const trackingStatus = {
  visible: {
    toolCardColor: _ToolCardTrackingColors.TOOL_VISIBLE_GREEN
  },
  hidden: {
    toolCardColor: _ToolCardTrackingColors.TOOL_HIDDEN_RED
  }
} as Record<string, trackingState>

export enum CameraStatus {
  CONNECTED = 'Connected',
  DISCONNECTED = 'Not Connected'
}

export enum TrackingDetailsToggleText {
  CLOSED = 'Close Tracking Details',
  OPEN = 'Open Tracking Details'
}
