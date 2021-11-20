<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import { pegasasu } from '../pageinfo/toppage.js'
import { createScene } from '../pageinfo/scene.js'
import { createGird } from '../pageinfo/grid.js'
import { createLight } from '../pageinfo/light.js'
import { createOrbitControls } from '../pageinfo/cameraController.js'
import { createCamera } from '../pageinfo/camera.js'
import { createRender } from '../pageinfo/render.js'
export default {
  data() {
    return {}
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
      pegasasu()
      this.container = document.getElementById('container')
      this.container.appendChild(this.$store.state.render.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
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
