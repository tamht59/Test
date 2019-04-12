<template>
  <v-layout
    column
    align-center
  >
    <div class="common-container">
      <div class="setting__ttl">
        <h1 class="header-1">アカウント情報の確認・変更</h1>
        <p class="text-standard">変更したい項目の「編集する」ボタンを押してください。</p>
      </div>
      <ul class="setting-list">
        <li class="setting-list__item">
          <div class="setting-list__item-inner">
            <div class="setting-list__ttl-box">
              <p class="setting-list__ttl"><span class="header-3">氏名</span></p>
              <span class="text-large">{{getUserData.name}}</span>
            </div>
            <transition name="fade">
              <button
                v-show="!edit_status.name_edit"
                @click="edit_btn('name_edit')"
                class="btn-white"
              ><span class="icon-edit"></span>編集する</button>
            </transition>
          </div>

          <transition name="fade">
            <div
              v-show="edit_status.name_edit"
              class="setting-list__item-inner-bg"
            >
              <form @submit.prevent="name_change()">
                <div class="setting-list__item-inner">
                  <div class="setting-list__ttl-box">
                    <p class="setting-list__ttl"><span class="header-3">変更後の氏名</span></p>
                    <input
                      type="text"
                      v-model.trim="edit_param.name"
                      class="setting-list__input"
                    >
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn-white"
                >変更を確定</button>
              </form>
            </div>
          </transition>
        </li>

        <li class="setting-list__item">
          <div class="setting-list__item-inner">
            <div class="setting-list__ttl-box">
              <p class="setting-list__ttl"><span class="header-3">ログインID/メールアドレス</span></p>
              <span class="text-large">{{getUserData.mail}}</span>
            </div>
            <transition name="fade">
              <button
                v-show="!edit_status.login_id_edit"
                @click="edit_btn('login_id_edit')"
                class="btn-white"
              ><span class="icon-edit"></span>編集する</button>
            </transition>
          </div>

          <transition name="fade">
            <div
              v-show="edit_status.login_id_edit"
              class="setting-list__item-inner-bg"
            >
              <form @submit.prevent="login_id_change()">
                <div class="setting-list__item-inner">
                  <div class="setting-list__ttl-box">
                    <p class="setting-list__ttl"><span class="header-3">ログインID/メールアドレス<br>（変更後）</span></p>
                    <input
                      type="mailaddress"
                      v-model.trim="edit_param.login_id"
                      class="setting-list__input"
                    >
                  </div>
                </div>
                <div class="setting-list__item-inner">
                  <div class="setting-list__ttl-box">
                    <p class="setting-list__ttl"><span class="header-3">ログインID/メールアドレス<br>（確認用）</span></p>
                    <input
                      type="text"
                      v-model.trim="edit_param.confirm_login_id"
                      class="setting-list__input"
                    >
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn-white"
                >変更を確定</button>
              </form>
            </div>
          </transition>
        </li>

        <li class="setting-list__item">
          <div class="setting-list__item-inner">
            <div class="setting-list__ttl-box">
              <p class="setting-list__ttl"><span class="header-3">パスワード</span></p>
              <p class="setting-list__text"><span class="text-large">●●●●●●●●</span></p>
            </div>
            <transition name="fade">
              <button
                v-show="!edit_status.password_edit"
                @click="edit_btn('password_edit')"
                class="btn-white"
              ><span class="icon-edit"></span>編集する</button>
            </transition>
          </div>

          <transition name="fade">
            <div
              v-show="edit_status.password_edit"
              class="setting-list__item-inner-bg"
            >
              <form @submit.prevent="password_change()">
                <div class="setting-list__item-inner">
                  <div class="setting-list__ttl-box">
                    <p class="setting-list__ttl"><span class="header-3">変更後のパスワード</span></p>
                    <input
                      type="password"
                      v-model.trim="edit_param.password"
                      class="setting-list__input"
                    >
                  </div>
                </div>
                <div class="setting-list__item-inner">
                  <div class="setting-list__ttl-box">
                    <p class="setting-list__ttl"><span class="header-3">変更後のパスワード(確認)</span></p>
                    <input
                      type="password"
                      v-model.trim="edit_param.confirm_password"
                      class="setting-list__input"
                    >
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn-white"
                >変更を確定</button>
              </form>
            </div>
          </transition>
        </li>

        <li class="setting-list__item">
          <div class="setting-list__item-inner">
            <button
              class="btn-white"
              @click.prevent="logout"
            >
              <span class="icon-logout"></span>
              ログアウト
            </button>
          </div>
        </li>
      </ul>
    </div>

  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.room_id);
  },
  data: function() {
    return {
      room_id: this.$route.params.room_id,
      login_user_id: "",
      edit_param: {
        name: "",
        login_id: "",
        confirm_login_id: "",
        password: "",
        confirm_password: ""
      },
      edit_status: {
        name_edit: false,
        login_id_edit: false,
        password_edit: false
      },
      processing: false
    };
  },
  computed: {
    //ルームのデータを算出
    ...mapGetters("user", ["getUserData", "putUserData", "loginData"]),
    ...mapGetters("room", ["roomData"])
  },
  methods: {
    edit_btn(value) {
      if (value == "name_edit") {
        this.edit_status.name_edit = true;
        this.edit_status.login_id_edit = false;
        this.edit_status.password_edit = false;
      } else if (value == "login_id_edit") {
        this.edit_status.name_edit = false;
        this.edit_status.login_id_edit = true;
        this.edit_status.password_edit = false;
      } else {
        this.edit_status.name_edit = false;
        this.edit_status.login_id_edit = false;
        this.edit_status.password_edit = true;
      }
    },
    name_change() {
      const name_data = {
        name: this.edit_param.name
      };
      this.putUserDataMethods(name_data, "name");
    },
    login_id_change() {
      const login_id_data = {
        login_id: this.edit_param.login_id,
        confirm_login_id: this.edit_param.confirm_login_id
      };
      this.putUserDataMethods(login_id_data, "login_id");
    },
    password_change() {
      const password_data = {
        password: this.edit_param.password,
        confirm_password: this.edit_param.confirm_password
      };
      this.putUserDataMethods(password_data, "password");
    },
    async putUserDataMethods(put_data, category) {
      if (this.processing) {
        //多重押下防止
        return false;
      }
      this.processing = true;
      await this.$store.dispatch("user/putUserData", put_data);

      if (category === "name") {
        this.edit_status.name_edit = false;
        this.edit_param.name = "";
      } else if (category === "login_id") {
        this.edit_status.login_id_edit = false;
        this.edit_param.login_id = this.edit_param.confirm_login_id = "";
      } else {
        this.edit_status.password_edit = false;
        this.edit_param.password = this.edit_param.confirm_password = "";
      }

      if (category !== "password") {
        await this.$store.dispatch("user/getUserData", {
          user_id: this.login_user_id
        });
      }
      this.processing = false;
    },
    logout() {
      this.userLogout();
      this.$router.push(`/main/${this.roomData.id}`);
    },
    ...mapActions("user", {
      userLogout: "logout"
    })
  },
  beforeMount() {
    //ルームデータ取得APIを叩く
    this.$store.dispatch("room/getRoomData", {
      room_id: this.room_id
    });
  },
  mounted() {
    if (this.loginData.result) {
      this.login_user_id = this.loginData.result.userId;
    }

    //ユーザデータ取得APIを叩く
    this.$store.dispatch("user/getUserData", {
      user_id: this.login_user_id
    });

    const unwatch = this.$watch("getUserData", function(val) {
      // getUserDataが変更されたことを記録する
      this.edit_param.name = val.name;
      // 監視を解除
      unwatch();
    });
  }
};
</script>

<style lang="scss" scoped>
.common-container {
  @include breakpoint-max(1025px) {
    padding: 2.4vw 0 0;
  }
}

.setting {
  &__ttl {
    @include breakpoint-max(1025px) {
      padding: 0 2.13vw;
    }
  }
}

.setting-list {
  width: 830px;
  margin: 0 auto 20px;
  list-style: none;
  &__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border-top: 1px solid $color-gray;
    &:last-of-type {
      border-bottom: none;
    }
  }
  &__item-inner-bg {
    position: relative;
    background: $color-light-gray;
    .btn-white {
      position: absolute;
      top: 20px;
      right: 32px;
      @include breakpoint-max(1025px) {
        top: auto;
        bottom: 2.66vw;
        right: 2.4vw;
      }
    }
    @include breakpoint-max(1025px) {
      padding-bottom: 14vw;
    }
  }

  &__item-inner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    align-items: center;
    height: 80px;
    padding: 20px 24px;
    .btn-white {
      margin-left: auto;
      @include breakpoint-max(1025px) {
      }
    }
    @include breakpoint-max(1025px) {
      height: auto;
      min-height: 16.53vw;
      padding: 1.86vw 2.66vw;
    }
  }

  &__ttl-box {
    display: flex;
    @include breakpoint-max(1025px) {
      flex-direction: column;
    }
  }

  &__ttl {
    width: 300px;
    margin-bottom: 0;
    .header-3 {
      font-weight: bold;
    }
    @include breakpoint-max(1025px) {
      width: auto;
      margin-bottom: 2vw;
    }
  }

  &__text {
    @include breakpoint-max(1025px) {
    }
  }

  &__input {
    width: 290px;
    height: 40px;
    padding: 0 20px;
    border: 1px solid $color-gray;
    font-size: 1.6rem;
    line-height: 40px;
    background: $color-white;
    @include breakpoint-max(1025px) {
      width: 95.4vw;
      height: 10vw;
      line-height: 10vw;
      padding: 0 3vw;
    }
  }

  @include breakpoint-max(1025px) {
    width: 100vw;
    padding: 2.4vw 0;
    border: none;
  }
}

.right-justify {
  display: flex;
  justify-content: flex-end;
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
