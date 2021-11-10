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
      timer: 0,
      camera: null,
      scene: null,
      renderer: null,
      orbcitControls: null,
      container: null,
      front: null,
      groundMirror: null,
      cloudNum: 0,
      mesh: null,
      lookAtZ: 0,
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
    // 网格辅助线
    initGird: function () {
      // 第一个参数表示网格整个大小，第二个表示网格密度
      const grid = new THREE.GridHelper(700, 1000, 0x888888, 0x888888)
      // 表示辅助网格的透明度，最大是1表示完全不透明
      grid.material.opacity = 0.3
      // 如果材质的transparent属性未设置为true，则材质将保持完全不透明，此值仅影响其颜色
      grid.material.transparent = true
      this.scene.add(grid)
      // 地面的大小
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }))
      mesh.rotation.x = -Math.PI / 2
      this.scene.add(mesh)
    },
    intiHemiLight: function () {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
      hemiLight.position.set(0, 20, 0)
      this.scene.add(hemiLight)
      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(0, 20, 10)
      this.scene.add(dirLight)
    },
    initCamera: function () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100)
      // 相机位置xyz
      this.camera.position.set(0.1, 3, 0)
    },
    initRenderer: function () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.outputEncoding = THREE.sRGBEncoding
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
    },
    importCloud: function () {
      // 随机生成6-10个云朵
      for (var count = 0; count <= Math.floor(Math.random() * 4) + 10; count++) {
        var model = new FBXLoader()
        model.load(
          '/static/Poly_cloud_2_Low.fbx',
          (fbx) => {
            fbx.position.set(Math.floor(Math.random() * 10) - 7, 3.4, Math.floor(Math.random() * 10) - 5)
            fbx.rotation.set(0, 0, 0)
            fbx.scale.set(0.002, 0.002, 0.002)
            fbx.rotation.y = 30
            fbx.name = 'cloud' + this.cloudNum
            fbx.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                child.material.color.setRGB(1, 1, 2)
              }
            })
            this.scene.add(fbx)
            this.cloudNum++
          },
          undefined,
          function (error) {
            console.log(error)
          }
        )
      }
    },
    importPegasasu: function () {
      var model = new FBXLoader()
      model.load(
        '/static/Unicorn Pose 2.fbx',
        (pegasasu) => {
          pegasasu.position.set(-0.4, 0, -3)
          pegasasu.rotation.set(0, Math.PI * 0.6, 0)
          pegasasu.scale.set(0.05, 0.05, 0.05)
          pegasasu.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material.color.setRGB(1, 0.3, 2)
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
    importStart: function () {
      var model = new FBXLoader()
      // 第二个数字用来计算星的密度
      var range = 45 / 4
      model.load(
        '/static/Star.fbx',
        (start) => {
          const starInstance = start.children[0]
          for (var i = 0; i < 32; i++) {
            var newStar = starInstance.clone()
            newStar.position.set(0, 1 + 2 * Math.cos((range * i * 3.14) / 180), 2 * Math.sin((range * i * 3.14) / 180) - 3)
            newStar.rotation.set(0, Math.PI * 0.5, 0)
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
    importFrot: function () {
      var font = new FontLoader()
      font.load('/static/helvetiker_regular.typeface.json', (json) => {
        const color = 0x006699
        const matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        })

        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        })

        const message = 'Welcome to\n  Baisheng \n  Dynamix.'

        const shapes = json.generateShapes(message, 0.7)

        const geometry = new THREE.ShapeGeometry(shapes)

        geometry.computeBoundingBox()

        const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)

        geometry.translate(xMid, 0, 0)

        const text = new THREE.Mesh(geometry, matLite)
        text.rotation.set(0, 90, 0)
        text.position.set(0, 2.3, 2.5)
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

        shapes.push.apply(shapes, holeShapes)

        const lineText = new THREE.Object3D()

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i]

          const points = shape.getPoints()
          const geometry = new THREE.BufferGeometry().setFromPoints(points)

          geometry.translate(xMid, 0, 0)

          const lineMesh = new THREE.Line(geometry, matDark)
          lineText.add(lineMesh)
        }
        lineText.rotation.set(0, 90, 0)
        lineText.position.set(1, 2.3, 2)
        this.scene.add(lineText)
      })
    },
    init: function () {
      this.container = document.getElementById('container')
      this.initScene()
      this.initGird()
      this.intiHemiLight()
      this.initCamera()
      this.initRenderer()
      this.initOrbitController()
      this.importCloud()
      this.importPegasasu()
      this.importStart()
      this.importFrot()
      this.container.appendChild(this.renderer.domElement)
    },
    calPositionAndLookAt: function () {
      if (!this.$store.state.inPositionFlag) {
        // 获取当前页面最终相机位置
        if (this.camera.position.x < this.$store.state.pageInfo.position[0]) {
          this.camera.position.x += 0.5
        }
        if (this.camera.position.y < this.$store.state.pageInfo.position[1]) {
          this.camera.position.y += 0.5
        }
        // 从左往右移动时
        if (this.$store.state.pageInfo.direction == 'right') {
          if (Math.abs(this.camera.position.z) < this.$store.state.pageInfo.position[2]) {
            this.camera.position.z -= 0.5
            console.log('this.camera.position.z : ' + this.camera.position.z)
          }
          // 从右往左移动时
        } else if (this.$store.state.pageInfo.direction == 'left') {
          if (this.camera.position.z < Math.abs(this.$store.state.pageInfo.position[2])) {
            this.camera.position.z += 0.5
            console.log('this.camera.position.z : ' + this.camera.position.z)
          }
        }
      }

      this.camera.lookAt(0, 1, -this.$store.state.pageInfo.position[2])
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      this.calPositionAndLookAt()
      if (this.scene.getObjectByName('cloud0') !== undefined) {
        for (var i = 0; i < this.cloudNum; i++) {
          this.scene.getObjectByName('cloud' + i).translateOnAxis(new THREE.Vector3(1, 0, 0), Math.floor(Math.random() * 0.001) + 0.005)
        }
      }
      // 把相机的位置实时提交到store
      this.$store.commit('setCamera', {
        camera: this.camera,
      })
      // 查看是否移动到了目标位置，如果已经移动到了目标位置，鼠标操作视角后，也不在移动
      if (
        parseInt(this.camera.position.x) === this.$store.state.pageInfo.position[0] &&
        parseInt(this.camera.position.y) === this.$store.state.pageInfo.position[1] &&
        parseInt(this.camera.position.z) === this.$store.state.pageInfo.position[2]
      ) {
        // 如果已经就位则提交为真
        this.$store.commit('changeInPositionFlag', true)
      } else {
        this.$store.commit('changeInPositionFlag', false)
      }
      this.renderer.render(this.scene, this.camera)
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
