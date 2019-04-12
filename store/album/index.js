import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { defaultInitState } from '~/utils/constants'

const state = () => ({
  listAlbum: {
    ...defaultInitState,
    result: {
      items: [],
      nextPage: "1"
    }
  },
  deleteAlbum: {
    ...defaultInitState
  },
  albumDetail: {
    ...defaultInitState
  },
  deleteAlbumDetail: {
    ...defaultInitState
  },
  postAlbum: {
    ...defaultInitState
  },
  putAlbum: {
    ...defaultInitState
  }
})

export default {
  state,
  actions,
  mutations,
  getters
}
