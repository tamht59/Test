<template>
  <v-layout
    column
    justify-center
    align-center
    class="bg-light-gray"
  >
    <v-card class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">〇〇 〇〇</h1>
        <p class="text-standard">ご訪問ありがとう御座います。<br>ごゆっくりおすごしくださいませ。</p>
      </div>

      <ul class="register-list">
        <li class="register-list__item">
          <p class="register-list__ttl"><span class="text-standard">ログインID</span></p>
          <input
            type="text"
            v-model.trim="user_input.login_id"
            class="register-list__input"
          >
        </li>

        <li class="register-list__item">
          <p class="register-list__ttl"><span class="text-standard">パスワード</span></p>
          <input
            type="password"
            v-model.trim="user_input.new_password_input"
            class="register-list__input"
          >
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
            class="general-checkbox__txt"
          >利用規約に同意する
          </label>
        </div>

        <div class="btn-line">
          <button :class="{'btn-blue':agree_terms,'btn-disable' : !agree_terms}"><span class="icon-login"></span>ログイン</button>
        </div>
      </div>
    </v-card>

  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      agree_terms: false,
      user_input: {
        login_id: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.register-box {
  width: 830px;
  margin: 0 auto;
  padding: 28px 0;
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
}

.register-list {
  width: 480px;
  margin: 0 auto 20px;
  &__item:not(:last-of-type) {
    margin-bottom: 20px;
  }

  &__ttl {
    width: 300px;
    margin-bottom: 8px;
  }

  &__input {
    width: 480px;
    height: 40px;
    padding: 0 20px;
    border: 1px solid $color-gray;
    font-size: 16px;
    line-height: 40px;
    background: $color-white;
  }
}

.register-btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.general-checkbox {
  margin-bottom: 20px;
}

.btn-line {
  display: flex;
  justify-content: center;
  align-items: center;
  [class^="btn-"] {
    width: 188px;
  }
  .btn-gray {
    margin-left: 20px;
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
