import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    camera: null,
    inPositionFlag: false,
    pageInfoList: [
      // 默认首页面
      { pageValue: 'topage', flag: true, position: [12, 3, 0], step: 0 },
      { pageValue: 'service1', flag: false, position: [12, 3, 30], step: 0, pageName: 'プログラミングコース' },
      { pageValue: 'service2', flag: false, position: [12, 3, 30], step: 0, pageName: '受託開発/常駐開発' },
      { pageValue: 'service3', flag: false, position: [12, 3, 30], step: 0, pageName: '次世代動画サイト：ｘｘｘｘ' },
      { pageValue: 'service4', flag: false, position: [12, 3, 30], step: 0, pageName: '次世代ロボット：ｘｘｘｘ' },
      { pageValue: 'research', flag: false, position: [12, 3, 60], step: 0 },
      { pageValue: 'company', flag: false, position: [12, 3, 90], step: 0 },
      { pageValue: 'job', flag: false, position: [12, 3, 120], step: 0 },
      { pageValue: 'map', flag: false, position: [12, 3, 150], step: 0 },
    ],
    // 基本現在のカメラの信息を格納
    pageInfo: { pageValue: 'topage', flag: true, position: [12, 3, 0], step: 0, direction: 'right' },
  },
  mutations: {
    setCamera(state, cameraDto) {
      state.camera = cameraDto
    },
    moveToServiceList(state, pageInfo) {
      for (var count = 0; count < state.pageInfoList.size; count++) {
        console.log('pageInfo.pageName : ' + pageInfo.pageName)
        if (pageInfo.pageName === state.pageInfoList[count].pageName) {
          // 计算当前页面与目标距离的步长
          var step = (state.pageInfoList[1].position[2] - state.pageInfo.position[2]) / 0.04
          state.pageInfoList[1].step = step
          state.pageInfo = state.pageInfoList[1]
          state.pageInfo.direction = 'right'
        }
      }
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
