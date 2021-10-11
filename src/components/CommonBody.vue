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
      this.scene.background = new THREE.Color(0xa0a0a0)
      const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				this.scene.add( grid );
        this.scene.background = new THREE.Color( 0xa0a0a0 );
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 200, 0 );
				this.scene.add( hemiLight );

        const directionalLight = new THREE.DirectionalLight( 0xffffff );
				directionalLight.position.set( 0, 200, 100 );
				directionalLight.castShadow = true;
				directionalLight.shadow.camera.top = 180;
				directionalLight.shadow.camera.bottom = - 100;
				directionalLight.shadow.camera.left = - 120;
				directionalLight.shadow.camera.right = 120;
				this.scene.add( directionalLight );
    },
    initCamera: function () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set( 200, 100, 200 );
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
