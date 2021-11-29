import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import store from '../store'
function createServiceListPg() {
  // 导入银行模型
  importPgCourseFont()
}
// 导入变成学习网站的文字
function importPgCourseFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '希望創造未来'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, Math.PI / 2, 0)
    text.position.set(-30, 2.5, -30)
    text.name = 'fontFront2'
    store.commit('addToScene', text)
  })
}
export { createServiceListPg }
