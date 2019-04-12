import {USER_LOGIN, USER_REGISTRATION, USER_DATA, USER_PUT_DATA, LOGOUT} from '~/utils/constants/mutations'
import userApi from '~/utils/api/user'
import {changeCase, getError, setAuth, clearAuth, getSessionToken} from '~/utils/helper'

export default {
  async login({commit}, data) {
    commit(USER_LOGIN.request)
    try {
      const req = changeCase(data, 'snake')
      const res = await userApi.login(this.$axios, req)
      const userData = changeCase(res)
      commit(USER_LOGIN.success, userData)
      setAuth(res)
      // let res
      // setTimeout(() => {
      //   res = {
      //     ...data,
      //     session_token: 'oihfoi.30f0.2f.wfwv3fvwf0qw',
      //     name:'lila mohamed',
      //     age: 57,
      //     email: 'hahabobalo@gmail.com'
      //   }
      //   const userData = changeCase(res)
      //   commit(USER_LOGIN.success, userData)
      //   setAuth(res)
      // }, 2000)
    } catch (err) {
      commit(USER_LOGIN.fail, getError(err))
    }
  },
  async entries({commit}, data) {
    commit(USER_REGISTRATION.request)
    try {
      const res = await userApi.registration(this.$axios, data)
      commit(USER_REGISTRATION.success, changeCase(res))
      return true
    } catch (err) {
      commit(USER_REGISTRATION.fail, getError(err))
      return false
    }
  },
  async getUserData({commit, rootState}, data) {
    commit(USER_DATA.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await userApi.getUserData(this.$axios, req, token)
      commit(USER_DATA.success, changeCase(res))
    } catch (err) {
      commit(USER_DATA.fail, getError(err))
    }
  },

  async putUserData({commit, rootState}, data) {
    commit(USER_PUT_DATA.request)
    try {
      const token = getSessionToken(rootState)
      const res = await userApi.putUserData(this.$axios, data, token)
      commit(USER_PUT_DATA.success, changeCase(res))
    } catch (err) {
      commit(USER_PUT_DATA.fail, getError(err))
    }
  },

  logout({commit}) {
    clearAuth()
    commit(LOGOUT)
  }
}
