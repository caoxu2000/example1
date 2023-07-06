import { cyGui } from '@util/type/cyGui'
import { pom } from './type/login'

/**
 * Description: Element accessors for the login components.
 */
export const object = {
  /**
   * Returns the button to log in
   * @return {cyGui<pom.login.submit>} : HTML element for login button
   */
  submit(): cyGui<pom.login.submit> {
    return cy.findByRole('button', { name: /Log In/i })
  },
  /**
   * Returns the username text field
   * @return {cyGui<pom.login.username>} : HTML element for username text field
   */
  username(): cyGui<pom.login.username> {
    return cy.findByPlaceholderText('username', { exact: false })
  },
  /**
   * Returns the password text field
   * @return {cyGui<pom.login.password>} : HTML element for password text field
   *
   * Note on password field: findByRole('password') is not an option per:
   * https://github.com/testing-library/dom-testing-library/issues/567
   * https://github.com/w3c/aria/issues/935*
   */
  password(): cyGui<pom.login.password> {
    return cy.findByPlaceholderText('password', { exact: false })
  }
}
