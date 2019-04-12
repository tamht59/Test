import { UPDATE_LOGIN_STATUS } from '~/utils/constants/mutations'
import { changeCase, getAuth } from '~/utils/helper'

export const actions = {
  nuxtServerInit({ commit }, { req } ) {
    try {
      const auth = changeCase(getAuth({ req }))
      commit( `user/${UPDATE_LOGIN_STATUS}`, auth)
    } catch (err) {
      // Fail to get auth data from cookie
    }
  }
}
