// 集中管理URL

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:7001/'
} else {
  baseURL = 'http://127.0.0.1:7001/'
}

export default {
  login: baseURL + 'api/login',
  info: baseURL + 'api/info',
  wheel: baseURL + 'api/wheel',
  product: baseURL + 'api/product',
  news: baseURL + 'api/news',
  page: baseURL + 'api/page',
  coop: baseURL + 'api/coop'
}
