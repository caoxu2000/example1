import { examList } from '@fixtures/type/examList'
/**
 * Type for exam config files that specifies what each exam must contain
 */
export type patient = {
  name: string
  mrn: string
  dob: string
  path: string
  examList: examList
}
