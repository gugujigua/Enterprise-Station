import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://127.0.0.1:7001',
    uploadUrl: 'http://127.0.0.1:7001/api/upload',
    pageSizes: [2, 5, 10, 20, 50],
    limit: 2
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
