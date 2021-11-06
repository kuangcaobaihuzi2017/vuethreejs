<template>
  <v-app-bar color="purple" absolute dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Sample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="moveToProducts"> ホームページ </v-btn>
    <v-btn text @click="moveToProducts"> 会社製品 </v-btn>
    <v-btn text> ソリューション </v-btn>
    <v-btn text> 資源 </v-btn>
    <v-btn text> 研究方向 </v-btn>
    <v-btn text> 会社情報 </v-btn>
    <v-btn text> 求人情報 </v-btn>
    <v-btn text> アクセス </v-btn>
    <v-btn class="mx-2" fab dark small color="pink">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    moveToProducts() {
      this.$store.commit('changePosition')
    },
  },
}
</script>

<style></style>
