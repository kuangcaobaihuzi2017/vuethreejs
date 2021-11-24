import * as THREE from 'three'
import store from '../store'
function createRender() {
  var render = new THREE.WebGLRenderer({ antialias: true })
  render.setPixelRatio(window.devicePixelRatio)
  render.setSize(window.innerWidth, window.innerHeight)
  render.outputEncoding = THREE.sRGBEncoding
  render.outputEncoding = THREE.sRGBEncoding
  // 将创建好的render提交到store
  store.commit('createRender', render)
  window.addEventListener('resize', () => {
    store.commit('setCameraAspect', window.innerWidth, window.innerHeight)
    store.commit('setRender', window.innerWidth, window.innerHeight)
  })
  // 将创建好的renderer提交到store
  store.commit('createRender', render)
}
export { createRender }
