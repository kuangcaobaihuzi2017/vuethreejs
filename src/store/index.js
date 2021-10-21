import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position: false,
    matrixPosition: '',
  },
  mutations: {
    setCameraPosition(state, positionDto) {
      state.matrixPosition = positionDto.cameraPositition
      // console.log('state.matrixPosition has been change : ' + state.matrixPosition)
    },
    changeStatus(state) {
      state.position = !state.position
    },
  },
  actions: {},
  modules: {},
})
