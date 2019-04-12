import {axiosConfigHeader} from '~/utils/helper/axiosConfig'

const getList = (axios, data, token) => {
  const {roomId, page} = data
  const url = `/Core/api/album_lists/${roomId}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(`${url}?page=${page}`, config)
}

const deleteAlbumItem = (axios, data, token) => {
  const {id} = data
  const url = `/Core/api/albums/${id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'DELETE', url, token})
  return axios.$delete(url, config)
}

const getAlbumDetail = (axios, id, token) => {
  const url = `/Core/api/albums/${id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const deleteAlbumDetail = (axios, id, token) => {
  const url = `/Core/api/album_details/${id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'DELETE', url, token})
  return axios.$delete(url, config)
}

const postAlbum = (axios, data, token) => {
  const {room_id, formData} = data
  const url = `/Core/api/albums/${room_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, formData, config)
}

const putAlbum = (axios, data, token) => {
  const url = `/Core/api/albums/${data.albumId}`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url, token})
  return axios.$post(url, data.formData, config)
}

export default {
  getList,
  deleteAlbumItem,
  getAlbumDetail,
  deleteAlbumDetail,
  postAlbum,
  putAlbum
}
