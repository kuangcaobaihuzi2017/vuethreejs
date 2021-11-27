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
import { changeStarPosition } from '../animation/starsAnimation.js'
import { changeFontPosition } from '../animation/topPageAnimation.js'
import { createServiceListF } from '../pageinfo/seService.js'
import { createServiceListPg } from '../pageinfo/pgcourse.js'
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
      createServiceListF()
      createServiceListPg()
      this.container = document.getElementById('container')
      this.container.appendChild(this.$store.state.render.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      changeStarPosition()
      changeFontPosition()
      this.$store.state.camera.lookAt(this.$store.state.lookAtPosition[0], this.$store.state.lookAtPosition[1], this.$store.state.lookAtPosition[2])
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
