/*
  产品管理接口模块
*/

import http from './http'
import path from './path'

export default {
  all (page, limit) {
    return http.get(path.product + `?page=${page}&limit=${limit}`)
  },
  one (id) {
    return http.get(path.product + '/' + id)
  },
  edit (id, data) {
    return http.put(path.product + '/' + id, data)
  },
  add (data) {
    return http.post(path.product, data)
  },
  delete (id) {
    return http.delete(path.product + '/' + id)
  }
}
