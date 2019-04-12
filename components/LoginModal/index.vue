<template>
  <v-dialog
    v-model="model"
    persistent
    no-click-animation
  >
    <div class="login-modal__wrap">
      <button
        class="btn-flat icon-delete close-btn"
        @click.prevent="onCloseModal"
      >
      </button>
      <div class="login-modal">
        <div v-if="message && message !== ''" class="top-message">
          <p class="text-standard warning-text">{{message}}</p>
        </div>
        <div class="form-container">
          <div class="form__title">

          </div>
          <div class="field-container">
            <p class="header-3">ログインID/メールアドレス</p>
            <input type="text" class="gn-modal-input-field input-field text-standard" v-model="usernameModel">
            <p class="header-3">パスワード</p>
            <input
              type="password"
              class="gn-modal-input-field input-field text-standard"
              v-model="passwordModel"
              @keyup.enter="login"
            >
          </div>
          <div class="login-btn__container">
            <button class="btn-blue login-btn" @click.prevent="login">
              <span v-if="!isRequesting">ログイン</span>
              <v-progress-circular
                v-else
                indeterminate
                width="3"
                color="#ffffff"
                class="loading-icon"
                size="20"
              />
            </button>
          </div>
          <p class="text-standard warning-text">
            {{loginError}}
          </p>
        </div>
        <div class="bottom-links">
          <p class="linker-helper">
            <nuxt-link to="/account/create">アカウントをお持ちでない方はこちら</nuxt-link>
          </p>
          <p class="linker-helper">
            <nuxt-link to="/support/faq">ログインでお困りの場合はこちら</nuxt-link>
          </p>
          <p class="linker-helper">
            <nuxt-link to="/guide">このサービスについて</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    model: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    },
    onLogin: {
      type: Function,
      require: true
    },
    userData: {
      type: Object
    },
    message: {
      type: String
    }
  },
  data() {
    return {
      usernameModel: '',
      passwordModel: '',
      loginError: ''
    }
  },
  computed: {
    isRequesting() {
      return this.userData.requesting
    }
  },
  methods: {
    login() {
      this.loginError = ''
      if (this.usernameModel !== '' && this.passwordModel !== '') {
        this.onLogin({
          loginId: this.usernameModel.trim(),
          password: this.passwordModel 
        })
      } else {
        this.loginError = 'Please enter username and password.'
      }
    },
    onCloseModal() {
      this.usernameModel = ''
      this.passwordModel = ''
      this.loginError = ''
      this.onClose()
    },
  },
  watch: {
    userData(data, oldData) {
      if (data.status !== oldData.status) {
        if (data.status === "success") {
          this.onCloseModal()
        }
        if (data.status === "fail") {
          this.loginError = data.error && data.error.message
        }
      }
    },
    $route: function(to, from) {//遷移したら閉じる
      if (to.path !== from.path) {
        this.onCloseModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-modal__wrap {
  .close-btn {
    margin-bottom: 20px;
    float: right;
  }
  .login-modal {
    width: 400px;
    padding: 20px;
    background-color: $color-white;
    clear: both;
    .form__title {
      min-height: 30px;
    }
    .header-3 {
      margin-bottom: 2px;
      text-align: center;
    }
    .input-field {
      width: 100%;
      margin-bottom: 10px;
    }
    .login-btn__container {
      align-self: center;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .login-btn {
      width: 50%;
      line-height: 0;
    }
    .warning-text {
      margin-top: 10px;
      text-align: center;
    }
    .loading-icon {
      width: 20px !important;
      height: 20px !important;
    }
    .bottom-links {
      margin-top: 25px;
    }
    .linker-helper {
      margin-bottom: 0;
      margin-top: 5px;
      a {
        color: $color-text-blue;
        &:hover {
          font-weight: 900;
        }
      }
    }
  }

  @include breakpoint-max($break-sp) {
    .close-btn {
      margin-bottom: 3vw;
    }
    .login-modal {
      width: 85vw;
      padding: 10vw;
      .form-container {

      }
      .input-field {
        width: 100%;
        margin-bottom: 3vw;
      }
      .login-btn__container {
        margin-top: 5vw;
      }
      .login-btn {
        width: 50%;
      }
      .warning-text {
        margin-top: 3vw;
      }
      .loading-icon {
        width: 5vw !important;
        height: 5vw !important;
      }
      .bottom-links {
        margin-top: 5vw;
      }
      .linker-helper {
        margin-top: 2vw;
      }
    }
  }
}
</style>
