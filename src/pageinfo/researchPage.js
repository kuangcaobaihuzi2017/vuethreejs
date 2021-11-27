import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import * as THREE from 'three'
import store from '../store'
function createResearchPage() {
  // 导入天马模型
  importThinkerModel()
  importThinkerFont()
}
// 导入天马模型
function importThinkerModel() {
  var model = new FBXLoader()
  model.load(
    '/static/Thinker.FBX',
    (thinker) => {
      thinker.position.set(-9, 0, -65)
      thinker.rotation.set(0, (Math.PI * 2) / 13, 0)
      thinker.scale.set(0.015, 0.015, 0.015)
      thinker.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
          child.material.transparent = true
        }
      })
      store.commit('addToScene', thinker)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入研究页面的说明文字
function importThinkerFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '先端技術 ×素晴らしい発想 \n= 次世代動画エンジン：'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, (Math.PI * 3) / 6, 0)
    text.position.set(-9, 2, -59)
    text.scale.set(0.8, 0.8, 0.8)
    text.name = 'fontFront'
    store.commit('addToScene', text)
    const holeShapes = []
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i]
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          const hole = shape.holes[j]
          holeShapes.push(hole)
        }
      }
    }
  })
}
export { createResearchPage }
