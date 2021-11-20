import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import store from '../store'
function createOrbitControls() {
  new OrbitControls(store.state.camera, store.state.render.domElement)
  // orbitControls.enablePan = false
  // orbitControls.enableZoom = false
  // orbitControls.minPolarAngle = Math.PI / 4
  // orbitControls.maxPolarAngle = Math.PI / 2
}
export { createOrbitControls }
