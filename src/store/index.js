import Vue from 'vue'
import Vuex from 'vuex'
import * as THREE from 'three'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    changePositionFlag: false,
    cameraPositition: new THREE.Vector3(0, 0, 0),
    isTopPageFlag: true,
    lookAtposition: new THREE.Vector3(0, 1, 0),
    // 所有页面的位置情报(相机在该平面的位置)
    // pagePosition: [{ toppage: null }, { serviceList: null }, { research: null }, { compyInfo: null }, { job: null }, { access: null }],
  },
  mutations: {
    setCamerPosition(state, positionDto) {
      console.log('positionDto.cameraPositition.x : ' + positionDto.cameraPositition.x)
      console.log('positionDto.cameraPositition.y : ' + positionDto.cameraPositition.y)
      console.log('positionDto.cameraPositition.z : ' + positionDto.cameraPositition.z)
      console.log('positionDto.timer : ' + positionDto.timer)
      state.cameraPositition = positionDto
    },
    changePosition(state) {
      state.changePositionFlag = !state.changePositionFlag
    },
    moveToServiceList(state) {
      state.changePositionFlag = !state.changePositionFlag
      state.isTopPageFlag = false
    },
  },
  actions: {},
  modules: {},
})
