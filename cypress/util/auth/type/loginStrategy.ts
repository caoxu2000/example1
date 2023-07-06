/**
 * Type for login strategies accepted by the application
 */
export type loginStrategy = {
  networkStrategy: 'off' | 'ldap' | 'saml'
  localStrategy: 'null' | 'local'
}
