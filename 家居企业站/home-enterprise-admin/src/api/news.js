/*
  轮播管理接口模块
*/

import http from './http'
import path from './path'

export default {
  all (page, limit) {
    return http.get(path.news + `?page=${page}&limit=${limit}`)
  },
  one (id) {
    return http.get(path.news + '/' + id)
  },
  edit (id, data) {
    return http.put(path.news + '/' + id, data)
  },
  add (data) {
    return http.post(path.news, data)
  },
  delete (id) {
    return http.delete(path.news + '/' + id)
  }
}
