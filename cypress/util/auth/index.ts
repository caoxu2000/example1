import { login } from './login'
import { apiLogin } from './api-login'
import { apiLogout } from './api-logout'
import { authCheck } from './api-auth-check'
import { getLocalToken, setLocalToken } from './local-token'
import { getLocalClientId, setLocalClientId } from './local-clientId'
import { getCurrentLoginStrategy } from './read-current-strategy'
import { getAuthCookie } from './auth-cookie'

export const auth = {
  authCheck,
  login,
  apiLogin,
  apiLogout,
  getLocalToken,
  setLocalToken,
  getLocalClientId,
  setLocalClientId,
  getCurrentLoginStrategy,
  getAuthCookie
}
