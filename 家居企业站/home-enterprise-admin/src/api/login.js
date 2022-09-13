/*
  登录接口模块
*/
import path from './path'
import http from './http'

export default {
  login (data) {
    return http.post(path.login, data)
  }
}
