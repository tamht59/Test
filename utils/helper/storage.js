import { STORAGE_KEY } from '~/utils/constants'

const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

export const getAuth = ({ req }) => {
  let auth = null
  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    auth = JSON.parse(parsed.auth)
  }
  return auth
}

export const setAuth = (auth, expires = 7) => {
  if (Cookie) {
    Cookie.set(STORAGE_KEY.AUTH, auth, { expires })
  }
}

export const clearAuth = () => {
  if (Cookie) Cookie.remove(STORAGE_KEY.AUTH)
}

