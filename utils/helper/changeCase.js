import _ from 'lodash'

export const changeCase = (data, option) => {
  let lodashChangeCaseFunc
  if (typeof option === 'string') {
    lodashChangeCaseFunc = option === 'snake'
      ? _.snakeCase
      : _.camelCase
  } else if (!option) {
    lodashChangeCaseFunc = _.camelCase
  } else {
    lodashChangeCaseFunc = option
  }


  if (data && typeof data === 'object') {
    if (_.isArray(data)) {
      return _.map(data, value => {
        return changeCase(value, lodashChangeCaseFunc)
      })
    }

    return _.transform(data, (rs, value, key) => {
      const newValue = changeCase(value, lodashChangeCaseFunc)

      const newKey = lodashChangeCaseFunc(key)
      rs[newKey] = newValue
    })
  }

  return data
}
