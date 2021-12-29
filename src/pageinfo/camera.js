import * as THREE from 'three'
import store from '../store'
function createCamera() {
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100)
  // 相机位置xyz
  camera.position.set(9, 2, -0)
  // 将创建好的camera提交到store
  store.commit('createCamera', camera)
  store.commit('setLookAtPosition', { distanceX: -9, distanceY: 0, distanceZ: -0 })
}
export { createCamera }
