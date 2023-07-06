import { wrapConsoleLog } from '@util/wrap-console-log'
import { object } from './patient-admin.objects'

export const patientAdmin = {
  ...wrapConsoleLog<typeof object>('patient-admin.object', object)
}
