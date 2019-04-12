import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {defaultInitState} from '~/utils/constants'

const state = () => ({
  login: {
    ...defaultInitState
  },
  entries: {
    ...defaultInitState
  },
  userData: {
    ...defaultInitState
  },
  putUserData: {
    ...defaultInitState
  }
})

export default {
  state,
  getters,
  actions,
  mutations
}
