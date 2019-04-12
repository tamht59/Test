<template>
  <footer class="main-footer-sp">
    <nuxt-link
      :to="'/main/' + now_room_id"
      tag="div"
      exact
      class="main-footer-sp__item"
    >
      <span class="icon-home"></span>
      <span class="main-footer-sp__item-ttl">メイン</span>
    </nuxt-link>

    <nuxt-link
      :to="'/album/' + now_room_id"
      tag="div"
      exact
      class="main-footer-sp__item"
    >
      <span class="icon-album"></span>
      <span class="main-footer-sp__item-ttl">アルバム</span>
    </nuxt-link>

    <nuxt-link
      :to="'/message/' + now_room_id"
      tag="div"
      exact
      class="main-footer-sp__item"
    >
      <span class="icon-message"></span>
      <span class="main-footer-sp__item-ttl">メッセージ</span>
    </nuxt-link>

    <nuxt-link
      :to="'/profile/' + now_room_id"
      tag="div"
      exact
      class="main-footer-sp__item"
    >
      <span class="icon-profile"></span>
      <span class="main-footer-sp__item-ttl">プロフィール</span>
    </nuxt-link>

    <div
      @click="menu_open=!menu_open"
      class="main-footer-sp__item-menu-btn"
      :class="{'main-footer-sp__item-menu-btn--active' : menu_open}"
    >
      <span class="icon-menu"></span>
      <span class="main-footer-sp__item-ttl">メニュー</span>
    </div>

    <ul
      v-show="menu_open"
      transition="slide-y-transition"
      class="main-footer-sp-menu"
    >
      <nuxt-link
        v-if="login_status !== 0"
        :to="'/account/setting/' + now_room_id"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        設定
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/terms"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        利用規約
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/privacy_policy"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        プライバシーポリシー
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/trading"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        特定商取引法に関する表示
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/faq"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        よくあるご質問
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/contact"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        お問い合わせ
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        to="/support/company"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        運営会社
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>

      <nuxt-link
        :to="'/entry/' + now_account_id"
        tag="li"
        exact
        class="main-footer-sp-menu__item"
      >
        新規お申込み
        <v-spacer></v-spacer>
        <span class="icon-arrow-right"></span>
      </nuxt-link>
    </ul>

  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { checkLogin } from "~/utils/helper";

export default {
  name: "MainFooterSp",
  data() {
    return {
      now_room_id: "",
      now_account_id: "",
      menu_open: false
    };
  },
  computed: {
    login_status() {
      const isLogin = checkLogin(this.$store);
      const isOwner = this.roomData.owner == 1;
      if (!isLogin) {
        // Not login
        return 0;
      }
      if (this.invitationStatus == 0) {
        // Need invite
        return isOwner ? 2 : 1;
      }
      if (this.invitationStatus == 2) {
        // Already invite
        return 2;
      }
    },
    ...mapGetters("room", {
      roomData: "roomData"
    })
  },
  watch: {
    $route: function(to, from) {
      //遷移したら閉じる
      if (to.path !== from.path) {
        this.menu_open = false;
      }
    }
  },
  mounted() {
    //roomIdをURLから取得
    if (this.$route.params.room_id) {
      this.now_room_id = this.$route.params.room_id;
    }
  }
};
</script>

<style lang="scss" scoped>
%footer-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20vw;
  [class^="icon-"] {
    display: block;
    font-size: 6vw;
  }
}

.main-footer-sp {
  display: flex;
  align-items: stretch;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  border: 1px solid $color-gray;
  background-color: $color-white;
  color: $color-dark-gray;
  line-height: 1;
  height: (70 / 375) * 100vw;
  &__item {
    @extend %footer-item;
    &.nuxt-link-exact-active {
      pointer-events: none;
    }

    &:hover,
    &.nuxt-link-exact-active {
      color: $color-navy-blue;
    }
  }
  &__item-menu-btn {
    @extend %footer-item;
    &--active {
      color: $color-navy-blue;
    }
  }

  &__item-ttl {
    display: block;
    margin-top: 1.5vw;
  }

  @media (min-width: 1025px) {
    display: none;
  }
}

.main-footer-sp-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - ((70 / 375) * 100vw));
  background: $color-white;
  &__item {
    display: flex;
    align-items: center;
    height: (50 / 375) * 100vw;
    padding: 0 (10 / 375) * 100vw 0;
    border-bottom: 1px solid $color-gray;
    font-size: 1.6rem;
    line-height: 1;
    [class^="icon-"] {
      color: $color-navy-blue;
    }
  }
}
</style>
