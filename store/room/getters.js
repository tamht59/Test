export default {
  getProfileData: state => state.roomProfile,
  postCommentData: state => state.postComment,
  roomData: state => {
    //resultの中身がある場合はresultを返す
    if (state.roomData.result) {
      return state.roomData.result
    }
    return -1
  },
  roomBgImage: state => {
    if (state.roomData) {
      return state.roomData.result && state.roomData.result.bgImage
    }
    return null
  },
  roomUsers: state => {
    //resultの中身がある場合はresultを返す
    if (state.roomUsers.result) {
      return state.roomUsers.result
    }
    return []
  },
  timelineData: state => state.timelineData.result,
  flowerItemsData: state => state.flowerItems,
  updateCommentData: state => state.updateComment,
  deleteCommentData: state => state.deleteComment,
  setBgImgData: state => state.setBgImg,
  getCommentData: state => state.commentData.result,
  getPostItemBuyData: state => state.postItemBuy,
  getRolesResult: state => state.roles.result,
  getInvitationStatus: state => {
    if (state.roomData.result) {
      return state.roomData.result.invitations
    }
    return -1
  },
  getInvitationPeopleRequest: state => state.invitationPeople.requesting
}
