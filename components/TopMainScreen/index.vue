<template>
  <div class="main_screen">
    <!-- toggle btn home -->
    <div class="main-img">
      <transition name="fade">
        <div
          v-show="main_img_status === 'primary'"
          class="main-img__bg"
          :style="primaryBackgroundStyle"
        >
          <p class="deceased_message">{{roomData.message}}</p>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-show="main_img_status === 'secondary'"
          class="main-img__bg"
          :style="secondaryBackgroundStyle"
        >
          <div 
            class="main-img__portrait"
            :style="deceasedBackgroundStyle"
          >
          </div>
        </div>
      </transition>

      <ul class="main-img__toggle-btns">
        <li class="main-img__toggle-btns-item">
          <button
            type="button"
            @click="main_img_change"
            class="main-img__toggle-btn"
            :class="{ 'main-img__toggle-btn--disable': main_img_status === 'primary' }"
          >
            <span class="icon-home"></span>
          </button>

        </li>
        <li class="main-img__toggle-btns-item">
          <button
            type="button"
            @click="main_img_change"
            class="main-img__toggle-btn"
            :class="{ 'main-img__toggle-btn--disable': main_img_status === 'secondary' }"
          >
            <span class="icon-mypage"></span>
          </button>
        </li>
      </ul>

      <div class="deceased_info">
        <p class="deceased_info__name">{{roomData.displayName}}</p>
      </div>

      <div class="message_notice">
        <p
          v-if="messageUnread > 0"
          class="message_notice__balloon"
        >
          故人が生前遺されたメッセージが届いています
        </p>
        <button
          class="message_notice__btn"
          @click="onClickMessageBtn"
        >
          <span class="icon-message"></span>
          <span
            v-if="messageUnread > 0"
            class="message_notice__badge"
          >{{messageUnread}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { checkLogin } from "~/utils/helper";
import { onloadToPromise } from "~/utils/helper";

export default {
  name: "topMainScreen",
  props: {
    main_img_status: String,
    openLoginModal: Function,
    onOpenRequestInvitePopup: Function,
    showWaitForApprovePopup: Function,
  },
  data: function() {
    return {
      updateMessageTimer: null,
      bgImage: null
    };
  },
  computed: {
    primaryBackgroundStyle() {
      if (this.roomData.mainImage && this.roomData.mainImage !== "") {
        return {
          "background-image": `url(${this.roomData.mainImage})`
        }
      }
      return null;
    },

    secondaryBackgroundStyle() {
      if (this.bgImage && this.bgImage !== "") {
        return {
          "background-image": `url(${this.bgImage})`
        }
      }
      return null;
    },

    deceasedBackgroundStyle() {
      if (this.roomData.deceasedImage && this.roomData.deceasedImage !== "") {
        return {
          "background-image": `url(${this.roomData.deceasedImage})`
        }
      }
      return null;
    },

    now_room_id() {
      if (this.$route.params) {
        return this.$route.params.room_id;
      } else {
        return this.roomData.id;
      }
    },

      //ルームのデータを算出
    ...mapGetters("room", {
      roomData: "roomData",
      roles: "getRolesResult",
      invitationStatus: "getInvitationStatus",
      roomBgImage: "roomBgImage",
    }),

    //未読メッセージ件数を算出
    ...mapGetters("message", ["messageUnread"]),

    ...mapGetters("user", {
      userLoginData: "loginData"
    }),
  },
  methods: {
    //メインの画像を切替え
    main_img_change: function() {
      this.$emit("main_img_change");
    },
    checkPermission(type) {
      const role = this.roles && this.roles[type]
      return (role == 1)
    },
    onClickMessageBtn() {
      if (this.checkPermission("message")) {
        return $nuxt.$router.push(`/message/${this.now_room_id}`);
      } else {
        if (!this.isLogin) {
          return this.openLoginModal("message");
        } else {
          if (this.invitationStatus == 0) {
            return this.onOpenRequestInvitePopup();
          } else if (this.invitationStatus == 1) {
            return this.showWaitForApprovePopup("message");
          }
        }
      }
    },
    async loadBackgroundStyle(bgImage) {
      if (bgImage && bgImage !== "") {
        const img = await onloadToPromise(bgImage);
        if (img.width > 0) {
          return (this.bgImage = this.roomData.bgImage);
        }
      }
      return this.bgImage = null;
    },

    ...mapActions("user", {
      userLogin: "login"
    })
  },
  watch: {
    roomBgImage(data, oldData) {
      this.loadBackgroundStyle(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.main_screen {
  width: 100%;
}

.main-img {
  position: relative;
  width: 100%;
  height: 526px;
  color: #fff;

  &__portrait {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 200;
    display: block;
    width: 368px;
    height: 446px;
    border-radius: 18px;
    background: center center/100% auto no-repeat $color-transparent;
    @include box-shadow(0px, 0, 16px, rgba(0, 0, 0, 0.6));
    transform: translate(-50%, -50%);
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    &:after {
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 240px;
      background: -moz-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      content: "";
    }
  }

  &__toggle-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 28px;
    left: 50%;
    z-index: 1;
    transform: translateX(488px);
    list-style: none;
    &-item:first-of-type {
      margin-right: 12px;
    }
  }

  &__toggle-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: 2px solid $color-navy-blue;
    background: $color-white;
    outline: none;
    @include box-shadow(0, 3px, 6px, rgba(0, 0, 0, 0.4));
    &--disable {
      pointer-events: none;
    }
    &--disable,
    &:hover {
      opacity: 0.32;
    }
    [class^="icon-"] {
      color: $color-navy-blue;
      font-size: 30px;
    }
  }

  @include breakpoint-max(1025px) {
    height: (260 / 375) * 100vw;
    &__portrait {
      top: (10 / 375) * 100vw;
      width: (160 / 375) * 100vw;
      height: (194 / 375) * 100vw;
      border-radius: (5 / 375) * 100vw;
      @include box-shadow(0, 0, 0.8vw, 0.2vw, rgba(0, 0, 0, 0.6));
      transform: translate(-50%, 0);
    }

    &__bg:after {
      height: (70 / 375) * 100vw;
    }

    &__toggle-btns {
      top: (8 / 375) * 100vw;
      left: 50%;
      transform: translateX((145 / 375) * 100vw);
      &-item:first-of-type {
        margin-right: 0;
      }
    }

    &__toggle-btn {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: (34 / 375) * 100vw;
      height: (34 / 375) * 100vw;
      border-radius: 100vw;
      border: 2px solid $color-navy-blue;
      @include box-shadow(0, 0, 1vw, rgba(0, 0, 0, 0.4));
      &--disable {
        z-index: -1;
        opacity: 0;
      }
      [class^="icon-"] {
        font-size: 5.5vw;
      }
    }
  }
}

.deceased_message {
  position: absolute;
  top: 44px;
  left: 50%;
  width: 760px;
  transform: translateX(-50%);
  font-size: 4rem;
  line-height: 1.3;
  text-align: center;
  color: $color-light-text;
  @include text-shadow(0, 3px, 6px, #000);

  @include breakpoint-max(1025px) {
    top: (50 / 375) * 100vw;
    width: 90vw;
    font-size: 1.8rem;
    @include text-shadow(0, 0.26vw, 0.5vw, #000);
  }
}

.deceased_info {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-400px);
  &__name {
    color: $color-light-text;
    font-size: 2.4rem;
  }
  @include breakpoint-max(1025px) {
    bottom: (8 / 375) * 100vw;
    transform: translateX((178 / 375) * -100vw);
    &__name {
      color: $color-light-text;
      font-size: 1.6rem;
    }
  }
}

.message_notice {
  position: absolute;
  right: 50%;
  bottom: 24px;
  transform: translateX(400px);
  &__balloon {
    position: absolute;
    top: 0;
    left: 50%;
    min-width: 154px;
    min-height: 85px;
    margin-top: -19px;
    -webkit-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%);
    padding: 10px 13px;
    background: $color-white;
    border-radius: 14px;
    color: $color-black;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.1;
    &:after {
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 19px;
      height: 19px;
      background: $color-white;
      transform: translate(-50%, 50%) rotate(-45deg);
      content: "";
    }
  }
  &__btn {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 2px solid $color-white;
    background: rgb(113, 193, 248); /* Old browsers */
    background: -moz-linear-gradient(
      top,
      rgba(113, 193, 248, 1) 0%,
      rgba(17, 119, 236, 1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(113, 193, 248, 1) 0%,
      rgba(17, 119, 236, 1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(113, 193, 248, 1) 0%,
      rgba(17, 119, 236, 1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    &:hover {
      background: rgb(17, 119, 236); /* Old browsers */
      background: -moz-linear-gradient(
        top,
        rgba(17, 119, 236, 1) 0%,
        rgba(113, 193, 248, 1) 100%
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        top,
        rgba(17, 119, 236, 1) 0%,
        rgba(113, 193, 248, 1) 100%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to bottom,
        rgba(17, 119, 236, 1) 0%,
        rgba(113, 193, 248, 1) 100%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
    [class^="icon-"]:before {
      font-size: 3.8rem;
    }
  }
  &__badge {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 22px;
    height: 22px;
    padding: 0 4px;
    border-radius: 64px;
    background: $color-badge;
    color: $color-white;
    font-size: 1.4rem;
    line-height: 1;
    white-space: nowrap;
  }

  @include breakpoint-max(1025px) {
    bottom: (8 / 375) * 100vw;
    transform: translateX((178 / 375) * 100vw);
    &__balloon {
      left: auto;
      right: 0;
      min-width: (106 / 375) * 100vw;
      min-height: (60 / 375) * 100vw;
      margin-top: -19px;
      padding: (6 / 375) * 100vw;
      border-radius: (7 / 375) * 100vw;
      font-size: 1.3rem;
      font-weight: normal;
      transform: translate(0, -100%);
      &:after {
        width: (10 / 375) * 100vw;
        height: (10 / 375) * 100vw;
        left: auto;
        right: 0;
        transform: translate((10 / 375) * -100vw, 50%) rotate(-45deg);
      }
    }
    &__btn {
      position: relative;
      width: (34 / 375) * 100vw;
      height: (34 / 375) * 100vw;
      border-radius: 64px;
      [class^="icon-"]:before {
        font-size: 2rem;
      }
    }
    &__badge {
      top: -2vw;
      right: -2vw;
      min-width: (15 / 375) * 100vw;
      height: (15 / 375) * 100vw;
      padding: 0 4px;
      font-size: 1rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  -webkit-transition: opacity 0.25s;
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
