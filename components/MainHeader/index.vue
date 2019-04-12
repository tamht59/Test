<template>
  <header class="main-header">
    <div class="main-header__inner">

      <div
        v-if="roomUsers.length == 1"
        class="main-header-deceased disable"
      >
        <p class="main-header-deceased__btn-text">{{roomData.displayName}}</p>
      </div>

      <nuxt-link
        v-else
        :to="'/selector/' + now_room_id"
        class="main-header-deceased"
        tag="div"
        exact
      >
        <p class="main-header-deceased__btn-text">{{roomData.displayName}}</p>
        <span class="icon-arrow-down"></span>
      </nuxt-link>

      <ul class="main-header-menu">
        <nuxt-link
          :to="'/main/' + now_room_id"
          class="main-header-menu__item"
          tag="li"
          exact
        >
          メイン
        </nuxt-link>

        <li
          class="main-header-menu__item"
          @click="onClickMenuButton('album')"
        >
          アルバム
        </li>

        <li
          class="main-header-menu__item"
          @click="onClickMenuButton('message')"
        >
          メッセージ
        </li>

        <li
          class="main-header-menu__item"
          @click="onClickMenuButton('profile')"
        >
          プロフィール
        </li>

        <nuxt-link
          v-if="login_status !== 0"
          :to="'/account/setting/' + now_room_id"
          class="main-header-menu__item"
          tag="li"
          exact
        >
          設定
        </nuxt-link>
      </ul>

      <LoginButton
        :btnType="login_status"
        :action="onClickLoginBtn"
      />

      <LoginModal
        :model="loginModal"
        :onClose="onCloseLoginModal"
        :onLogin="userLogin"
        :userData="userLoginData"
        :message="loginModalMessage"
      />

      <WaitForApproveModal
        :model="waitForApprovePopup"
        :onClose="hideWaitForApprovePopup"
      >
        <p class="header-3" slot="top">
          {{ waitForApprovePopupContent }}
        </p>
      </WaitForApproveModal>

      <RequestInviteModal
        :model="requestInvitePopup"
        :onClose="onCloseRequestInvitePopup"
      />

      <InvitationPeopleModal ref="invitationPeopleModal" />
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoginModal from "~/components/LoginModal";
import WaitForApproveModal from "~/components/GeneralModal";
import RequestInviteModal from "~/components/GeneralModal/RequestInvite";
import { checkLogin } from "~/utils/helper";
import InvitationPeopleModal from "~/components/InvitationPeopleModal";
import LoginButton from "./LoginButton";
import { ALERT_WAIT_FOR_APROVE, ALERT_REQUEST_LOGIN } from "~/utils/constants"

export default {
  name: "MainHeader",
  components: {
    LoginModal,
    WaitForApproveModal,
    InvitationPeopleModal,
    LoginButton,
    RequestInviteModal
  },
  data() {
    return {
      loginModal: false,
      loginModalMessage: "",
      waitForApprovePopup: false,
      waitForApprovePopupContent: "",
      requestInvitePopup: false,
    };
  },
  computed: {
    now_room_id() {
      if (this.$route.params.room_id) {
        //roomIdをURLから取得
        return this.$route.params.room_id;
      } else {
        //URLに記載されていなければ、storeから取得
        return this.roomData.id;
      }
    },
    login_status() {
      if (!this.isLogin) {
        // Not login
        return 0;
      }
      const isOwner = this.roomData.owner == 1;
      if (isOwner) {
        return 2;
      }
      if (this.invitationStatus == 0) {
        // Need invite
        return 1;
      }
      if (this.invitationStatus == 2) {
        // Already invite
        return 2;
      }
    },
    isLogin() {
      return checkLogin(this.$store);
    },

    ...mapGetters("user", {
      userLoginData: "loginData"
    }),
    ...mapGetters("room", {
      roomData: "roomData",
      roomUsers: "roomUsers",
      invitationStatus: "getInvitationStatus",
      roles: "getRolesResult"
    })
  },
  methods: {
    openLoginModal(type) {
      this.loginModalMessage = ""
      if (type) {
        this.loginModalMessage = ALERT_REQUEST_LOGIN[type]
      }
      this.loginModal = true;
    },
    onCloseLoginModal() {
      this.loginModal = false;
    },
    onClickMenuButton(menuType) {
      if (this.checkPermission(menuType)) {
        return $nuxt.$router.push(`/${menuType}/${this.now_room_id}`);
      } else {
        if (!this.isLogin) {
          return this.openLoginModal(menuType);
        } else {
          if (this.invitationStatus == 0) {
            return this.onOpenRequestInvitePopup();
          } else if (this.invitationStatus == 1) {
            return this.showWaitForApprovePopup(menuType);
          }
        }
      }
    },
    showWaitForApprovePopup(type) {
      this.waitForApprovePopupContent = ALERT_WAIT_FOR_APROVE[type]
      this.waitForApprovePopup = true;
    },
    hideWaitForApprovePopup() {
      this.waitForApprovePopup = false;
    },
    checkPermission(type) {
      const role = this.roles && this.roles[type]
      return (role == 1)
    },
    openInvitationPeopleModal() {
      this.$refs.invitationPeopleModal.openCloseInvitationPeopleModal();
    },
    onClickLoginBtn(type) {
      if (type == 0 ) {
        return this.openLoginModal()
      }
      if (type == 2) {
        return this.openInvitationPeopleModal()
      }
      return () => {}
    },
    onOpenRequestInvitePopup() {
      this.requestInvitePopup = true;
    },
    onCloseRequestInvitePopup() {
      this.requestInvitePopup = false;
    },

    ...mapActions("user", {
      userLogin: "login"
    })
  }
};
</script>

<style lang="scss" scoped>
.main-header {
  position: relative;
  z-index: 1000;
  height: 60px;
  background: $color-white;
  @include box-shadow(0px, 3px, 6px, rgba(0, 0, 0, 0.2));
  &__inner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
}

@include breakpoint-max(1025px) {
  .main-header {
    display: none;
  }
}

.main-header-deceased {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 96px;
  height: 40px;
  padding: 8px 8px 8px 12px;
  overflow: hidden;
  border-radius: 100px;
  border: 2px solid $color-navy-blue;
  background: $color-white;
  cursor: pointer;
  &.disable {
    cursor: auto;
  }

  &__btn-text {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
  }

  &__btn-arrow {
    display: inline-block;
  }

  [class^="icon-"]:before {
    margin-left: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
    color: $color-navy-blue;
  }
}

.main-header-menu {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 600px;
  height: 100%;
  margin: 0 40px;
  padding: 0;
  font-size: 1.8rem;

  &__item {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    padding: 0 16px;
    list-style: none;
    line-height: 1;
    cursor: pointer;

    &:before {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 0;
      height: 2em;
      border-left: 1px solid $color-light-gray;
      content: "";
    }

    &:last-of-type:after {
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 0;
      height: 2em;
      border-left: 1px solid $color-light-gray;
      content: "";
    }

    &.nuxt-link-exact-active {
      pointer-events: none;
    }

    &:hover,
    &.nuxt-link-exact-active {
      color: $color-white;
      background-color: $color-navy-blue;
      &:before,
      &:after {
        display: none;
      }
    }
  }

  &__link {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    text-decoration: none;

    &:before {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 0;
      height: 2.5em;
      border-left: 1px solid $color-light-gray;
      content: "";
    }
  }
}
</style>
