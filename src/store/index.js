import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    positionDto: null,
    // 初次渲染页面判定
    initPageFlag: true,
    // 是否渲染页面判定
    updatePageFlag: true,
  },
  mutations: {
    setCamerPosition(state, positionDto) {
      state.positionDto = positionDto
    },
    updatePageFlag(state) {
      state.updatePageFlag = !state.updatePageFlag
    },
    updateinitPageFlag(state) {
      state.initPageFlag = !state.initPageFlag
    },
  },
  actions: {},
  modules: {},
})
