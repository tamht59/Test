import {axiosConfigHeader} from '~/utils/helper/axiosConfig'

//墓管理者アカウント取得
const getAdminAccount = (axios, data) => {
  const url_token = data
  const url = `/Core/api/admin_accounts/${url_token}`
  const config = axiosConfigHeader(axios.defaults, {method: 'GET', url})
  return axios.$get(url, config)
}

//墓管理者アカウント確認
const postAdminAccountCheck = (axios, data) => {
  const req = {
    login_id: data.login_id,
    password: data.password
  }
  const url = `/Core/api/admin_accounts_chk`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, req, config)
}

//墓管理者アカウント情報変更
const postAdminAccountChange = (axios, data) => {
  console.log(data)
  const url_token = data.url_token
  const req = {
    login_id: data.login_id,
    password: data.password
  }

  const url = `/Core/api/admin_accounts/${url_token}`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, req, config)
}

//新規アカウント作成
const postNewAccountTokens = (axios, data) => {
  const url = `/Core/api/tokens`
  const config = axiosConfigHeader(axios.defaults, {method: 'POST', url})
  return axios.$post(url, data, config)
}

//退会理由カテゴリの取得
const getRetireReasonCategories = axios => {
  const url = '/Core/api/retire_reason_category'
  return axios.$get(url)
}

export default {
  getAdminAccount,
  postAdminAccountCheck,
  postAdminAccountChange,
  postNewAccountTokens,
  getRetireReasonCategories
}
