import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    changePositionFlag: false,
    cameraPositition: '',
    cloudGroup: [],
  },
  mutations: {
    setCameraPosition(state, positionDto) {
      state.cameraPositition = positionDto.cameraPositition
    },
    changePosition(state) {
      state.changePositionFlag = !state.changePositionFlag
    },
    moveToServiceList(state) {
      state.changePositionFlag = !state.changePositionFlag
    },
  },
  actions: {},
  modules: {},
})
