/*
  轮播管理接口模块
*/

import http from './http'
import path from './path'

export default {
  all () {
    return http.get(path.wheel)
  },
  one (id) {
    return http.get(path.wheel + '/' + id)
  },
  edit (id, data) {
    return http.put(path.wheel + '/' + id, data)
  },
  add (data) {
    return http.post(path.wheel, data)
  },
  delete (id) {
    return http.delete(path.wheel + '/' + id)
  }
}
