<template>
  <v-app-bar color="purple" absolute dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Sample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="moveToTopPage"> <v-icon>mdi-shield-home</v-icon>ホームページ </v-btn>
    <v-menu open-on-hover>
      <template v-slot:activator="{ attrs, on }">
        <v-btn text v-bind="attrs" v-on="on"> <v-icon>mdi-store-check</v-icon>業務案内 </v-btn>
      </template>

      <v-list dark dense outlined rounded color="purple">
        <v-list-item v-for="item in items" :key="item" link>
          <v-list-item-title v-text="item" @click="moveToServiceList(item)"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn text> <v-icon>mdi-magnify-expand</v-icon>研究方向 </v-btn>
    <v-btn text> <v-icon>mdi-arrow-collapse-all</v-icon>会社情報 </v-btn>
    <v-btn text> <v-icon>mdi-account-search</v-icon>求人情報 </v-btn>
    <v-btn text> <v-icon>mdi-map-marker-outline</v-icon>アクセス </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: ['プログラミングコース', '受託開発/常駐開発', '次世代動画サイト：ｘｘｘｘ', '次世代ロボット：ｘｘｘｘ'],
    }
  },
  methods: {
    moveToServiceList(pageName) {
      this.$store.commit('moveToServiceList', { pageName })
    },
    moveToTopPage() {
      this.$store.commit('moveToTopPage')
    },
  },
}
</script>

<style></style>
