export default {
  loginData: state => state.login,
  getUserData: state => {
    //resultの中身がある場合はresultを返す
    if (state.userData.result) {
      return state.userData.result
    }
    return -1
  },
  putUserData: state => {
    return state.putUserData
  },
  errorGetEntries: state => state.entries.error
}
