import _ from 'lodash'

export const getError = (err) => {
  const data = _.get(err, 'response.data')

  if (data) {
    return data
  }
  return { message: 'Something went wrong!' }
}

