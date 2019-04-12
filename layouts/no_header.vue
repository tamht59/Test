<template>
  <v-app>
    <nuxt class="main_content" />
    <MainFooter></MainFooter>
    <MainFooterSp></MainFooterSp>
  </v-app>
</template>


<script>
import MainFooter from "~/components/MainFooter";
import MainFooterSp from "~/components/MainFooterSp";

export default {
  components: {
    MainFooter,
    MainFooterSp
  }
};
</script>

<style lang="scss" scoped>
.main_content {
  @include breakpoint-max(1025px) {
    padding-bottom: (70 / 375) * 100vw;
  }
}
</style>
