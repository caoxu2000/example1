/**
 * @description List of acceptable colors related to a tool's verification status.
 */

// TODO: JUNO-24022 Consolidate Css colors into global storage location
export enum VerificationColors {
  TOOL_UNVERIFIED_YELLOW = 'rgb(233, 166, 51)',
  TOOL_VERIFIED_GREEN = 'rgb(0, 128, 0)'
}

/**
 * Main configuration for instrument categories/groups name/arial-text
 */
export enum InstrumentCategories {
  POINTERS = 'Pointers',
  SUCTIONS = 'Suctions',
  NAVLOCK_TRACKERS = 'Navlock Trackers',
  FRAMES = 'Patient Reference Frames',
  BIOPSY = 'Biopsy',
  ENV = 'eNV',
  MIDAS_MR8 = 'Midas MR8',
  SURETRAK = 'SureTrak'
}

/**
 * TODO: JUNO-29803 - once we upgrade to Typescript 5 we can change this to dynamically generate the strings from the drivers in instruments
 * @description List of instruments dropdown options
 */
export enum InstrumentsDropdownOptions {
  AWLS_AND_PROBES = 'Awls and Probes',
  AWL_SHARP = 'Awl Sharp',
  AWL_BLUNT = 'Awl Blunt',
  PROBE_LUMBAR = 'Probe Lumbar',
  PROBE_LUMBAR_TAPERED = 'Probe Lumbar Tapered',
  PROBE_THORACIC = 'Probe Thoracic',
  PROBE_THORACIC_TAPERED = 'Probe Thoracic Tapered'
}
