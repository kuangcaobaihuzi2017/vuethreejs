<template>
  <v-app>
    <common-header></common-header>
    <v-main style="padding: 0px; height: 700px">
      <router-view />
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-3 purple white--text text-center"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import CommonHeader from '@/components/CommonHeader'

export default {
  components: {
    CommonHeader,
  },
}
</script>
