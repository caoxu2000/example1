import { sshExe } from '../ssh-exe'

/**
 * Starts startRobotSimulator script on a running Juno
 * @param {string} actionType (start | stop | err) predefined script
 */
export function simulateRobot(actionType: string) {
  const filePath = '/opt/mnav/stealthapplication/scripts/user_commands'

  const startRobotSimulator = `${filePath}/startRobotSimulator`
  const stopRobotSimulator = `${filePath}/stopRobotSimulator`

  // choose between 'start' or 'stop'
  const simulateRobotFile =
    actionType == 'start' ? startRobotSimulator : stopRobotSimulator

  // TODO: JUNO-14132: sshExe doesn't work with startRobotSimulator. Need to update the sshExe function call
  sshExe(simulateRobotFile).its('stdout').should('contain', 'SUCCESS')
}
