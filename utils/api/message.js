import {axiosConfigHeader} from '~/utils/helper'

const getListMessages = (axios, data, token) => {
  const { page = 1, room_id} = data
  const url = '/Core/api/message_lists/' + room_id
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url + '?page=' + page, config)
}

const getMessageDetail = (axios, data, token) => {
  const {message_id} = data
  const url = `/Core/api/messages/${message_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const getMessageUnread = (axios, data, token) => {
  const {room_id} = data
  const url = `/Core/api/message_reads/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

export default {
  getListMessages,
  getMessageDetail,
  getMessageUnread
}
