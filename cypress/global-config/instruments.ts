import {
  InstrumentCategories,
  InstrumentsDropdownOptions
} from '@pom/instruments/task/task.options'
/**
 * @description Instrument type
 */
export type instrumentType = {
  name: string
  maxError: string
  category: InstrumentCategories
}

/**
 * @description A list of Instruments and values for instrument properties.
 */
export const instruments = {
  passivePlanarBlunt: {
    name: 'Passive Planar, Blunt',
    maxError: '0.5',
    category: InstrumentCategories.POINTERS
  },
  smallPassiveCranialFrame: {
    name: 'Small Passive Cranial Frame',
    maxError: '0.5',
    category: InstrumentCategories.FRAMES
  },
  navigusProbe: {
    name: 'Navigus Probe',
    maxError: '0.5',
    category: InstrumentCategories.BIOPSY
  },
  passiveBiopsyNeedle: {
    name: 'Passive Biopsy Needle',
    maxError: '1',
    category: InstrumentCategories.BIOPSY
  },
  straightProbe: {
    name: 'Straight Probe',
    maxError: '',
    category: InstrumentCategories.POINTERS
  },
  fourtyFiveDegFrontalSuction: {
    name: '45 Deg Frontal Suction',
    maxError: '',
    category: InstrumentCategories.SUCTIONS
  },
  navLockGray: {
    name: 'NavLock Gray',
    maxError: '',
    category: InstrumentCategories.NAVLOCK_TRACKERS
  },
  SP14MH30TMR8: {
    name: 'SP14MH30T-MR8',
    maxError: '',
    category: InstrumentCategories.MIDAS_MR8
  },
  sureTrakPassiveSilver: {
    name: 'SureTrak2 Passive Silver',
    maxError: '',
    category: InstrumentCategories.SURETRAK
  }
} as Record<string, instrumentType>

/**
 * TODO: JUNO-29021 - remove category and toolCardID once they're replaced by the actual text
 * @description A list of drivers' category and tip dropdown options
 */
export const drivers = {
  awlsAndProbes: {
    name: InstrumentsDropdownOptions.AWLS_AND_PROBES,
    category: 'awlsAndProbesCategory',
    tips: {
      awlSharp: {
        name: InstrumentsDropdownOptions.AWL_SHARP,
        toolCardID: '9734678NLAwlSharp'
      },
      awlBlunt: {
        name: InstrumentsDropdownOptions.AWL_BLUNT,
        toolCardID: '9734404NLAwlBlunt'
      },
      probeLumbar: {
        name: InstrumentsDropdownOptions.PROBE_LUMBAR,
        toolCardID: '9734402NLProbeLumbar'
      },
      probeLumbarTapered: {
        name: InstrumentsDropdownOptions.PROBE_LUMBAR_TAPERED,
        toolCardID: '9734679NLProbeLumbar'
      },
      probeThoracic: {
        name: InstrumentsDropdownOptions.PROBE_THORACIC,
        toolCardID: '9734403NLProbeThoracic'
      },
      probeThoracicTapered: {
        name: InstrumentsDropdownOptions.PROBE_THORACIC_TAPERED,
        toolCardID: '9734680NLProbeThoracic'
      }
    }
  }
}
