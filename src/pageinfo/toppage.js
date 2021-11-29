import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import store from '../store'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
function createTopPage() {
  // 导入天马模型
  importPegasasu()
  // 导入天马周围的星星
  importStar()
  // 导入首页欢迎文字
  importTopPageFont()
  importTopPageFont2()
}
// 导入天马模型
function importPegasasu() {
  var model = new FBXLoader()
  model.load(
    '/static/Unicorn Pose 2.fbx',
    (pegasasu) => {
      pegasasu.position.set(-1.3, 0, -3)
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
        newStar.position.set(9, 1 + 2 * Math.cos((range * i * 3.14) / 180), 2 * Math.sin((range * i * 3.14) / 180) - 3)
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
// 导入首页欢迎文字2
function importTopPageFont() {
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
    text.rotation.set(Math.PI / 2, Math.PI, (6 * Math.PI) / 4)
    text.position.set(3.8, 0, 0)
    text.name = 'fontFront2'
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
// 导入首页欢迎文字2
function importTopPageFont2() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '  Baisheng\n  Dynamic \n へようこそ.'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, 90, 0)
    text.position.set(0, 2.3, 15)
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
export { createTopPage }
