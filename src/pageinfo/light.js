import * as THREE from 'three'
import store from '../store'
function createLight() {
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 0)
  const dirLight = new THREE.DirectionalLight(0xffffff)
  dirLight.position.set(0, 20, 10)
  // 将创建好的scene提交到store
  store.commit('addToScene', hemiLight)
  store.commit('addToScene', dirLight)
}
export { createLight }
