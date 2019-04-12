<template>
  <v-app>
    <MainHeader></MainHeader>
    <MainHeaderSp></MainHeaderSp>
    <nuxt class="main_content" />
    <MainFooter></MainFooter>
    <MainFooterSp></MainFooterSp>
  </v-app>
</template>


<script>
import MainHeader from "~/components/MainHeader";
import MainHeaderSp from "~/components/MainHeaderSp";
import MainFooter from "~/components/MainFooter";
import MainFooterSp from "~/components/MainFooterSp";

export default {
  components: {
    MainHeader,
    MainHeaderSp,
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
