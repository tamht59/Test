import {axiosConfigHeader} from '~/utils/helper/axiosConfig'

const login = (axios, data) => {
  return axios.$post('Core/api/api/login', data)
}
const registration = (axios, data) => {
  const url = '/Core/api/entries'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, data, config)
}
const getUserData = (axios, data, token) => {
  const {user_id} = data
  const url = `/Core/api/users/${user_id}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url, token})
  return axios.$get(url, config)
}

const putUserData = (axios, data, token) => {
  const url = `/Core/api/users/`
  const config = axiosConfigHeader(axios.defaults, {method: 'put', url, token})
  return axios.$put(url, data, config)
}

const deleteUserData = (axios, data, token) => {
  const url = '/Core/api/users'
  const config = axiosConfigHeader(axios.defaults, {method: 'DELETE', url, token})
  return axios.$delete(url, data, config)
}

export default {
  login,
  registration,
  getUserData,
  putUserData,
  deleteUserData
}
