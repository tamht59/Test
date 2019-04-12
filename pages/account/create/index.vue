<template>
  <v-layout
    column
    align-center
    v-bind="layout_mode"
    :class="{ 'bg-light-gray': pc_mode , 'padding_set': pc_mode}"
  >
    <div class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">アカウント作成</h1>
        <p class="text-standard">「サービス名」ご利用のため、アカウントを新規作成します。<br>以下の項目をご記入のうえ「送信」ボタンを押してください<br>
          <span class="date-text">※入力いただいたメールアドレス宛てに、ご登録のご案内メールをお送りします。</span></p>
      </div>

      <form @submit.prevent="post_tokens()">
        <ul class="register-list">
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="text-standard">氏名</span><span class="warning-text">【必須】</span></p>
            <input
              type="text"
              v-model.trim="user_input.name"
              class="register-list__input"
            >
            <!-- <div
              v-show="postNewAccountTokensData.errors.name"
              class="warning-text"
            >
              {{error_text('name')}}
            </div> -->
          </li>

          <li class="register-list__item">
            <p class="register-list__ttl"><span class="text-standard">メールアドレス</span><span class="warning-text">【必須】</span></p>
            <input
              type="mailaddress"
              v-model.trim="user_input.mail"
              class="register-list__input"
            >
            <!-- <div
              v-show="postNewAccountTokensData.errors.login_id"
              class="warning-text"
            >
              {{error_text('login_id')}}
            </div> -->
            <div
              v-show="postNewAccountTokensData.code == '409'"
              class="warning-text"
            >
              {{postNewAccountTokensData.message}}
            </div>
          </li>

          <li class="register-list__item">
            <p class="register-list__ttl"><span class="text-standard">メールアドレス(確認)</span><span class="warning-text">【必須】</span></p>
            <input
              type="text"
              v-model.trim="user_input.confirm_mail"
              class="register-list__input"
            >
            <!-- <div
              v-show="postNewAccountTokensData.errors.confirm_mail"
              class="warning-text"
            >
              {{error_text('confirm_mail')}}
            </div> -->
          </li>

          <li class="register-list__item">
            <p class="register-list__ttl"><span class="text-standard">パスワード</span><span class="warning-text">【必須】</span></p>
            <input
              type="password"
              v-model.trim="user_input.password"
              class="register-list__input"
            >
            <!-- <div
              v-show="postNewAccountTokensData.errors.password"
              class="warning-text"
            >
              {{error_text('password')}}
            </div> -->
          </li>
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="text-standard">パスワード(確認)</span><span class="warning-text">【必須】</span></p>
            <input
              type="password"
              v-model.trim="user_input.confirm_password"
              class="register-list__input"
            >
            <!-- <div
              v-show="postNewAccountTokensData.errors.confirm_password"
              class="warning-text"
            >
              {{error_text('confirm_password')}}
            </div> -->
          </li>

        </ul>

        <div class="register-btn-box">

          <div class="general-checkbox">
            <input
              id="agree_terms"
              type="checkbox"
              v-model="agree_terms"
              class="general-checkbox__input"
            ><label
              for="agree_terms"
              class="general-checkbox__checkbox"
            ></label>
            利用規約に同意して申し込む
            <nuxt-link
              to="/support/terms"
              class="general-checkbox__link"
            >利用規約を読む</nuxt-link>

          </div>

          <div class="btn-line">
            <button
              :class="{'btn-blue':agree_terms,'btn-disable' : !agree_terms}"
              type="submit"
            >作成</button>
            <button class="btn-gray">戻る</button>
          </div>
        </div>
      </form>
    </div>

  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      agree_terms: false,
      user_input: {
        name: "",
        mail: "",
        confirm_mail: "",
        password: "",
        confirm_password: ""
      },
      window_width: ""
    };
  },
  computed: {
    layout_mode() {
      //ウィンドウの横幅が1025未満の場合、SP用の表示にする
      const layout_mode = {};
      if (this.window_width < 1025) {
        layout_mode["justify-center"] = false;
      } else {
        layout_mode["justify-center"] = true;
      }
      return layout_mode;
    },
    pc_mode() {
      if (this.window_width < 1025) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters("account", ["postNewAccountTokensData"])
  },
  methods: {
    setWindowWidth: function() {
      // data にリサイズ後のウィンドウ幅を代入
      this.window_width = window.innerWidth;
    },
    post_tokens() {
      if (this.agree_terms) {
        this.$store.dispatch("account/postNewAccountTokens", this.user_input);
      }
    },
    error_text: function() {
      const self = this;

      return function(value) {
        const error_obj = self.postNewAccountTokensData[value];
        //エラー文言があれば、表示させる
        if (error_obj) {
          return Object.values(error_obj)[0];
        }
        return;
      };
    }
  },
  beforeMount() {
    this.window_width = window.innerWidth;
  },
  mounted() {
    // インスタンスを作成した後、イベントリスナに登録
    window.addEventListener("resize", this.setWindowWidth, false);
  },
  beforeDestroy() {
    // インスタンスを破棄する前に、イベントリスナから削除
    window.removeEventListener("resize", this.setWindowWidth, false);
  }
};
</script>

<style lang="scss" scoped>
.padding_set {
  padding: 30px 0;
}

.register-box {
  width: 830px;
  margin: 0 auto;
  padding: 28px 0;
  background: $color-white;
  border-radius: 4px;
  border: 1px solid $color-gray;
  &__ttl {
    margin: 0 auto 8px;
    border-bottom: 1px solid $color-gray;
    .header-1 {
      text-align: center;
      color: $color-navy-blue;
    }
    .text-standard {
      text-align: center;
    }
    @include breakpoint-max(1025px) {
      margin-bottom: 3vw;
    }
  }

  @include breakpoint-max(1025px) {
    width: 100vw;
    padding: 2.4vw 0;
    border: none;
  }
}

.register-list {
  width: 480px;
  margin: 0 auto 20px;
  &__item:not(:last-of-type) {
    margin-bottom: 20px;
    @include breakpoint-max(1025px) {
      margin-bottom: 3vw;
    }
  }

  &__ttl {
    width: 300px;
    margin-bottom: 8px;
    @include breakpoint-max(1025px) {
      width: 90vw;
      margin-bottom: 2vw;
    }
  }

  &__input {
    width: 480px;
    height: 40px;
    padding: 0 20px;
    border: 1px solid $color-gray;
    font-size: 1.6rem;
    line-height: 40px;
    background: $color-white;
    @include breakpoint-max(1025px) {
      width: 90vw;
      height: 10vw;
      line-height: 10vw;
      padding: 0 3vw;
    }
  }

  @include breakpoint-max(1025px) {
    width: 90vw;
    margin-bottom: 3vw;
  }
}

.register-btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.general-checkbox {
  margin-bottom: 20px;
  &__checkbox {
    height: 18px;
    @include breakpoint-max(1025px) {
      height: 5.6vw;
    }
  }
  &__link {
    text-decoration: underline;
    color: $color-navy-blue;
  }
  @include breakpoint-max(1025px) {
    margin-bottom: 5.3vw;
  }
}

.btn-line {
  display: flex;
  justify-content: center;
  align-items: center;
  [class^="btn-"] {
    width: 188px;
    @include breakpoint-max(1025px) {
      width: 30vw;
      width: 46.13vw;
    }
  }
  .btn-gray {
    margin-left: 20px;
    @include breakpoint-max(1025px) {
      margin-left: 2.9vw;
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
