<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      orbcitControls: null,
      container: null,
      front: null,
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    initScene: function () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('rgb(255, 255, 240)')
    },
    // 网格辅助线
    initGird: function () {
      // 第一个参数表示网格整个大小，第二个表示网格密度
      const grid = new THREE.GridHelper(2000, 45, 'rgb(0, 0, 0)', 'rgb(0, 0, 0)')
      // 表示辅助网格的透明度，最大是1表示完全不透明
      grid.material.opacity = 0.17
      // 如果材质的transparent属性未设置为true，则材质将保持完全不透明，此值仅影响其颜色
      grid.material.transparent = true
      this.scene.add(grid)
    },
    intiHemiLight: function () {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
      hemiLight.position.set(0, 600, 0)
      this.scene.add(hemiLight)
    },
    initCamera: function () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set(200, 100, 200)
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
      this.animate()
      this.initOrbitController()
      this.container.appendChild(this.renderer.domElement)
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
