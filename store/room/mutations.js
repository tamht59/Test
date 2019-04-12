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
import { mapDefaultAllStep } from '~/utils/helper/mutation'

export default {
  ...mapDefaultAllStep(ROOM_POST_PRAY, 'prayData'),

  ...mapDefaultAllStep(ROOM_GET_ROOMDATA, 'roomData'),

  ...mapDefaultAllStep(ROOM_GET_ROOMUSERS, 'roomUsers'),

  ...mapDefaultAllStep(ROOM_GET_TIMELINE, 'timelineData'),

  ...mapDefaultAllStep(ROOM_GET_COMMENT, 'commentData'),

  ...mapDefaultAllStep(ROOM_POST_COMMENT, 'postComment'),

  ...mapDefaultAllStep(ROOM_UPDATE_COMMENT, 'updateComment'),

  ...mapDefaultAllStep(ROOM_DELETE_COMMENT, 'deleteComment'),

  ...mapDefaultAllStep(ROOM_GET_FLOWER_ITEMS, 'flowerItems'),

  ...mapDefaultAllStep(ROOM_GET_PROFILE, 'roomProfile'),

  ...mapDefaultAllStep(ROOM_SET_BG_IMAGE, 'setBgImg'),

  ...mapDefaultAllStep(ROOM_POST_ITEM_BUY, 'postItemBuy'),

  ...mapDefaultAllStep(ROOM_GET_ROLES, 'roles'),

  ...mapDefaultAllStep(ROOM_INVITATION_PEOPLE, 'invitationPeople'),

  [SET_BG_IMAGE](state, data) {
    const { bgImage } = data.urlImg
    state.roomData.result.bgImage = bgImage
  },

  [UPDATE_DATA_TIMELINE](state, data) {
    state.timelineData.result.forEach(item => {
      if (item.myCommentId === data.id.toString())
        item.roomComment = data.roomComment
    })
  },

  [DELETE_DATA_TIMELINE](state, data) {
    const dataFilter = state.timelineData.result.filter((item) => {
      return item.myCommentId !== data.id.toString();
    })

    state.timelineData.result = dataFilter
  }
}
