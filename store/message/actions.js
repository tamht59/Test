import {MESSAGE_GET_LIST, MESSAGE_GET_DETAIL, MESSAGE_GET_UNREAD} from '~/utils/constants/mutations'
import messageApi from '~/utils/api/message'
import {changeCase, getError, getSessionToken} from '~/utils/helper'

export default {
  async getListMessages({commit, rootState}, data) {
    const {page} = data
    commit(MESSAGE_GET_LIST.request, {page})
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await messageApi.getListMessages(this.$axios, req, token)
      commit(MESSAGE_GET_LIST.success, changeCase(res))
    } catch (err) {
      commit(MESSAGE_GET_LIST.fail, getError(err))
    }
  },
  async getMessageDetail({commit, rootState}, data) {
    commit(MESSAGE_GET_DETAIL.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await messageApi.getMessageDetail(this.$axios, req, token)
      commit(MESSAGE_GET_DETAIL.success, changeCase(res))
    } catch (err) {
      commit(MESSAGE_GET_DETAIL.fail, getError(err))
    }
  },
  async getMessageUnread({commit, rootState}, data) {
    commit(MESSAGE_GET_UNREAD.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await messageApi.getMessageUnread(this.$axios, req, token)
      commit(MESSAGE_GET_UNREAD.success, changeCase(res))
    } catch (err) {
      commit(MESSAGE_GET_UNREAD.fail, getError(err))
    }
  }
}
