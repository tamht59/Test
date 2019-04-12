export const saveDefaultRequest = (state) => ({
  ...state,
  status: '',
  requesting: true
})

export const saveDefaultSuccess = (state, data) => ({
  ...state,
  status: 'success',
  result: data,
  requesting: false
})

export const saveDefaultFail = (state, err) => ({
  ...state,
  status: 'fail',
  error: err,
  requesting: false
})

export const mapDefaultAllStep = (mutationConst, stateName) => ({
    [mutationConst.request](state) {
      return state[stateName] = saveDefaultRequest(state[stateName])
    },
    [mutationConst.success](state, data) {
      return state[stateName] = saveDefaultSuccess(state[stateName], data)
    },
    [mutationConst.fail](state, err) {
      return state[stateName] = saveDefaultFail(state[stateName], err)
    }
})
