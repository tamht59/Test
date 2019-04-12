<template>
  <v-layout
    column
    align-center
    v-bind="layout_mode"
    :class="{ 'bg-light-gray': pc_mode , 'padding_set': pc_mode}"
  >
    <div class="register-box">
      <div class="register-box__ttl">
        <h1 class="header-1">参拝先選択</h1>
        <p class="text-standard">参拝したい方の「選択」ボタンを押してください。</p>
      </div>
      <ul class="deceased-list">
        <li
          class="deceased-list__item"
          v-for="room in roomUsers"
          :key="room.roomId"
        >
          <div class="deceased-list__img-box">
            <img
              :src="room.deceasedImage"
              class="deceased-list__img"
            >
          </div>
          <p class="text-standard">{{room.displayName}}</p>
          <nuxt-link
            :to="'/main/' + room.roomId"
            class="btn-blue"
            tag="button"
          >
            選択
          </nuxt-link>

        </li>
      </ul>

      <div class="register-btn-box">
        <div class="btn-line">
          <button
            class="btn-gray"
            @click="$router.go(-1)"
          >戻る</button>
        </div>
      </div>
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
    //閲覧ユーザーに紐づくroom(墓)一覧の取得
    ...mapGetters("room", ["roomData", "roomUsers"])
  },
  methods: {
    setWindowWidth: function() {
      // data にリサイズ後のウィンドウ幅を代入
      this.window_width = window.innerWidth;
    }
  },
  beforeMount() {
    //ルームデータ取得APIを叩く
    this.$store.dispatch("room/getRoomData", {
      room_id: this.room_id
    });
    //閲覧ユーザーに紐づくroom(墓)一覧のAPI
    this.$store.dispatch("room/getRoomUsers");
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
    margin: 0 auto;
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

.deceased-list {
  width: 790px;
  margin: 0 auto 20px;
  &__item {
    display: flex;
    align-items: center;
    padding: 20px 0 20px 40px;
    border-bottom: 1px solid $color-gray;
    @include breakpoint-max(1025px) {
      padding: 5.3vw 1vw 5.3vw 2.4vw;
    }
  }

  &__img-box {
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin-right: 20px;
    @include breakpoint-max(1025px) {
      width: 21.3vw;
      height: 21.3vw;
      margin-right: 3vw;
    }
  }

  &__img {
    display: block;
    width: 100%;
  }

  .text-standard {
    line-height: 1;
    margin: 0;
  }

  .btn-blue {
    width: 188px;
    margin-left: auto;
    @include breakpoint-max(1025px) {
      width: 24vw;
    }
  }

  @include breakpoint-max(1025px) {
    width: 94.6vw;
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
      width: 94.6vw;
    }
  }
}
</style>
