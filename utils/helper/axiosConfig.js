import Crypto from 'crypto-js'
import moment from 'moment'

export const axiosConfigHeader = (axiosDefault, { method, url, token }) => {
  const { headers: { common }, baseURL } = axiosDefault
  const key = common['X-COIN-Application-Key']
  
  let slicePoint = 0
  if (baseURL.startsWith("http://")) {
    slicePoint = 7
  } else if (baseURL.startsWith("https://")) {
    slicePoint = 8
  }
  const host = baseURL.slice(slicePoint)

  const timestamp = moment.utc().toISOString("YYYY-MM-DDTHH:mm:ss.SSS");
  // const timestamp = '2019-02-14T09:52:03.663Z'
  const message = method + '\n' + host + '\n' + url + '\n' + key + "&HmacSHA256&" + timestamp;

  const hash = Crypto.HmacSHA256(message, key);
  const signature = hash.toString(Crypto.enc.Base64);

  return {
    headers: {
      'X-COIN-Signature': signature,
      'X-COIN-Timestamp': timestamp,
      ...(token && { 'X-COIN-Session-Token': token })
    }
  }
}

