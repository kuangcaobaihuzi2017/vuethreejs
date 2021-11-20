import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import store from '../store'
function pegasasu() {
  var model = new FBXLoader()
  model.load(
    '/static/Unicorn Pose 2.fbx',
    (pegasasu) => {
      pegasasu.position.set(-0.4, 0, -3)
      pegasasu.rotation.set(0, Math.PI * 0.6, 0)
      pegasasu.scale.set(0.05, 0.05, 0.05)
      pegasasu.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0, 0, 0)
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
export { pegasasu }
