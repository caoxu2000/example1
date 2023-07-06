import { ViewType } from '@pom/views/view-panes/view-panes.options'

const biopsyPlanTaskDefaultPreset1: [number, ViewType][] = [
  [1, ViewType.THREE_D],
  [2, ViewType.SAGITTAL],
  [3, ViewType.AXIAL],
  [4, ViewType.CORONAL]
]

const biopsyPlanTaskDefaultPreset2: [number, ViewType][] = [
  [1, ViewType.GUIDANCE2D],
  [2, ViewType.PROBES_EYE],
  [3, ViewType.TRAJECTORY_ONE],
  [4, ViewType.TRAJECTORY_TWO]
]

export const updateViewTypeArray1: [ViewType, ViewType, number][] = [
  [ViewType.THREE_D, ViewType.VIRTUAL_ENDOSCOPE, 1],
  [ViewType.SAGITTAL, ViewType.LOOK_AHEAD, 1],
  [ViewType.AXIAL, ViewType.VIDEO, 1],
  [ViewType.CORONAL, ViewType.THREE_D, 1],
  [ViewType.TRAJECTORY_ONE, ViewType.SAGITTAL, 1],
  [ViewType.TRAJECTORY_TWO, ViewType.AXIAL, 1],
  [ViewType.PROBES_EYE, ViewType.CORONAL, 1],
  [ViewType.VIRTUAL_ENDOSCOPE, ViewType.TRAJECTORY_ONE, 2],
  [ViewType.GUIDANCE2D, ViewType.TRAJECTORY_TWO, 1]
]

export const updateViewTypeArray2: [ViewType, ViewType, number][] = [
  [ViewType.THREE_D, ViewType.AXIAL, 1],
  [ViewType.AXIAL, ViewType.CORONAL, 1],
  [ViewType.CORONAL, ViewType.SAGITTAL, 1],
  [ViewType.SAGITTAL, ViewType.TRAJECTORY_ONE, 1],
  [ViewType.TRAJECTORY_ONE, ViewType.TRAJECTORY_TWO, 1],
  [ViewType.TRAJECTORY_TWO, ViewType.PROBES_EYE, 1],
  [ViewType.PROBES_EYE, ViewType.THREE_D, 1],
  [ViewType.THREE_D, ViewType.VIRTUAL_ENDOSCOPE, 1],
  [ViewType.VIRTUAL_ENDOSCOPE, ViewType.GUIDANCE2D, 1],
  [ViewType.GUIDANCE2D, ViewType.LOOK_AHEAD, 1],
  [ViewType.LOOK_AHEAD, ViewType.VIDEO, 1]
]

export const procedureDefaultPresets = {
  biopsyPlanTaskDefaultPresets: [
    biopsyPlanTaskDefaultPreset1,
    biopsyPlanTaskDefaultPreset2
  ]
}
