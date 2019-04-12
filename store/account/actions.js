import {
  ADMIN_ACCOUNT_GET_DATA,
  ADMIN_ACCOUNT_CHECK_DATA,
  ADMIN_ACCOUNT_POST_DATA,
  NEW_ACCOUNT_TOKEN_DATA,
  RETIRE_REASON_GET_CATEGORY,
  RETIRE_REASON_POST_DATA
} from '~/utils/constants/mutations'
import accountApi from '~/utils/api/account'
import {changeCase, getError} from '~/utils/helper'

export default {
  async getAdminAccount({commit}, data) {
    commit(ADMIN_ACCOUNT_GET_DATA.request)
    try {
      const req = changeCase(data, 'snake')
      const res = await accountApi.getAdminAccount(this.$axios, req)
      commit(ADMIN_ACCOUNT_GET_DATA.success, changeCase(res))
    } catch (err) {
      commit(ADMIN_ACCOUNT_GET_DATA.fail, getError(err))
    }
  },

  async postAdminAccountCheck({commit}, data) {
    commit(ADMIN_ACCOUNT_CHECK_DATA.request)
    try {
      const check_res = await accountApi.postAdminAccountCheck(this.$axios, data)
      commit(ADMIN_ACCOUNT_CHECK_DATA.success, changeCase(check_res))
      commit(ADMIN_ACCOUNT_POST_DATA.request)
      try {
        const change_res = await accountApi.postAdminAccountChange(this.$axios, data)
        commit(ADMIN_ACCOUNT_POST_DATA.success, changeCase(change_res))
        $nuxt.$router.push('/Core/admin/AdminTomb/edit/')
      } catch (err) {
        commit(ADMIN_ACCOUNT_POST_DATA.fail, getError(err))
      }
    } catch (err) {
      commit(ADMIN_ACCOUNT_CHECK_DATA.fail, getError(err))
    }
  },

  //
  async postNewAccountTokens({commit}, data) {
    commit(NEW_ACCOUNT_TOKEN_DATA.request)
    try {
      const {name, password, confirm_password, mail, confirm_mail} = changeCase(data, 'snake')
      const req = {
        name: name,
        password: password,
        confirm_password: confirm_password,
        mail: mail,
        confirm_mail: confirm_mail
      }
      const res = await accountApi.postNewAccountTokens(this.$axios, req)
      commit(NEW_ACCOUNT_TOKEN_DATA.success, changeCase(res))
      $nuxt.$router.push('/account/create/temporary_registration')
    } catch (err) {
      commit(NEW_ACCOUNT_TOKEN_DATA.fail, getError(err))
    }
  },

  async getRetireReasonCategories({commit}) {
    commit(RETIRE_REASON_GET_CATEGORY.request)
    try {
      const res = await accountApi.getRetireReasonCategories(this.$axios)
      commit(RETIRE_REASON_GET_CATEGORY.success, changeCase(res))
    } catch (err) {
      commit(RETIRE_REASON_GET_CATEGORY.fail, getError(err))
    }
  },

  async postRetireReason({commit}, data) {
    //退会理由を送信
    commit(RETIRE_REASON_POST_DATA.request)
    try {
      const {reson, improve, wanted_function, other} = changeCase(data, 'snake')
      const req = {
        reson: reson,
        improve: improve,
        wanted_function: wanted_function,
        other: other
      }
      await commit(RETIRE_REASON_POST_DATA.success, changeCase(req, 'snake'))
      $nuxt.$router.push('/account/delete/confirm')
    } catch (err) {
      commit(RETIRE_REASON_POST_DATA.fail, getError(err))
    }
  },

  async retireDefinition({commit}, data) {
    //退会確定
    try {
      const req = changeCase(data, 'snake')
      //const res = await userApi.deleteUserData(this.$axios, req)
      $nuxt.$router.push('/account/delete/complete')
    } catch (err) {}
  }
}
