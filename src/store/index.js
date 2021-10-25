import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    positionChangeFlag: false,
    matrixPosition: '',
  },
  mutations: {
    setCameraPosition(state, positionDto) {
      state.matrixPosition = positionDto.cameraPositition
    },
    changePosition(state) {
      state.positionChangeFlag = !state.positionChangeFlag
    },
  },
  actions: {},
  modules: {},
})
