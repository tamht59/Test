import {MESSAGE_GET_LIST, MESSAGE_GET_DETAIL, MESSAGE_GET_UNREAD} from '~/utils/constants/mutations'
import {mapDefaultAllStep} from '~/utils/helper/mutation'


export default {
  [MESSAGE_GET_LIST.request](state, data) {
    const { page } = data
    return (state.listMessages = {
      ...state.listMessages,
      status: '',
      requesting: true,
      page
    })
  },
  [MESSAGE_GET_LIST.success](state, data) {
    const items = !(state.listMessages.page > 1) ? data.items : state.listMessages.result.items.concat(data.items)
    return (state.listMessages = {
      ...state.listMessages,
      status: 'success',
      result: {
        ...data,
        items
      },
      requesting: false
    })
  },
  [MESSAGE_GET_LIST.fail](state, err) {
    return (state.listMessages = {
      ...state.listMessages,
      status: 'fail',
      error: err,
      requesting: false
    })
  },
  ...mapDefaultAllStep(MESSAGE_GET_DETAIL, 'messageDetail'),

  ...mapDefaultAllStep(MESSAGE_GET_UNREAD, 'messageUnread')
}
