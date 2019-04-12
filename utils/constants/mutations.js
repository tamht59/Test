const produceStatus = mutation => ({
  request: mutation + '_REQUEST',
  success: mutation + '_SUCCESS',
  fail: mutation + '_FAIL'
})
// User
export const USER_LOGIN = produceStatus('USER_LOGIN')
export const USER_REGISTRATION = produceStatus('USER_REGISTRATION')
export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS'
export const LOGOUT = 'LOGOUT'
export const USER_DATA = produceStatus('USER_DATA')
export const USER_PUT_DATA = produceStatus('USER_PUT_DATA')

// Room
export const ROOM_POST_PRAY = produceStatus('ROOM_POST_PRAY')
export const ROOM_GET_ROOMDATA = produceStatus('ROOM_GET_ROOMDATA')
export const ROOM_GET_ROOMUSERS = produceStatus('constROOM_GET_ROOMUSERS')
export const ROOM_GET_TIMELINE = produceStatus('ROOM_GET_TIMELINE')
export const ROOM_GET_COMMENT = produceStatus('ROOM_GET_COMMENT')
export const ROOM_POST_COMMENT = produceStatus('ROOM_POST_COMMENT')
export const ROOM_UPDATE_COMMENT = produceStatus('ROOM_UPDATE_COMMENT')
export const ROOM_DELETE_COMMENT = produceStatus('ROOM_DELETE_COMMENT')
export const ROOM_GET_FLOWER_ITEMS = produceStatus('ROOM_GET_FLOWER_ITEMS')
export const ROOM_GET_PROFILE = produceStatus('ROOM_GET_PROFILE')
export const ROOM_SET_BG_IMAGE = produceStatus('ROOM_SET_BG_IMAGE')
export const ROOM_POST_ITEM_BUY = produceStatus('ROOM_POST_ITEM_BUY')
export const ROOM_GET_ROLES = produceStatus('ROOM_GET_ROLES')
export const ROOM_INVITATION_PEOPLE = produceStatus('ROOM_INVITATION_PEOPLE')
export const UPDATE_DATA_TIMELINE = 'UPDATE_DATA_TIMELINE'
export const DELETE_DATA_TIMELINE = 'DELETE_DATA_TIMELINE'
export const SET_BG_IMAGE = 'SET_BG_IMAGE'

// Album
export const ALBUM_GET_LIST = produceStatus('ALBUM_GET_LIST')
export const ALBUM_DELETE = produceStatus('ALBUM_DELETE')
export const ALBUM_GET_DETAIL = produceStatus('ALBUM_GET_DETAIL')
export const ALBUM_DETAIL_DELETE = produceStatus('ALBUM_DETAIL_DELETE')
export const ALBUM_POST = produceStatus('ALBUM_POST')
export const ALBUM_PUT = produceStatus('ALBUM_PUT')
export const DELETE_LIST_ALBUM = 'DELETE_LIST_ALBUM'
export const DELETE_ALBUM_DETAIL = 'DELETE_ALBUM_DETAIL'

// Message
export const MESSAGE_GET_LIST = produceStatus('MESSAGE_GET_LIST')
export const MESSAGE_GET_DETAIL = produceStatus('MESSAGE_GET_DETAIL')
export const MESSAGE_GET_UNREAD = produceStatus('MESSAGE_GET_UNREAD')

// support
// Contact
export const CONTACT_GET_CATEGORY = produceStatus('CONTACT_GET_CATEGORY')
export const CONTACT_POST_CHECK = produceStatus('CONTACT_POST_CHECK')
export const CONTACT_POST_DATA = produceStatus('CONTACT_POST_DATA')

//account
export const ADMIN_ACCOUNT_GET_DATA = produceStatus('ADMIN_ACCOUNT_GET_DATA')
export const ADMIN_ACCOUNT_CHECK_DATA = produceStatus('ADMIN_ACCOUNT_CHECK_DATA')
export const ADMIN_ACCOUNT_POST_DATA = produceStatus('ADMIN_ACCOUNT_POST_DATA')
export const NEW_ACCOUNT_TOKEN_DATA = produceStatus('NEW_ACCOUNT_TOKEN_DATA')
//Retire
export const RETIRE_REASON_GET_CATEGORY = produceStatus('RETIRE_REASON_GET_CATEGORY')
export const RETIRE_REASON_POST_DATA = produceStatus('RETIRE_REASON_POST_DATA')
