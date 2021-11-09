<template>
  <v-app-bar color="purple" absolute dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Sample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="moveToTopPage"> <v-icon>mdi-shield-home</v-icon>ホームページ </v-btn>
    <v-btn text @click="moveToServiceList"> <v-icon>mdi-store-check</v-icon>サービス一覧 </v-btn>
    <v-btn text> <v-icon>mdi-magnify-expand</v-icon>研究方向 </v-btn>
    <v-btn text> <v-icon>mdi-arrow-collapse-all</v-icon>会社情報 </v-btn>
    <v-btn text> <v-icon>mdi-account-search</v-icon>求人情報 </v-btn>
    <v-btn text> <v-icon>mdi-map-marker-outline</v-icon>アクセス </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    moveToServiceList() {
      this.$store.commit('moveToServiceList')
    },
    moveToTopPage() {
      this.$store.commit('moveToTopPage')
    },
  },
}
</script>

<style></style>
