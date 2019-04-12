import _ from "lodash"

export * from './changeCase'
export * from './requesting'
export * from './axiosConfig'
export * from './storage'

export const checkLogin = (store) => {
  const { status, result } = _.get(store, 'state.user.login', {})
  if (status === "success" && !_.isEmpty(result)) {
    return true
  }
  return false
}

export const getSessionToken = (store) => {
  return _.get(store, 'user.login.result.sessionToken', null)
}

export const onloadToPromise = (url) => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      return resolve(img);
    }
    img.onerror = (err) => {
      return reject(err)
    }
    img.src = url;
  })
}
