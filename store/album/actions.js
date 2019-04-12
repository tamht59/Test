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
import albumApi from '~/utils/api/album'
import {changeCase, getError, getSessionToken} from '~/utils/helper'

export default {
  async getListAlbum({ commit, rootState }, data) {
    commit(ALBUM_GET_LIST.request, data)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.getList(this.$axios, data, token)
      commit(ALBUM_GET_LIST.success, {newData: changeCase(res), page: data.page})
    } catch (err) {
      commit(ALBUM_GET_LIST.fail, getError(err))
    }
  },
  async deleteAlbum({commit, rootState}, id) {
    commit(ALBUM_DELETE.request)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.deleteAlbumItem(this.$axios, {id}, token)
      commit(DELETE_LIST_ALBUM, id)
      commit(ALBUM_DELETE.success, changeCase(res))
    } catch (err) {
      commit(ALBUM_DELETE.fail, getError(err))
    }
  },
  async getAlbumDetail({commit, rootState}, id) {
    commit(ALBUM_GET_DETAIL.request)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.getAlbumDetail(this.$axios, id, token)
      commit(ALBUM_GET_DETAIL.success, res)
    } catch (err) {
      commit(ALBUM_GET_DETAIL.fail, getError(err))
    }
  },
  async deleteAlbumDetail({commit, rootState}, id) {
    commit(ALBUM_DETAIL_DELETE.request)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.deleteAlbumDetail(this.$axios, id, token)
      commit(DELETE_ALBUM_DETAIL, id)
      commit(ALBUM_DETAIL_DELETE.success, changeCase(res))
    } catch (err) {
      commit(ALBUM_DETAIL_DELETE.fail, getError(err))
    }
  },
  async postAlbum({commit, rootState}, data) {
    commit(ALBUM_POST.request)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.postAlbum(this.$axios, data, token)
      commit(ALBUM_POST.success, res)
      return true;
    } catch (err) {
      commit(ALBUM_POST.fail, getError(err))
      return getError(err);
    }
  },
  async putAlbum({commit, rootState}, data) {
    commit(ALBUM_PUT.request)
    try {
      const token = getSessionToken(rootState)
      const res = await albumApi.putAlbum(this.$axios, data, token)
      commit(ALBUM_PUT.success, res)
      return true;
    } catch (err) {
      commit(ALBUM_PUT.fail, getError(err))
      return getError(err);
    }
  }
}
