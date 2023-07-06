/**
 * Executes a server side script via cy.exe or cy.task depending if
 * cypress is running on the same machine
 * @param {string} programPath path to script
 * @param {boolean} log : True, displays the command in the command log
 *                        False, does not display the command in the command log
 * @return {Cypress.Exec}
 */
export function sshExe(programPath: string, log = true) {
  const isLocalhost = Cypress.env('host') == 'localhost' ? true : false

  if (isLocalhost) {
    return cy.exec(programPath, { log: log })
  } else {
    return cy.task(
      'ssh',
      { cmd: programPath },
      { log: log }
    ) as Cypress.Chainable<Cypress.Exec>
  }
}
