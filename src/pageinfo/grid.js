import * as THREE from 'three'
import store from '../store'
function createGird() {
  // // 第一个参数表示网格整个大小，第二个表示网格密度
  // const grid = new THREE.GridHelper(700, 1000, 0x888888, 0x888888)
  // // 表示辅助网格的透明度，最大是1表示完全不透明
  // grid.material.opacity = 0.3
  // // 如果材质的transparent属性未设置为true，则材质将保持完全不透明，此值仅影响其颜色
  // grid.material.transparent = true
  // store.commit('addToScene', grid)

  // 地面的大小
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }))
  mesh.rotation.x = -Math.PI / 2
  store.commit('addToScene', mesh)
}
export { createGird }
