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
      this.scene.background = new THREE.Color(0x000000)
      //网格模型添加到场景中
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      let material = new THREE.MeshNormalMaterial({
        color: 'white',
      })
      this.mesh = new THREE.Mesh(geometry, material)
      this.scene.add(this.mesh)
    },
    initCamera: function () {
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
      this.camera.position.z = 1
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
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    },
    init: function () {
      this.container = document.getElementById('container')
      this.initScene()
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