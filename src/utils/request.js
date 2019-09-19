import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://wghtstudio.cn/pair';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  throw new Error('Request Error')
}

function checkData(data) {
  if (data.status === 'success') {
    return data
  }

  throw new Error(data['err_msg'])
}

async function get(url = '', params = {}) {
  const response = await axios.get(url, {
    params
  });

  checkStatus(response);

  return checkData(response.data)
}

async function post(url = '', data = {}) {
  const response = await axios.post(url, qs.stringify(data));

  checkStatus(response);

  return checkData(response.data);
}

export default {
  get,
  post
}