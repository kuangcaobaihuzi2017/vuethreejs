import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import store from '../store'
function createTopPage() {
  // 导入天马模型
  importPegasasu()
  // 导入天马周围的星星
  importStar()
}
// 导入天马模型
function importPegasasu() {
  var model = new FBXLoader()
  model.load(
    '/static/Unicorn Pose 2.fbx',
    (pegasasu) => {
      pegasasu.position.set(-0.4, 0, -3)
      pegasasu.rotation.set(0, Math.PI * 0.6, 0)
      pegasasu.scale.set(0.05, 0.05, 0.05)
      pegasasu.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
          child.material.transparent = true
        }
      })
      store.commit('addToScene', pegasasu)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入天马周围的星星
function importStar() {
  var model = new FBXLoader()
  // 第二个数字用来计算星的密度
  var range = 45 / 4
  model.load(
    '/static/Star.fbx',
    (start) => {
      const starInstance = start.children[0]
      for (var i = 0; i < 32; i++) {
        var newStar = starInstance.clone()
        // 在页面初始化的时候，所有星星在x轴上的坐标都在相机视野外
        newStar.position.set(0, 1 + 2 * Math.cos((range * i * 3.14) / 180), 2 * Math.sin((range * i * 3.14) / 180) - 3)
        newStar.rotation.set(0, Math.PI * 0.5, 0)
        newStar.name = 'star' + i
        newStar.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.color.setRGB(1, 0.3, 0)
          }
        })
        store.commit('addToScene', newStar)
      }
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
export { createTopPage }
