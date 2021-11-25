import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import store from '../store'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
function createServiceListF() {
  // 导入银行模型
  importBankModel()
  // 导入银行文字
  importBankFont()
  // 导入建筑模型
  importArchModel()
  // 导入建筑文字
  importArchFont()
  // 导入通信模型
  importCommModel()
  // 导入建筑文字
  importCommFont()
  // 导入餐厅模型
  importResModel()
  // 导入餐厅文字
  importResFont()
  // 导入工厂模型
  importFacModel()
  // 导入工厂文字
  importFacFont()
  // 导入视频模型
  importVideoModel()
  // 导入视频文字
  importVideoFont()
  // 导入流通模型
  importDumpModel()
  // 导入流通文字
  importDumpFont()
}
// 导入银行模型
function importBankModel() {
  var model = new FBXLoader()
  model.load(
    '/static/bank.fbx',
    (seBasic) => {
      seBasic.position.set(-1, 0, -24)
      seBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      seBasic.scale.set(0.0045, 0.0045, 0.0045)
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

// 导入银行文字
function importBankFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '銀行/保険'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, Math.PI / 2, 0)
    text.position.set(-1, 1.5, -24)
    text.scale.set(0.35, 0.35, 0.35)
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

// 导入建筑模型
function importArchModel() {
  var model = new FBXLoader()
  model.load(
    '/static/jianzhu.fbx',
    (arBasic) => {
      arBasic.position.set(-1, 0, -26)
      arBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      arBasic.scale.set(0.004, 0.004, 0.004)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入建筑文字
function importArchFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '建築/不動産'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, Math.PI / 2, 0)
    text.position.set(-1, 1.5, -26)
    text.scale.set(0.35, 0.35, 0.35)
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
// 导入通信模型
function importCommModel() {
  var model = new FBXLoader()
  model.load(
    '/static/communication.fbx',
    (arBasic) => {
      arBasic.position.set(-1, 0, -28)
      arBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      arBasic.scale.set(0.007, 0.007, 0.007)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入建筑文字
function importCommFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '公共/通信'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, Math.PI / 2, 0)
    text.position.set(-1, 1.5, -28)
    text.scale.set(0.35, 0.35, 0.35)
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

// 导入餐厅模型
function importResModel() {
  var model = new FBXLoader()
  model.load(
    '/static/Restaurant_Low.fbx',
    (arBasic) => {
      arBasic.position.set(2, 0, -26)
      arBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      arBasic.scale.set(0.005, 0.005, 0.005)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入餐厅文字
function importResFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '飲食/サービス'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(Math.PI / 2, Math.PI / 1.5, (6 * Math.PI) / 4)
    text.position.set(3.2, 0, -26)
    text.scale.set(0.35, 0.35, 0.35)
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

// 导入工厂模型
function importFacModel() {
  var model = new FBXLoader()
  model.load(
    '/static/Mega_factory_Low.fbx',
    (arBasic) => {
      arBasic.position.set(2, 0, -28)
      arBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      arBasic.scale.set(0.0027, 0.0027, 0.0027)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入工厂文字
function importFacFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '製造'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(Math.PI / 2, Math.PI / 1.5, (6 * Math.PI) / 4)
    text.position.set(3.2, 0, -28)
    text.scale.set(0.35, 0.35, 0.35)
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
// 导入视频模型
function importVideoModel() {
  var model = new FBXLoader()
  model.load(
    '/static/video.fbx',
    (arBasic) => {
      arBasic.position.set(2.5, 0, -28.7)
      arBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
      arBasic.scale.set(0.0027, 0.0027, 0.0027)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入视频文字
function importVideoFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '画像/映像'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(Math.PI / 2, Math.PI / 1.5, (6 * Math.PI) / 4)
    text.position.set(3.2, 0, -30)
    text.scale.set(0.35, 0.35, 0.35)
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

// 导入流通模型
function importDumpModel() {
  var model = new FBXLoader()
  model.load(
    '/static/Dump.fbx',
    (arBasic) => {
      arBasic.position.set(-1, 0, -30)
      arBasic.rotation.set(0, (Math.PI * 2) / 3, 0)
      arBasic.scale.set(0.005, 0.005, 0.005)
      arBasic.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.setRGB(0.18431, 0.3098, 0.3098)
        }
      })
      store.commit('addToScene', arBasic)
    },
    undefined,
    function (error) {
      console.log(error)
    }
  )
}
// 导入流通文字
function importDumpFont() {
  var font = new FontLoader()
  font.load('/static/07YasashisaGothic_Regular.json', (json) => {
    const color = 0x330066
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const message = '流通'
    const shapes = json.generateShapes(message, 0.7)
    const geometry = new THREE.ShapeGeometry(shapes)
    geometry.computeBoundingBox()
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
    geometry.translate(xMid, 0, 0)
    const text = new THREE.Mesh(geometry, matLite)
    text.rotation.set(0, Math.PI / 2, 0)
    text.position.set(-1, 1.5, -30)
    text.scale.set(0.35, 0.35, 0.35)
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
export { createServiceListF }
