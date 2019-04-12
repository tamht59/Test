export default {
  getAdminAccountData: state => {
    //resultの中身がある場合はresultを返す
    if (state.adminAccountGetData.result) {
      return state.adminAccountGetData.result
    }
    return {
      name: '',
      login_id: ''
    }
  },

  postAdminAccountCheckData: state => {
    if (state.adminAccountCheckData.status) {
      return state.adminAccountCheckData.status
    }
    return -1
  },

  postNewAccountTokensData: state => {
    if (state.newAccountTokenData.error) {
      return state.newAccountTokenData.error
    }
    return {
      code: '',
      errors: {
        name: '',
        password: '',
        confirm_password: '',
        login_id: '',
        confirm_mail: ''
      }
    }
  },

  getRetireReasonCategory: state => {
    //resultの中身がある場合はresultを返す
    if (state.retireReasonCategory.result) {
      return state.retireReasonCategory.result
    }
    return []
  },
  getRetireReasonData: state => {
    //resultの中身がある場合はresultを返す
    if (state.retireReasonData.result) {
      return state.retireReasonData.result
    }
    return {
      category_id: '',
      improve: '',
      wantedFunction: '',
      other: ''
    }
  }
}
