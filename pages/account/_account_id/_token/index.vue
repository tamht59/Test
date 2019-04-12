<template>
  <v-layout
    column
    align-center
    v-bind="layout_mode"
    :class="{ 'bg-light-gray': pc_mode , 'padding_set': pc_mode}"
  >

    <div class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">「サービス名」ご利用登録</h1>
        <p class="text-standard">この度はお申し込みいただき、誠にありがとうございます。</p>
      </div>
      <ul class="register-list">
        <li class="register-list__item">
          <p class="register-list__ttl"><span class="text-standard">氏名</span></p>
          <p class="header-3">{{getAdminAccountData.name}}</p>
        </li>

        <li class="register-list__item">
          <p class="register-list__ttl"><span class="text-standard">メールアドレス</span></p>
          <p class="header-3">{{getAdminAccountData.loginId}}</p>
        </li>

        <li class="register-list__item">
          <p class="register-list__ttl"><span class="text-standard">パスワード</span><span class="warning-text">【必須】</span></p>
          <input
            type="password"
            v-model.trim="user_info.password"
            class="register-list__input"
          >
        </li>
      </ul>

      <div class="register-btn-box">
        <div class="btn-line">
          <button
            :class="{'btn-blue':user_info.password,'btn-disable' : !user_info.password}"
            @click="adminAccountCheck()"
          >
            <span class="icon-login"></span>登録</button>
        </div>
      </div>
    </div>

  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "no_header",
  data: function() {
    return {
      user_info: {
        password: ""
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
    ...mapGetters("account", [
      "getAdminAccountData",
      "postAdminAccountCheckData"
    ])
  },
  methods: {
    adminAccountCheck() {
      this.$store.dispatch("account/postAdminAccountCheck", {
        login_id: this.getAdminAccountData.loginId,
        password: this.user_info.password,
        url_token: this.$route.params.token
      });
    },
    setWindowWidth: function() {
      // data にリサイズ後のウィンドウ幅を代入
      this.window_width = window.innerWidth;
    }
  },
  beforeMount() {
    this.$store.dispatch("account/getAdminAccount", this.$route.params.token);
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

  .header-3 {
    margin-top: -8px;
    color: $color-navy-blue;
    font-weight: bold;
    @include breakpoint-max(1025px) {
      margin-top: -2vw;
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
  @include breakpoint-max(1025px) {
    margin-bottom: 3vw;
  }
}

.btn-line {
  display: flex;
  justify-content: center;
  align-items: center;
  [class^="btn-"] {
    width: 188px;
    @include breakpoint-max(1025px) {
      width: 46.13vw;
    }
  }
}
</style>
