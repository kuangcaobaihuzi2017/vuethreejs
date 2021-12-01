import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import store from '../store'
function createComponyInfo() {
  // 导入城市模型
  importCityModel()
}
// 导入城市模型
function importCityModel() {
  var model = new FBXLoader()
  model.load(
    '/static/city.fbx',
    (city) => {
      city.position.set(-15, 0, -90)
      city.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // child.material.color.setRGB(0.18431, 0.3098, 0.3098)
          child.material.transparent = true
        }
      })
      store.commit('addToScene', city)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
export { createComponyInfo }
