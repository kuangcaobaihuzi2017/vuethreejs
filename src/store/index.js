import Vue from 'vue'
import Vuex from 'vuex'
import * as THREE from 'three'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    positionDto: null,
    // 初次渲染页面判定
    initPageFlag: true,
    // 是否渲染页面判定
    updatePageFlag: true,
    // lookup位置
    lookAtPosition: new THREE.Vector3(0, 1, 0),
    pageInfo: [
      { pageName: 'topage', flag: true },
      { pageName: 'serviceList', flag: false },
      { pageName: 'research', flag: false },
      { pageName: 'company', flag: false },
      { pageName: 'job', flag: false },
      { pageName: 'map', flag: false },
    ],
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
    moveToServiceList(state) {
      var pageTarget = ''
      // 将其他页面的聚焦设定为false
      for (var i = 0; i < state.pageInfo.length; i++) {
        // 获取当前页面所在位置
        if (state.pageInfo[i].flag) {
          pageTarget = state.pageInfo[i].pageName
        }
        // 将其他页面的聚焦设定为false
        state.pageInfo[i].flag = false
        console.log('pageTarget : ' + pageTarget)
      }
      // 将页面聚焦设定到服务一览
      state.pageInfo[1].flag = true
      // state.positionDto
    },
    calLookAtPosition(state) {
      if (state.pageInfo[0].flag) {
        state.lookAtPosition = new THREE.Vector3(0, 1, 0)
      } else if (state.pageInfo[1].flag) {
        state.lookAtPosition = new THREE.Vector3(0, 1, 0)
      }
    },
  },
  actions: {},
  modules: {},
})
