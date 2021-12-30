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
      this.renderer.render(this.scene, this.camera)
    },
    init: function () {
      this.container = document.getElementById('container')
      this.initScene()
      this.initGird()
      this.intiHemiLight()
      this.initCamera()
      this.initRenderer()
      this.importBankModel()
      this.importBankFont()
      this.initOrbitController()
      this.animate()
      this.container.appendChild(this.renderer.domElement)
    },
    importBankModel: function () {
      var model = new FBXLoader()
      model.load(
        '/static/bank.fbx',
        (seBasic) => {
          seBasic.position.set(-1, 0, -4)
          seBasic.rotation.set(0, (Math.PI * 2) / 2.5, 0)
          seBasic.scale.set(0.0045, 0.0045, 0.0045)
          seBasic.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material.color.setRGB(0.18431, 0.3098, 0.3098)
            }
          })
          this.scene.add(seBasic)
        },
        undefined,
        function (error) {
          console.log(error)
        }
      )
    },
    importBankFont: function () {
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
        text.position.set(-1, 1.5, -4)
        text.scale.set(0.35, 0.35, 0.35)
        text.name = 'fontFront2'
        this.scene.add(text)
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
