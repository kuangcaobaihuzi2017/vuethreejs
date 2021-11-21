import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    camera: null,
    scene: null,
    render: null,
    animationCount: 0,
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
    countAnimation(state) {
      state.animationCount = state.animationCount + 1
    },
    adjPosition(state, objName) {
      state.scene.getObjectByName(objName).translateZ(-0.7)
    },
  },
  actions: {},
  modules: {},
})
