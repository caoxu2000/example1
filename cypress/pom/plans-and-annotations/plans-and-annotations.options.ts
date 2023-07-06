import { PlanColorBar } from '@global-config/PlanColorBar'
export { PlanColorBar } from '@global-config/PlanColorBar'
export { AnnotationColorBar } from '@global-config/AnnotationColorBar'

// TODO: replace with correct options once they are available
export enum TextAnnotationButtons {
  CLOSED_ANGLE = 'Closed Angle',
  OPEN_ANGLE = 'Open Angle',
  SAGITTAL_MEASURE = 'Saggital Measurement',
  RIGHT_ANGLE = 'Right Angle',
  ROTATION_ANGLE = 'Rotation Angle'
}

// TODO: replace with correct options once they are available
export enum StraightMeasurementButtons {
  CLOSED_ANGLE = 'Closed Angle',
  OPEN_ANGLE = 'Open Angle',
  SAGITTAL_MEASURE = 'Saggital Measurement',
  RIGHT_ANGLE = 'Right Angle',
  ROTATION_ANGLE = 'Rotation Angle'
}

export enum AngleMeasurementButtons {
  CLOSED_ANGLE = 'Closed Angle',
  OPEN_ANGLE = 'Open Angle',
  SAGITTAL_MEASURE = 'Saggital Measurement',
  RIGHT_ANGLE = 'Right Angle',
  ROTATION_ANGLE = 'Rotation Angle'
}

export enum CategoryButtons {
  TEXT = 'Text Annotation',
  STRAIGHT = 'Straight Measurement',
  ANGLE = 'Angle Measurement'
}

export type planType = {
  name: string
  entry: Array<number>
  target: Array<number>
  color?: keyof typeof PlanColorBar
}

type textAnnotationType = {
  name: string
  category: CategoryButtons.TEXT
  type: TextAnnotationButtons
  color?: keyof typeof PlanColorBar
}

type straightAnnotationType = {
  name: string
  category: CategoryButtons.STRAIGHT
  type: StraightMeasurementButtons
  color?: keyof typeof PlanColorBar
}

type angleAnnotationType = {
  name: string
  category: CategoryButtons.ANGLE
  type: AngleMeasurementButtons
  color?: keyof typeof PlanColorBar
}

export type annotationType =
  | textAnnotationType
  | straightAnnotationType
  | angleAnnotationType
