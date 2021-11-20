<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import { createTopPage } from '../pageinfo/toppage.js'
import { createScene } from '../pageinfo/scene.js'
import { createGird } from '../pageinfo/grid.js'
import { createLight } from '../pageinfo/light.js'
import { createOrbitControls } from '../pageinfo/cameraController.js'
import { createCamera } from '../pageinfo/camera.js'
import { createRender } from '../pageinfo/render.js'
import * as THREE from 'three'
export default {
  data() {
    return {
      time: 0,
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init: function () {
      createScene()
      createGird()
      createLight()
      createCamera()
      createRender()
      createOrbitControls()
      createTopPage()
      this.container = document.getElementById('container')
      this.container.appendChild(this.$store.state.render.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      if (this.$store.state.scene.getObjectByName('star1') !== undefined) {
        this.$store.state.scene.getObjectByName('star1').translateOnAxis(new THREE.Vector3(1, 0, 0), Math.floor(Math.random() * 0.001) + 0.005)
      }
      this.$store.commit('countAnimation')
      this.$store.commit('render')
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
