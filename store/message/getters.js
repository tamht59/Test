export default {
  listMessagesData: state => state.listMessages,
  messageDetail: state => state.messageDetail,
  messageUnread: state => {
    //resultの中身がある場合はcountを返す
    if (state.messageUnread.result) {
      return state.messageUnread.result.count
    }
    return -1
  }
}
