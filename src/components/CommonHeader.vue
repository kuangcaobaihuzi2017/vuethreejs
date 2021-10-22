<template>
  <v-app-bar color="purple" absolute dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Sample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="moveToProducts"> 产品 </v-btn>
    <v-btn text> 解决方案 </v-btn>
    <v-btn text> 资源 </v-btn>
    <v-btn text> 研究 </v-btn>
    <v-btn text> 公司 </v-btn>
    <v-btn text> 人才采用 </v-btn>
    <v-btn text> 关于我们 </v-btn>
    <v-btn class="mx-2" fab dark small color="pink">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    moveToProducts() {
      console.log('has been clicked')
      this.$store.commit('changeStatus')
    },
  },
}
</script>

<style></style>
