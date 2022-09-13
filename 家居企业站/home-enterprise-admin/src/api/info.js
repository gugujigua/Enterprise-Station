/*
  网站信息接口模块
*/

import http from './http'
import path from './path'

export default {
  one (id) {
    return http.get(path.info + '/' + id)
  },
  edit (id, data) {
    return http.put(path.info + '/' + id, data)
  }
}
