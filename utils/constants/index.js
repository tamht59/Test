export const routes = {
  INDEX: '/',
  HOME: '/home',
  LOGIN: '/login',
  FLOWER_DEDICATION: '/flower_dedication'
}

export const defaultInitState = {
  status: '',
  result: null,
  error: null,
  requesting: false
}

export const ALBUM_TYPE = {
  IMAGE: '1',
  VIDEO: '2'
}

export const MESSAGE_TYPE = {
  TEXT: '0',
  IMAGE: '1',
  VOICE: '2',
  VIDEO: '3'
}

export const STORAGE_KEY = {
  AUTH: 'auth'
}

export const ALERT_WAIT_FOR_APROVE = {
  comment: "コメントを行うには招待申請の承認が必要です",
  message: "メッセージを見るには招待申請の承認が必要です",
  album: "アルバムを見るには招待申請の承認が必要です",
  profile: "プロフィールを見るには招待申請の承認が必要です",
  flower: "供花を行うには招待申請の承認が必要です",
  albumPost: "新規アルバムを追加するには招待申請の承認が必要です。"
}

export const ALERT_REQUEST_LOGIN = {
  comment: "ご利用には、ログインが必要です。",
  message: "メッセージを見るにはログインが必要です",
  album: "アルバムを見るにはログインが必要です",
  profile: "プロフィールを見るにはログインが必要です",
  flower: "ご利用には、ログインが必要です。",
  albumPost: "ご利用には、ログインが必要です。"
}
