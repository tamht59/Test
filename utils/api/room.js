import {axiosConfigHeader} from '~/utils/helper/axiosConfig'

const postPray = (axios, data, token) => {
  const url = `/Core/api/timelines`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, data, config)
}

const getRoomData = (axios, data, token) => {
  const {room_id} = data
  const url = `/Core/api/rooms/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const getRoomUsers = (axios, data, token) => {
  const url = `/Core/api/room_users`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const getTimeline = (axios, data, token) => {
  const {room_id} = data
  const url = `/Core/api/timelines/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const getComment = (axios, data) => {
  const {id} = data
  return axios.$get(`/Core/api/room_comments/${id}`)
}

const postComment = (axios, data, token) => {
  const url = '/Core/api/room_comments'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, data, config)
}

const updateComment = (axios, data, token) => {
  const {id, ...args} = data
  const url = `/Core/api/room_comments/${id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'PUT', url, token})
  return axios.$put(url, args, config)
}

const deleteComment = (axios, data, token) => {
  const {id} = data
  const url = `/Core/api/room_comments/${id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'DELETE', url, token})
  return axios.$delete(url, config)
}

const getFlowerItems = (axios, data, token) => {
  const {room_id} = data
  const url = `/Core/api/items/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const getProfile = (axios, data, token) => {
  const url = `/Core/api/profiles/${data.id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const setBgImage = (axios, data, token) => {
  const {room_id, url_img} = data
  const url = `/Core/api/bg_image/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'PUT', url, token})
  return axios.$put(url, url_img, config)
}

const postItemBuy = (axios, data, token) => {
  const url = '/Core/api/item_buy_histories'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, data, config)
}

const getRoles = (axios, data, token) => {
  const url = '/Core/api/roles/' + data
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const postInvitationPeople = (axios, data, token) => {
  const url = '/Core/api/people_invitations'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, data, config)
}

export default {
  postPray,
  getRoomData,
  getRoomUsers,
  getTimeline,
  getComment,
  postComment,
  updateComment,
  deleteComment,
  getFlowerItems,
  getProfile,
  setBgImage,
  postItemBuy,
  getRoles,
  postInvitationPeople
}
