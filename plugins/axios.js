export default function ({ $axios, redirect }) {
  // $axios.setHeader('X-COIN-Session-Token', '3fccc07d7aa2b475d7a9a766607f5dbd3af4104f')
  $axios.setHeader('X-COIN-Application-Key', 'key')

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    console.log(response)
  })

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // } else {
      console.log('Failed!! Code: , code')
    // }
  })
}
