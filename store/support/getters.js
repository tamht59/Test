export default {
  getContactCategory: state => {
    //resultの中身がある場合はresultを返す
    if (state.contactCategory.result) {
      return state.contactCategory.result
    }
    return []
  },
  postContactCheckData: state => {
    //errorの中身がある場合はerrorを返す
    if (state.contactPostCheckData.error) {
      return state.contactPostCheckData.error
    }
    return {
      code: '',
      errors: {
        contact_name: {},
        contact_name_kana: {},
        phone_number: {},
        mail: {},
        category_id: {},
        content: {}
      }
    }
  },
  postContactData: state => {
    //resultの中身がある場合はresultを返す
    if (state.contactPostData.result) {
      return state.contactPostData.result
    }
    return {
      category_id: '',
      contact_name: '',
      contact_name_kana: '',
      company_name: '',
      mail: '',
      phone_number: '',
      content: ''
    }
  }
}
