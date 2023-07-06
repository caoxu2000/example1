import { object } from './login.objects'

export const action = {
  /**
   * Determines expected login form based on submitted parameter
   * @param {login} object
   */
  submit({ user, secret }) {
    if (user || secret) {
      object.username().type(user)
      object.password().type(secret)
      object.submit().click()
    } else {
      object.submit().click()
    }
  }
}
