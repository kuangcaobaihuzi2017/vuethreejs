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
      timer: 0,
      camera: null,
      scene: null,
      renderer: null,
      orbcitControls: null,
      container: null,
      front: null,
      groundMirror: null,
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    initScene: function () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('rgb(245,245,245)')
    },
    // 网格辅助线
    initGird: function () {
      // 第一个参数表示网格整个大小，第二个表示网格密度
      const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
      // 表示辅助网格的透明度，最大是1表示完全不透明
      grid.material.opacity = 0.07
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
    },

    animate: function () {
      requestAnimationFrame(this.animate)

      let vect = this.camera.getWorldDirection(new THREE.Vector3())
      if (this.timer == 300) {
        this.scene.background = new THREE.Color(0, 0, 0)
      }
      if (this.timer == 600) {
        this.timer = 0
        this.scene.background = new THREE.Color('rgb(245,245,245)')
      }
      // if (this.$store.state.positionChangeFlag) {
      //   for (var i = 0; i < 20; i++) {
      //     console.log('vect : ' + vect.z)
      //     var checkVector = new THREE.Vector3(35, 10, 0)
      //     console.log('checkVector : ' + checkVector.z)
      //     this.camera.position.z += vect.dot(checkVector) * 0.01
      //     console.log('this.camera.position.z : ' + this.camera.position.z)
      //   }
      //   this.$store.commit('changePosition')
      // }
      // 把相机的位置实时提交到store
      this.timer++
      this.$store.commit('setCameraPosition', {
        cameraPositition: vect,
      })
      this.renderer.render(this.scene, this.camera)
    },

    init: function () {
      this.container = document.getElementById('container')
      this.initScene()
      this.initGird()
      this.intiHemiLight()
      this.initCamera()
      this.initRenderer()
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
