/*
  单页管理接口模块
*/

import http from './http'
import path from './path'

export default {
  all (page, limit) {
    return http.get(path.page + `?page=${page}&limit=${limit}`)
  },
  one (id) {
    return http.get(path.page + '/' + id)
  },
  edit (id, data) {
    return http.put(path.page + '/' + id, data)
  },
  add (data) {
    return http.post(path.page, data)
  },
  delete (id) {
    return http.delete(path.page + '/' + id)
  }
}
