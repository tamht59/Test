<template>
  <v-layout>
    <nuxt-link :to="homePageLink">
      HOME PAGE
    </nuxt-link>

    <nuxt-link :to="flowerDedicationLink">
      FLOWER DEDICATION
    </nuxt-link>

    <nuxt-link :to="loginPageLink">
      LOGIN PAGE (TEST API)
    </nuxt-link>
  </v-layout>
</template>

<script>
import { routes } from '~/utils/constants'
export default {
  computed: {
    homePageLink() {
      return routes.HOME
    },
    loginPageLink() {
      return routes.LOGIN
    },
    flowerDedicationLink() {
      return routes.FLOWER_DEDICATION
    }
  }
}
</script> 
