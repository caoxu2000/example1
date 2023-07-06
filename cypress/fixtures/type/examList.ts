import { exam } from './exam'

/**
 * Type for examList property of patient type
 */
export type examList = {
  mr?: exam
  mrT1?: exam
  mrT1Contrast?: exam
  mrT2?: exam
  ct?: exam
  perfusion?: exam
  fmri?: exam
  diffusion?: exam
  flair?: exam
  swi?: exam
  bone?: exam
}
