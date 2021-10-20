import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postion: false,
  },
  mutations: {
    changeStatus(state) {
      state.postion = !state.postion
    },
  },
  actions: {},
  modules: {},
})
