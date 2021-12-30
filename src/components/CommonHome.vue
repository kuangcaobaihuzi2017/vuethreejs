<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      orbcitControls: null,
      container: null,
      front: null,
      animationCount: 0,
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    initScene: function () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf0f0f0)
      this.scene.fog = new THREE.Fog(0xf0f0f0, 2, 30)
    },
    initGird: function () {
      const grid = new THREE.GridHelper(700, 1000, 0x888888, 0x888888)
      grid.material.opacity = 0.3
      grid.material.transparent = true
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }))
      mesh.rotation.x = -Math.PI / 2
      this.scene.add(grid)
      this.scene.add(mesh)
    },

    intiHemiLight: function () {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
      hemiLight.position.set(0, 20, 0)
      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(0, 20, 10)
      this.scene.add(hemiLight)
      this.scene.add(dirLight)
    },
    initCamera: function () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set(9, 2, -0)
      this.camera.lookAt(0, 0, -1)
    },
    initRenderer: function () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight, false)
      this.renderer.outputEncoding = THREE.sRGBEncoding
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
      })
    },
    initOrbitController: function () {
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.enablePan = false
      this.orbitControls.enableZoom = false
      this.orbitControls.minPolarAngle = Math.PI / 4
      this.orbitControls.maxPolarAngle = Math.PI / 2
      this.orbitControls.enableZoom = false
    },
    animate: function () {
      requestAnimationFrame(this.animate)

      // 如果星的加载全部完成(一共31个)
      if (this.scene.getObjectByName('star31') !== undefined) {
        // 则开始着手移动这些星
        for (var i = 0; i < 32; i++) {
          // 获取当前星的名字
          var starName = 'star' + i
          // 如果当前星或者所有星已经移动到指定位置，则不做任何处理
          if (this.scene.getObjectByName(starName).position.x < 0) {
            continue
          }

          // 从store获取渲染回数，每个星的渲染间隔10次(暂定)
          // 如果当前循环中的星已经达到渲染间隔，则提交位置更改
          if (this.animationCount > i * 5) {
            this.scene.getObjectByName('star' + i).translateX(0)
            this.scene.getObjectByName('star' + i).translateY(0)
            this.scene.getObjectByName('star' + i).translateZ(-1)
          }
        }
      }

      // 如果字体的加载已经完成
      if (this.scene.getObjectByName('fontFront') !== undefined) {
        // 如果已经移动到指定位置，则直接返回
        if (this.scene.getObjectByName('fontFront').position.z >= 3) {
          // 则开始着手移动字体
          this.scene.getObjectByName('fontFront').translateX(0.1)
          this.scene.getObjectByName('fontFront').translateY(0)
          this.scene.getObjectByName('fontFront').translateZ(0.05)
        }
      }
      this.animationCount++
      this.renderer.render(this.scene, this.camera)
    },
    init: function () {
      this.container = document.getElementById('container')
      this.initScene()
      this.initGird()
      this.intiHemiLight()
      this.initCamera()
      this.initRenderer()
      this.importPegasasu()
      this.importStar()
      this.importTopPageFont()
      this.importTopPageFont2()
      this.initOrbitController()
      this.animate()
      this.container.appendChild(this.renderer.domElement)
    },
    importPegasasu: function () {
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
          this.scene.add(pegasasu)
        },
        undefined,
        function (error) {
          console.log(error)
        }
      )
    },
    importStar: function () {
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
            this.scene.add(newStar)
          }
        },
        undefined,
        function (error) {
          console.log(error)
        }
      )
    },
    importTopPageFont: function () {
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
        this.scene.add(text)
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
    },
    importTopPageFont2: function () {
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
        this.scene.add(text)
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
    },
  },
}
</script>

<style>
#container {
  width: 100%;
  height: 100vh;
}
</style>
