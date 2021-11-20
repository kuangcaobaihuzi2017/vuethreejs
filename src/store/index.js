import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    camera: null,
    scene: null,
    render: null,
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
    setCameraAspect(state, width, height) {
      state.camera.aspect = width / height
      state.camera.updateProjectionMatrix()
    },
    createScene(state, scene) {
      state.scene = scene
    },
    createCamera(state, camera) {
      state.camera = camera
    },
    createRender(state, render) {
      state.render = render
    },
    setRender(state, width, height) {
      state.render.setSize(width, height)
    },
    render(state) {
      state.render.render(state.scene, state.camera)
    },
    addToScene(state, objDto) {
      state.scene.add(objDto)
    },
  },
  actions: {},
  modules: {},
})
