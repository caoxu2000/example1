/**
 * @description: List of icons on the left toolbar on Images, Plan task's view layout, etc
 */
export enum ImageToolButton {
  // TODO: JUNO-24986 add aria-labels to all below buttons
  CYCLE_LAYOUTS = 'Cycle',
  BROWSE = 'Browse',
  ZOOM = 'Zoom',
  MOVE = 'Move',
  ROTATE = 'Rotate',
  CROSSHAIRS = 'Crosshair',
  RECENTER = 'Recenter',
  MEASURE = 'Measure'
}

/**
 * @description: List of view type options on the dropdown list of viewports in the central panel
 */
export enum ViewType {
  AXIAL = 'Axial',
  CORONAL = 'Coronal',
  SAGITTAL = 'Sagittal',
  TRAJECTORY_ONE = 'Trajectory 1',
  TRAJECTORY_TWO = 'Trajectory 2',
  PROBES_EYE = "Probe's Eye",
  SYNTHETIC_AP = 'Synthetic AP',
  SYNTHETIC_LATERAL = 'Synthetic Lateral',
  AP = 'AP',
  LATERAL = 'Lateral',
  THREE_D = '3D',
  MIP = 'MIP',
  VIRTUAL_ENDOSCOPE = 'Virtual Endoscope',
  GUIDANCE2D = 'Guidance 2D',
  LOOK_AHEAD = 'Look Ahead',
  VIDEO = 'Video',
  ULTRASOUND_TRAJECTORY = 'Ultrasound Trajectory',
  ULTRASOUND_VIDEO = 'Ultrasound Video'
}
