import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import store from '../store'
function createServiceListF() {
  // 导入se服务基本模型
  importSeServiceBasic()
  // 导入天马周围的星星
}
// 导入天马模型
function importSeServiceBasic() {
  var model = new FBXLoader()
  model.load(
    '/static/bank.fbx',
    (seBasic) => {
      seBasic.position.set(0, 0, -25)
      seBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      seBasic.scale.set(0.005, 0.005, 0.005)
      seBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', seBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
export { createServiceListF }
