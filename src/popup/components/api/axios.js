import axios from 'axios'
import utils from '../common/utils'

let http = axios.create({
    // baseURL: "http://127.0.0.1:9090"
    baseURL: "https://api.crazyman.ml"
})

async function get(uri, params, callback) {
    let resp = await http.get(uri, {
      params: params
    })
    if (resp.status !== 200) {
      utils.notify("请求失败", "网络错误")
      return
    }
    let data = resp.data
    if (data.code !== 0) {
      utils.notify("请求失败", data.message)
      return
    }
    callback(data.data)
  }
export default {
    http, 
    get,
}