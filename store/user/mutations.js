import {
  USER_LOGIN,
  USER_REGISTRATION,
  LOGOUT,
  UPDATE_LOGIN_STATUS,
  USER_DATA,
  USER_PUT_DATA
} from '~/utils/constants/mutations'
import {mapDefaultAllStep} from '~/utils/helper/mutation'
import {defaultInitState} from '~/utils/constants'

export default {
  [USER_LOGIN.request](state) {
    return (state.login = {
      ...state.login,
      status: '',
      requesting: true
    })
  },
  [USER_LOGIN.success](state, data) {
    return (state.login = {
      ...state.login,
      status: 'success',
      result: data,
      requesting: false
    })
  },
  [USER_LOGIN.fail](state, err) {
    return (state.login = {
      ...state.login,
      status: 'fail',
      error: err,
      requesting: false
    })
  },
  [USER_REGISTRATION.request](state) {
    return (state.entries = {
      ...state.entries,
      status: '',
      requesting: false
    })
  },
  [USER_REGISTRATION.success](state) {
    return (state.entries = {
      ...state.entries,
      status: 'success'
    })
  },
  [USER_REGISTRATION.fail](state) {
    return (state.entries = {
      ...state.entries,
      status: 'fail'
    })
  },
  [LOGOUT](state) {
    return (state.login = {...defaultInitState})
  },
  [UPDATE_LOGIN_STATUS](state, data) {
    return (state.login = {
      ...defaultInitState,
      status: 'success',
      result: data
    })
  },

  ...mapDefaultAllStep(USER_DATA, 'userData'),

  ...mapDefaultAllStep(USER_PUT_DATA, 'putUserData')
}
