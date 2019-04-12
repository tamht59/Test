import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {defaultInitState} from '~/utils/constants'

const state = () => ({
  prayData: {
    ...defaultInitState
  },
  roomData: {
    ...defaultInitState
  },
  roomUsers: {
    ...defaultInitState
  },
  timelineData: {
    ...defaultInitState
  },
  commentData: {
    ...defaultInitState
  },
  postComment: {
    ...defaultInitState
  },
  updateComment: {
    ...defaultInitState
  },
  deleteComment: {
    ...defaultInitState
  },
  flowerItems: {
    ...defaultInitState
  },
  roomProfile: {
    ...defaultInitState
  },
  setBgImg: {
    ...defaultInitState
  },
  postItemBuy: {
    ...defaultInitState
  },
  roles: {
    ...defaultInitState
  },
  invitationPeople: {
    ...defaultInitState
  }
})

export default {
  state,
  getters,
  actions,
  mutations
}
