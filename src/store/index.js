import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    camera: null,
    inPositionFlag: false,
    pageInfoList: [
      // 默认首页面
      { pageName: 'topage', flag: true, position: [9, 3, 0], step: 0 },
      { pageName: 'serviceList', flag: false, position: [9, 3, 30], step: 0 },
      { pageName: 'research', flag: false, position: [9, 3, 60], step: 0 },
      { pageName: 'company', flag: false, position: [9, 3, 90], step: 0 },
      { pageName: 'job', flag: false, position: [9, 3, 120], step: 0 },
      { pageName: 'map', flag: false, position: [9, 3, 150], step: 0 },
    ],
    // 基本現在のカメラの信息を格納
    pageInfo: { pageName: 'topage', flag: true, position: [9, 3, 0], step: 0, direction: 'right' },
  },
  mutations: {
    setCamera(state, cameraDto) {
      state.camera = cameraDto
    },
    moveToServiceList(state) {
      // 计算当前页面与目标距离的步长
      var step = (state.pageInfoList[1].position[2] - state.pageInfo.position[2]) / 0.04
      state.pageInfoList[1].step = step
      state.pageInfo = state.pageInfoList[1]
      state.pageInfo.direction = 'right'
    },
    moveToTopPage(state) {
      // 计算当前页面与目标距离的步长
      var step = (state.pageInfoList[0].position[2] - state.pageInfo.position[2]) / 0.04
      state.pageInfoList[0].step = step
      state.pageInfo = state.pageInfoList[0]
      state.pageInfo.direction = 'left'
      console.log('state.pageInfo : ' + state.pageInfo.position[0])
    },
    changeInPositionFlag(state, parmas) {
      state.inPositionFlag = parmas
    },
  },
  actions: {},
  modules: {},
})
