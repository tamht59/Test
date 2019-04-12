import {
  ROOM_POST_PRAY,
  ROOM_GET_ROOMDATA,
  ROOM_GET_ROOMUSERS,
  ROOM_GET_TIMELINE,
  ROOM_GET_COMMENT,
  ROOM_POST_COMMENT,
  ROOM_UPDATE_COMMENT,
  ROOM_DELETE_COMMENT,
  ROOM_GET_FLOWER_ITEMS,
  ROOM_GET_PROFILE,
  ROOM_SET_BG_IMAGE,
  ROOM_POST_ITEM_BUY,
  ROOM_GET_ROLES,
  ROOM_INVITATION_PEOPLE,
  UPDATE_DATA_TIMELINE,
  DELETE_DATA_TIMELINE,
  SET_BG_IMAGE
} from '~/utils/constants/mutations'
import roomApi from '~/utils/api/room'
import {changeCase, getError, getSessionToken} from '~/utils/helper'

export default {
  async postPray({dispatch, commit, rootState}, data) {
    commit(ROOM_POST_PRAY.request)
    try {
      const token = getSessionToken(rootState)
      const {user_id, room_id, action_kbn} = changeCase(data, 'snake')
      const req = {
        user_id: user_id,
        room_id: room_id,
        action_kbn: action_kbn
      }
      const res = await roomApi.postPray(this.$axios, req, token)
      dispatch('getTimeline', data)
      commit(ROOM_POST_PRAY.success, changeCase(res, 'snake'))
    } catch (err) {
      commit(ROOM_POST_PRAY.fail, getError(err))
    }
  },

  async getRoomData({commit, rootState}, data) {
    commit(ROOM_GET_ROOMDATA.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.getRoomData(this.$axios, req, token)
      commit(ROOM_GET_ROOMDATA.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_ROOMDATA.fail, getError(err))
    }
  },

  async getRoomUsers({commit, rootState}, data) {
    commit(ROOM_GET_ROOMUSERS.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.getRoomUsers(this.$axios, req, token)
      commit(ROOM_GET_ROOMUSERS.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_ROOMUSERS.fail, getError(err))
    }
  },

  async getTimeline({commit, rootState}, data) {
    commit(ROOM_GET_TIMELINE.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.getTimeline(this.$axios, req, token)
      commit(ROOM_GET_TIMELINE.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_TIMELINE.fail, getError(err))
    }
  },

  async getComment({commit}, data) {
    commit(ROOM_GET_COMMENT.request)
    try {
      const {id} = data
      const res = await roomApi.getComment(this.$axios, {id})
      commit(ROOM_GET_COMMENT.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_COMMENT.fail, getError(err))
    }
  },
  async postComment({dispatch, commit, rootState}, data) {
    commit(ROOM_POST_COMMENT.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.postComment(this.$axios, req, token)
      commit(ROOM_POST_COMMENT.success, changeCase(res))
      dispatch('getTimeline', data)
    } catch (err) {
      commit(ROOM_POST_COMMENT.fail, getError(err))
    }
  },
  async updateComment({dispatch, commit, rootState}, data) {
    commit(ROOM_UPDATE_COMMENT.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.updateComment(this.$axios, req, token)
      commit(UPDATE_DATA_TIMELINE, data)
      commit(ROOM_UPDATE_COMMENT.success, changeCase(res))
      dispatch('getTimeline', data)
    } catch (err) {
      commit(ROOM_UPDATE_COMMENT.fail, getError(err))
    }
  },
  async deleteComment({dispatch, commit, rootState}, data) {
    commit(ROOM_DELETE_COMMENT.request)
    try {
      const token = getSessionToken(rootState)
      const res = await roomApi.deleteComment(this.$axios, data, token)
      commit(DELETE_DATA_TIMELINE, data)
      commit(ROOM_DELETE_COMMENT.success, changeCase(res))
      dispatch('getTimeline', data)
    } catch (err) {
      commit(ROOM_DELETE_COMMENT.fail, getError(err))
    }
  },
  async getFlowerItems({commit, rootState}, data) {
    commit(ROOM_GET_FLOWER_ITEMS.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.getFlowerItems(this.$axios, req, token)
      commit(ROOM_GET_FLOWER_ITEMS.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_FLOWER_ITEMS.fail, getError(err))
    }
  },
  async getProfile({commit, rootState}, data) {
    commit(ROOM_GET_PROFILE.request)
    try {
      const token = getSessionToken(rootState)
      const res = await roomApi.getProfile(this.$axios, data, token)
      commit(ROOM_GET_PROFILE.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_PROFILE.fail, getError(err))
    }
  },
  async setBgImg({commit, rootState}, data) {
    commit(ROOM_SET_BG_IMAGE.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.setBgImage(this.$axios, req, token)
      commit(SET_BG_IMAGE, data)
      commit(ROOM_SET_BG_IMAGE.success, changeCase(res))
    } catch (err) {
      commit(ROOM_SET_BG_IMAGE.fail, getError(err))
    }
  },
  async postItemBuy({commit, rootState}, data) {
    commit(ROOM_POST_ITEM_BUY.request)
    try {
      const token = getSessionToken(rootState)
      const req = changeCase(data, 'snake')
      const res = await roomApi.postItemBuy(this.$axios, req, token)
      commit(ROOM_POST_ITEM_BUY.success, changeCase(res))
    } catch (err) {
      commit(ROOM_POST_ITEM_BUY.fail, getError(err))
    }
  },
  async getRoles({commit, rootState}, data) {
    commit(ROOM_GET_ROLES.request)
    try {
      const token = getSessionToken(rootState)
      const res = await roomApi.getRoles(this.$axios, data, token)
      commit(ROOM_GET_ROLES.success, changeCase(res))
    } catch (err) {
      commit(ROOM_GET_ROLES.fail, getError(err))
    }
  },
  async postInvitationPeople({commit, rootState}, data) {
    commit(ROOM_INVITATION_PEOPLE.request)
    try {
      const token = getSessionToken(rootState)
      const res = await roomApi.postInvitationPeople(this.$axios, data, token)
      commit(ROOM_INVITATION_PEOPLE.success, changeCase(res))
      return true
    } catch (err) {
      commit(ROOM_INVITATION_PEOPLE.fail, getError(err))
      const error = getError(err)
      return getError(err)
    }
  }
}
