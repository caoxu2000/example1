/**
 * Reads cypress config and sets the "baseUrl" used by spec files
 *
 * @param {Cypress.PluginConfigOptions} config - the Cypress config
 * @param {string} config.env.host - localhost or ip address
 * @param {string} config.env.build - dev or prod. dev expects guiwebserver started with dev-start or dev-local
 * @param {string} config.env.protocol - http or https
 * @return {Cypress.PluginConfigOptions} - config
 */
export function setBaseUrl(config: Cypress.PluginConfigOptions) {
  const host = config.env.host
  let uiNamespace = 'gui'

  if (config.env.build && config.env.build === 'dev') {
    uiNamespace = 'gui-dev'
  }
  config.baseUrl = `${config.env.protocol}://${host}/${uiNamespace}`
  return config
}
