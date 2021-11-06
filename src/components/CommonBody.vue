<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
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
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    initScene: function () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xffffff)
      this.scene.fog = new THREE.Fog(0xffffff, 2, 30)
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
      this.camera.position.set(1, 2, 0)
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
      for (var count = 0; count <= Math.floor(Math.random() * 4) + 6; count++) {
        var model = new FBXLoader()
        model.load(
          '/static/Poly_cloud_2_High.fbx',
          (fbx) => {
            fbx.position.set(Math.floor(Math.random() * 10) - 5, 2.8, Math.floor(Math.random() * 10) - 5)
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
          pegasasu.position.set(-0.4, 0, 0)
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
            newStar.position.set(0, 1 + 2 * Math.cos((range * i * 3.14) / 180), 2 * Math.sin((range * i * 3.14) / 180))
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
      this.container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      // 获取相机的世界坐标
      let vect = this.camera.getWorldDirection(new THREE.Vector3())
      var checkVector = new THREE.Vector3(1, 0, 0)
      if (this.timer < 210) {
        this.camera.position.x -= vect.dot(checkVector) * 0.08
      }
      this.timer++
      this.camera.lookAt(new THREE.Vector3(0, 1, 0))
      // 把相机的位置实时提交到store
      this.timer++
      this.$store.commit('setCameraPosition', {
        cameraPositition: vect,
      })
      if (this.scene.getObjectByName('cloud0') !== undefined) {
        for (var i = 0; i < this.cloudNum; i++) {
          this.scene.getObjectByName('cloud' + i).translateOnAxis(new THREE.Vector3(1, 0, 0), Math.floor(Math.random() * 0.001) + 0.005)
        }
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
