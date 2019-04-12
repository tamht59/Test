import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {defaultInitState} from '~/utils/constants'

const state = () => ({
  listMessages: {
    ...defaultInitState,
    page: 0
  },
  messageDetail: {
    ...defaultInitState
  },
  messageUnread: {
    ...defaultInitState
  }
})

export default {
  state,
  getters,
  actions,
  mutations
}
