/*
  合作意向接口模块
*/

import http from './http'
import path from './path'

export default {
  all (query = {}) {
    let qs = '?'
    for (const i in query) {
      qs += i + '=' + query[i] + '&'
    }
    qs = qs.slice(0, -1)
    return http.get(path.coop + qs)
  },
  one (id) {
    return http.get(path.coop + '/' + id)
  },
  delete (id) {
    return http.delete(path.coop + '/' + id)
  }
}
