<template>
  <v-app>
    <v-app-bar color="purple" absolute dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main style="padding: 48px 0px 0px;">
      <!-- 给应用提供合适的间距 -->
      <common-body></common-body>
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-3 purple white--text text-center"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import CommonBody from '@/components/CommonBody'

export default {
  components: {
    CommonBody,
  },
}
</script>
