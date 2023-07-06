import { sshExe } from '../ssh-exe'

/**
 * Starts a script using the locUiService on a running S8
 * @param {string} trackType (optical | em | err) predefined tracking script
 */
export function simulateTrackingView(trackType: string) {
  const programPath =
    '/home/stealth/StealthApplication/ApplicationHome/release_env/bin/ImportTrackingView'
  const dataPath =
    '/home/stealth/StealthApplication/LocUIService/test/ImportTrackingView'

  const opticalPath = `${programPath} ${dataPath}/trackingview_optical.json`
  const emPath = `${programPath} ${dataPath}/trackingview_em.json`

  // choose between 'optical' or 'em'
  const simulateTracking = trackType == 'optical' ? opticalPath : emPath

  sshExe(simulateTracking).its('stdout').should('contain', 'SENT')
}
