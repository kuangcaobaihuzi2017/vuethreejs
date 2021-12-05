import * as THREE from 'three'
import store from '../store'
function createScene() {
  var scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)
  scene.fog = new THREE.Fog(0xf0f0f0, 2, 30)
  // 将创建好的scene提交到store
  store.commit('createScene', scene)
}
export { createScene }
