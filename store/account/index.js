import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {defaultInitState} from '~/utils/constants'

const state = () => ({
  adminAccountGetData: {
    ...defaultInitState
  },
  adminAccountCheckData: {
    ...defaultInitState
  },
  adminAccountPostData: {
    ...defaultInitState
  },
  newAccountTokenData: {
    ...defaultInitState
  },
  retireReasonCategory: {
    ...defaultInitState
  },
  retireReasonData: {
    ...defaultInitState
  }
})

export default {
  state,
  getters,
  actions,
  mutations
}
