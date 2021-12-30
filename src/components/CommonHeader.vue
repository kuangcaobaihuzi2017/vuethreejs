<template>
  <v-app-bar color="purple" absolute dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Sample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="moveToTopPage"> <v-icon>mdi-shield-home</v-icon>ホームページ </v-btn>
    <v-menu open-on-hover>
      <template v-slot:activator="{ attrs, on }">
        <v-btn text v-bind="attrs" v-on="on"> <v-icon>mdi-store-check</v-icon>業務案内</v-btn>
      </template>

      <v-list dark dense outlined rounded color="purple">
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-title v-text="item" @click="moveToServiceList(i)"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn text @click="moveToResearch"> <v-icon>mdi-magnify-expand</v-icon>研究方向 </v-btn>
    <v-btn text> <v-icon>mdi-arrow-collapse-all</v-icon>会社概要/アクセス</v-btn>
    <v-btn text> <v-icon>mdi-account-search</v-icon>Join Us</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: ['受託開発/常駐開発', 'プログラミングコース', 'オンライン動画編集サイト'],
      path: ['/seservice', '/seservice', '/seservice'],
    }
  },
  methods: {
    moveToServiceList(index) {
      this.$router.push({ path: this.path[index] })
    },
    moveToResearch() {
      this.$router.push({ path: '/research' })
    },
    moveToTopPage() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style></style>
