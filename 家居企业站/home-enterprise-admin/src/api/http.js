// 处理axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
const instance = axios.create({

})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器  用来处理错误
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code === 401) {
    Message.error(response.data.msg)
    sessionStorage.removeItem('token')
    router.push({ name: 'login' })
  }
  if (response.data.code === 404) {
    Message.error(response.data.msg)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
instance.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.code === 404) {
        Message({
          message: response.data.msg,
          type: 'error'
        })
      } else if (response.data.code === 401) {
        sessionStorage.removeItem('token')
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 1000,
          onClose () {
            router.push({ name: 'Login' })
          }
        })
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'; break
        case 401: err.message = '未授权，请重新登录(401)'; break
        case 403: err.message = '拒绝访问(403)'; break
        case 404: err.message = '请求出错(404)'; break
        case 408: err.message = '请求超时(408)'; break
        case 500: err.message = '服务器错误(500)'; break
        case 501: err.message = '服务未实现(501)'; break
        case 502: err.message = '网络错误(502)'; break
        case 503: err.message = '服务不可用(503)'; break
        case 504: err.message = '网络超时(504)'; break
        case 505: err.message = 'HTTP版本不受支持(505)'; break
        default: err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    Message({
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
)
export default instance
