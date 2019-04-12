import {axiosConfigHeader} from '~/utils/helper/axiosConfig'

const getContactCategories = axios => {
  const url = '/Core/api/contact_category'
  return axios.$get(url)
}

const postContact = (axios, data) => {
  const url = '/Core/api/contacts'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, data, config)
}

const postContactCheck = (axios, data) => {
  const url = '/Core/api/contacts/check'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, data, config)
}

const postContactSend = (axios, data) => {
  const url = '/Core/api/contacts'
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, data, config)
}

export default {
  getContactCategories,
  postContact,
  postContactCheck,
  postContactSend
}
