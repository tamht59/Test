import {CONTACT_GET_CATEGORY, CONTACT_POST_CHECK, CONTACT_POST_DATA} from '~/utils/constants/mutations'
import supportApi from '~/utils/api/support'
import {changeCase, getError} from '~/utils/helper'

export default {
  async getContactCategories({commit}) {
    commit(CONTACT_GET_CATEGORY.request)
    try {
      const res = await supportApi.getContactCategories(this.$axios)
      commit(CONTACT_GET_CATEGORY.success, changeCase(res))
    } catch (err) {
      commit(CONTACT_GET_CATEGORY.fail, getError(err))
    }
  },

  async postContactCheck({commit}, data) {
    commit(CONTACT_POST_CHECK.request)
    try {
      const {contact_name, contact_name_kana, company_name, mail, phone_number, category_id, content} = changeCase(
        data,
        'snake'
      )
      const req = {
        contact_name: contact_name,
        contact_name_kana: contact_name_kana,
        company_name: company_name,
        mail: mail,
        phone_number: phone_number,
        category_id: category_id,
        content: content
      }

      const res = await supportApi.postContactCheck(this.$axios, req)

      const reset = {
        contact_name: '',
        contact_name_kana: '',
        company_name: '',
        mail: '',
        phone_number: '',
        category_id: '',
        content: ''
      }

      commit(CONTACT_POST_CHECK.success, changeCase(reset, 'snake'))
      commit(CONTACT_POST_DATA.success, changeCase(req, 'snake'))
      $nuxt.$router.push('/support/contact/confirm')
    } catch (err) {
      commit(CONTACT_POST_CHECK.fail, getError(err))
    }
  },

  async postContactSend({commit}, data) {
    commit(CONTACT_POST_DATA.request)
    try {
      const {contact_name, contact_name_kana, company_name, mail, phone_number, category_id, content} = changeCase(
        data,
        'snake'
      )
      const req = {
        contact_name: contact_name,
        contact_name_kana: contact_name_kana,
        company_name: company_name,
        mail: mail,
        phone_number: phone_number,
        category_id: category_id,
        content: content
      }
      await supportApi.postContactSend(this.$axios, req)

      const reset = {
        contact_name: '',
        contact_name_kana: '',
        company_name: '',
        mail: '',
        phone_number: '',
        category_id: '',
        content: ''
      }

      commit(CONTACT_POST_DATA.success, changeCase(reset, 'snake'))
      $nuxt.$router.push('/support/contact/complete')
    } catch (err) {
      commit(CONTACT_POST_DATA.fail, getError(err))
    }
  }
}
