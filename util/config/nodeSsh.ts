import { NodeSSH } from 'node-ssh'

/**
 * Executes remote command via via node library.
 *
 * Used with cy.task()
 *
 * @param {Object} param - passed in from cypress task event
 * @param {string} param.cmd - path to server side script
 * @param {Cypress.PluginConfigOptions} param.config - the Cypress config
 * @param {string} param.config.env.host - localhost or ip address
 * @param {string} param.config.env.auth.user - S8 username
 * @param {string} param.config.env.auth.pwd - S8 password
 * @return {SSHExecCommandResponse}
 */
export async function nodeSsh({ cmd, config }) {
  const ssh = new NodeSSH()
  await ssh.connect({
    host: config.env.host,
    username: config.env.auth.user,
    password: config.env.auth.pwd
  })

  const response = await ssh.execCommand(cmd, { cwd: '/var/www' })

  // log to node console running cypress, not the browser
  console.log(`nodeSsh response.stdout: ${response.stdout}`)
  console.log(`nodeSsh response.stderr: ${response.stderr}`)
  console.log(`nodeSsh response.code: ${response.code}`)

  return response
}
