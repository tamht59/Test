import {
  ALBUM_GET_LIST,
  ALBUM_DELETE,
  ALBUM_GET_DETAIL,
  ALBUM_DETAIL_DELETE,
  ALBUM_POST,
  ALBUM_PUT,
  DELETE_LIST_ALBUM,
  DELETE_ALBUM_DETAIL
} from '~/utils/constants/mutations'
import { mapDefaultAllStep, saveDefaultRequest, saveDefaultFail } from '~/utils/helper/mutation'
import { defaultInitState } from '~/utils/constants'

export default {
  [ALBUM_GET_LIST.request](state) {
    return state.listAlbum = {
      ...state.listAlbum,
      status: '',
      requesting: true,
    }
  },
  [ALBUM_GET_LIST.success](state, data) {
    const { page, newData } = data
    const items = page == "1"
    ? newData.items
    : state.listAlbum.result.items.concat(newData.items)
    const dataResult = {
      items,
      nextPage: newData.nextPage
    }
    return state.listAlbum = {
      ...state.listAlbum,
      status: 'success',
      result: dataResult,
      requesting: false
    }
  },
  [ALBUM_GET_LIST.fail](state, err) {
    return state.listAlbum = {
      ...state.listAlbum,
      status: 'fail',
      error: err,
      requesting: false
    }
  },

  ...mapDefaultAllStep(ALBUM_DELETE, 'deleteAlbum'),

  [ALBUM_GET_DETAIL.request](state) {
    return state.albumDetail = {
      ...state.albumDetail,
      status: '',
      requesting: true
    }
  },
  [ALBUM_GET_DETAIL.success](state, data) {
    return state.albumDetail = {
      ...state.albumDetail,
      status: 'success',
      result: data,
      requesting: false
    }
  },
  [ALBUM_GET_DETAIL.fail](state, err) {
    return state.albumDetail = {
      ...state.albumDetail,
      status: 'fail',
      error: err,
      requesting: false
    }
  },

  ...mapDefaultAllStep(ALBUM_DETAIL_DELETE, 'deleteAlbumDetail'),

  ...mapDefaultAllStep(ALBUM_POST, 'postAlbum'),

  ...mapDefaultAllStep(ALBUM_PUT, 'putAlbum'),

  clearDataAlbumDetail(state) {
    state.albumDetail = { ...defaultInitState }
  },

  [DELETE_LIST_ALBUM](state, id) {
    const data = state.listAlbum.result.items.filter((item) => {
      return item.albumId !== id;
    })

    state.listAlbum.result.items = data
  },

  [DELETE_ALBUM_DETAIL](state, id) {
    const data = state.albumDetail.result.contents.filter((item) => {
      return item.detail_id !== id;
    })

    state.albumDetail.result.contents = data
  }
}
