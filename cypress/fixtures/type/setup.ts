import { patient } from './patient'
import { exam } from './exam'

import { procedure } from '@pom/select-procedure/procedure.options'
import { equipmentType } from '@pom/equipment/equipment.options'
import {
  planType,
  annotationType
} from '@pom/plans-and-annotations/plans-and-annotations.options'
import { TRURegistrationType } from '@pom/manual-registration/registration.options'
import { menuOptions } from '@pom/shared/menu/menu.options'

import { instrumentType } from '@global-config/instruments'
export interface setup {
  procedure: procedure
  patient?: patient
  series?: Array<exam>
  registration?: TRURegistrationType
  instruments?: Array<instrumentType>
  equipment?: Array<equipmentType>
  plans?: Array<planType>
  annotations?: Array<annotationType>
  task: menuOptions
}
