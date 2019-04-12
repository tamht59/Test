<template>
  <header class="main-header-sp">
    <div class="main-header-sp__inner">

      <div class="main-header-sp-deceased">
        <p class="main-header-sp-deceased__text">{{roomData.displayName}}</p>
        <nuxt-link
          v-if="roomUsers.length == 1"
          :to="'/selector/' + now_room_id"
          class="btn-white"
          tag="button"
          exact
        >参拝先選択</nuxt-link>
      </div>

      <button
        v-if="login_status === 0"
        type="button"
        class="btn-white"
        @click.prevent="openLoginModal"
      >
        <span class="icon-login"></span>ログイン</button>

      <button
        v-else-if="login_status === 1"
        type="button"
        class="btn-white"
      >
        招待申請</button>

      <button
        v-else-if="login_status === 2"
        type="button"
        class="btn-white"
        @click.prevent="openInvitationPeopleModal"
      >
        知人を招待</button>

      <LoginModal
        :model="loginModal"
        :onClose="onCloseLoginModal"
        :onLogin="userLogin"
        :userData="userLoginData"
      />

      <InvitationPeopleModal ref="invitationPeopleModal" />
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoginModal from "~/components/LoginModal";
import { checkLogin } from "~/utils/helper";
import InvitationPeopleModal from "~/components/InvitationPeopleModal";

export default {
  name: "MainHeaderSp",
  components: {
    LoginModal,
    InvitationPeopleModal
  },
  data() {
    return {
      loginModal: false
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
    now_room_id() {
      if (this.$route.params.room_id) {
        //roomIdをURLから取得
        return this.$route.params.room_id;
      } else {
        //URLに記載されていなければ、storeから取得
        return this.roomData.id;
      }
    },
    ...mapGetters("user", {
      userLoginData: "loginData"
    }),
    ...mapGetters("room", {
      invitationStatus: "getInvitationStatus",
      roomData: "roomData",
      roomUsers: "roomUsers"
    })
  },
  methods: {
    openLoginModal() {
      this.loginModal = true;
    },
    onCloseLoginModal() {
      this.loginModal = false;
    },
    openInvitationPeopleModal() {
      this.$refs.invitationPeopleModal.openCloseInvitationPeopleModal();
    },

    ...mapActions("user", {
      userLogin: "login"
    })
  }
};
</script>

<style lang="scss" scoped>
.main-header-sp {
  position: relative;
  z-index: 1000;
  height: (50 / 375) * 100vw;
  padding: 0 (12 / 375) * 100vw 0 (9 / 375) * 100vw;
  font-weight: bold;
  background: $color-navy-blue;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .btn-white {
    height: (30 / 375) * 100vw;
    padding: 0 (10 / 375) * 100vw;
    font-size: 1.4rem;
    line-height: calc(((30 / 375) * 100vw) - 4px);
  }
  @media (min-width: 1025px) {
    display: none;
  }
}

.main-header-sp-deceased {
  display: flex;
  justify-content: center;
  align-items: center;
  &__text {
    margin: 0 (9 / 375) * 100vw 0 0;
    color: $color-white;
  }
}
</style>
