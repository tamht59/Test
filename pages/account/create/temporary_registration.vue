<template>
  <v-layout
    column
    align-center
    v-bind="layout_mode"
    :class="{ 'bg-light-gray': pc_mode , 'padding_set': pc_mode}"
  >
    <div class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">アカウント仮登録完了</h1>
      </div>

      <div class="register-complete">
        <p class="text-large">
          入力いただいたメールアドレス宛てに<br>ご登録のご案内メールをお送りいたしましたのでご確認ください。
        </p>
      </div>

      <div class="register-btn-box">
        <div class="btn-line">
          <button
            class="btn-gray"
            @click="pageTOP()"
          >TOPに戻る</button>
        </div>
      </div>

    </div>
  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      window_width: ""
    };
  },
  methods: {
    pageTOP: function() {
      $nuxt.$router.push("/main");
    }
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
    }
  },
  methods: {
    setWindowWidth: function() {
      // data にリサイズ後のウィンドウ幅を代入
      this.window_width = window.innerWidth;
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
  width: 960px;
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

.register-complete {
  text-align: center;
  margin-bottom: 20px;
  @include breakpoint-max(1025px) {
    margin-bottom: 3vw;
  }
}

.register-btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-line {
  display: flex;
  justify-content: center;
  align-items: center;
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
