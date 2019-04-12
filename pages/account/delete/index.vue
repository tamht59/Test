<template>
  <v-layout
    column
    align-center
    v-bind="layout_mode"
    :class="{ 'bg-light-gray': pc_mode , 'padding_set': pc_mode}"
  >
    <v-card class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">退会フォーム</h1>
        <p class="text-standard">
          本サービス「サービス名」の退会フォームです。<br>以下の項目をご記入のうえ「退会手続きを進める」ボタンを押してください。
        </p>
      </div>

      <form
        class=""
        @submit.prevent="postRetireReasonExecution()"
      >
        <ul class="register-list">
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="header-3">退会理由<span class="warning-text">【必須】</span></span></p>

            <div class="register-list__select-box">
              <select
                v-model="form.reson"
                class="register-list__select"
              >
                <option disabled>選択してください</option>
                <option
                  v-for="category in getRetireReasonCategory"
                  :value="category.retireReasonCategoryId"
                  :key="category.retireReasonCategoryId"
                >{{category.retireReasonCategoryName}}</option>
              </select>
            </div>
            <!-- <div
              v-show="postContactCheckData.errors.category_id"
              class="warning-text"
            >
              {{error_text('category_id')}}
            </div> -->
          </li>
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="header-3">改善してほしい点</span></p>
            <textarea
              rows="8"
              v-model="form.improve"
              class="register-list__textarea"
            ></textarea>
            <!-- <div class="warning-text">{{error_text('content')}}
            </div> -->
          </li>
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="header-3">欲しかった機能</span></p>
            <textarea
              rows="8"
              v-model="form.wantedFunction"
              class="register-list__textarea"
            ></textarea>
            <!-- <div class="warning-text">{{error_text('content')}}
            </div> -->
          </li>
          <li class="register-list__item">
            <p class="register-list__ttl"><span class="header-3">その他・ご意見・ご感想</span></p>
            <textarea
              rows="8"
              v-model="form.other"
              class="register-list__textarea"
            ></textarea>
            <!-- <div class="warning-text">{{error_text('content')}}
            </div> -->
          </li>
        </ul>

        <div class="register-btn-box">
          <div class="btn-line">
            <button
              class="btn-blue"
              type="submit"
            >退会手続きを進める</button>
            <button
              class="btn-gray"
              @click="$router.go(-1)"
            >戻る</button>
          </div>
        </div>

      </form>

    </v-card>
  </v-layout>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

//TODO 入力確認から戻ってきたときに内容が保持されていないので対策をする

export default {
  data: function() {
    return {
      form: {
        reson: "",
        improve: "",
        wantedFunction: "",
        other: ""
      },
      window_width: ""
    };
  },
  methods: {
    postRetireReasonExecution: function() {
      //退会内容をstoreに保存する
      this.$store.dispatch("account/postRetireReason", this.form);
    },
    setWindowWidth: function() {
      // data にリサイズ後のウィンドウ幅を代入
      this.window_width = window.innerWidth;
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
    },
    ...mapGetters("account", ["getRetireReasonCategory"])
  },
  beforeMount() {
    this.$store.dispatch("account/getRetireReasonCategories");
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
  margin: 48px auto;
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
      @include breakpoint-max(1025px) {
        width: 90vw;
        margin: 0 auto 3vw;
        text-align: left;
      }
    }
  }

  @include breakpoint-max(1025px) {
    width: 100vw;
    margin: 0 auto;
    padding: 2.4vw 0 10vw;
    border: none;
  }
}

.register-caution {
  width: 640px;
  margin: 0 auto 20px;
  &__item {
    .text-standard {
      padding-left: 1em;
      text-indent: -1em;
    }
  }
  &__link {
    color: $color-navy-blue;
    text-decoration: underline;
  }

  @include breakpoint-max(1025px) {
    width: 90vw;
    margin-bottom: 3vw;
  }
}

%input {
  width: 100%;
  padding: 0 20px;
  border: 1px solid $color-gray;
  font-size: 1.6rem;
  background: $color-white;

  @include breakpoint-max(1025px) {
    width: 90vw;
    padding: 0 3vw;
  }
}

.register-list {
  width: 640px;
  margin: 0 auto 20px;
  &__item {
    &:not(:last-of-type) {
      margin-bottom: 20px;
      @include breakpoint-max(1025px) {
        margin-bottom: 3vw;
      }
    }
    @include breakpoint-max(1025px) {
      padding: 0 5vw;
    }
  }

  &__ttl {
    margin-bottom: 8px;
    @include breakpoint-max(1025px) {
      margin-bottom: 1vw;
    }
  }

  &__select-box {
    position: relative;
    &:after {
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      font-family: "icomoon" !important;
      font-size: 2.5em;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      content: "\e901";
      pointer-events: none;
      @include breakpoint-max(1025px) {
        font-size: 2em;
        right: 0.5em;
      }
    }
  }

  &__select,
  &__input {
    @extend %input;
    height: 40px;
    @include breakpoint-max(1025px) {
      height: 10vw;
      line-height: 10vw;
    }
  }

  &__textarea {
    @extend %input;
    height: 240px;
    padding: 12px 20px;
    resize: none;
    @include breakpoint-max(1025px) {
      height: 40vw;
      padding: 2vw 3vw;
    }
  }

  @include breakpoint-max(1025px) {
    width: 100vw;
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
  .btn-gray {
    margin-left: 20px;
    @include breakpoint-max(1025px) {
      margin-left: 3vw;
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
