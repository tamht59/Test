import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {defaultInitState} from '~/utils/constants'

const state = () => ({
  contactCategory: {
    ...defaultInitState
  },
  contactPostCheckData: {
    ...defaultInitState
  },
  contactPostData: {
    ...defaultInitState
  }
})

export default {
  state,
  getters,
  actions,
  mutations
}
