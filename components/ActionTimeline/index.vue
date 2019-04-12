<template>
  <ul class="action-timeline">

    <template v-for="post in timelineData">
      <li
        class="action-timeline__item"
        v-if="!post.deleted"
        :key="post.id"
      >
        <p class="action-timeline__caption">
          <span class="text-large">
            <span
              class="action-timeline__caption-icon"
              :class="'icon-' + category_icon(post.actionKbn)"
            ></span>
            <span class="action-timeline__caption-main">
              <span class="action-timeline__caption-name">
                {{post.nickname}}さん
              </span>
            </span>
            が{{category_action(post.actionKbn)}}しました。
          </span>
          <span class="date-text">{{post.modified}}</span>
        </p>
        <div
          v-if="post.actionKbn === '4'"
          class="action-timeline__comment-box"
        >
          <p class="text-standard">{{post.roomComment}}</p>
          <div
            v-if="post.myCommentId"
            class="action-timeline__comment-edit"
          >
            <button
              class="action-timeline__comment-edit-link"
              @click="comment_edit(post.myCommentId)"
            >編集</button>
            <span class="action-timeline__comment-edit-pipe">|</span>
            <button
              class="action-timeline__comment-edit-link"
              @click="comment_delete(post.myCommentId)"
            >削除</button>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ActionTimeline",
  data() {
    return {
      updateTimelineTimer: null
    };
  },
  computed: {
    ...mapGetters("room", {
      timelineData: "timelineData"
    }),
    now_room_id() {
      if (this.$route.params.room_id) {
        //roomIdをURLから取得
        return this.$route.params.room_id;
      } else {
        //URLに記載されていなければ、storeから取得
        return this.roomData.id;
      }
    }
  },
  methods: {
    comment_edit: function(value) {
      this.$emit("timeline_onClickEditComment", value);
    },
    comment_delete: function(value) {
      this.$emit("timeline_onClickDeleteComment", value);
    },
    category_icon: function(category) {
      switch (category) {
        //1：供花
        case "1":
          return "flower";
        //2：静止画アップロード
        case "2":
          return "album";
        //3：動画アップロード
        case "3":
          return "album";
        //4：公開設定にしたコメント
        case "4":
          return "comment";
        //5：お参り
        case "5":
          return "pray";
        //6：故人からのメッセージ一斉配信時
        case "6":
          return "message";
        //7：遺族からのメッセージ一斉配信時
        case "7":
          return "message";
      }
    },
    category_action: function(category) {
      switch (category) {
        //1：供花
        case "1":
          return "お供え";
        //2：静止画アップロード
        case "2":
          return "アルバム(静止画)を更新";
        //3：動画アップロード
        case "3":
          return "アルバム(動画)を更新";
        //4：公開設定にしたコメント
        case "4":
          return "コメントを投稿";
        //5：お参り
        case "5":
          return "お参り";
        //6：故人からのメッセージ一斉配信時
        case "6":
          return "故人からのメッセージを配信";
        //7：遺族からのメッセージ一斉配信時
        case "7":
          return "遺族からのメッセージを配信";
      }
    },
    updateTimeline: function() {
      this.$store.dispatch("room/getTimeline", {
        roomID: this.now_room_id
      });
    }
  },
  mounted() {
    //タイムライン取得APIを叩く
    this.updateTimeline();

    //タイムラインAPIを定期的に叩かせる
    window.addEventListener("popstate", this.updateTimeline, false);
    this.updateTimelineTimer = setInterval(this.updateTimeline, 60000);
  },
  destroyed: function() {
    //タイムラインAPIを定期的に叩くのをやめさせる
    window.removeEventListener("popstate", this.updateTimeline, false);
    clearInterval(this.updateTimelineTimer);
  }
};
</script>

<style lang="scss" scoped>
.action-timeline {
  width: 830px;
  list-style: none;
  margin: 0 auto;
  padding: 0;

  &__item {
    padding: 16px 20px;
    margin: 0 auto 30px;
    border: 1px solid $color-gray;
    background: $color-white;
  }

  &__caption {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    .text-large {
      position: relative;
      padding-left: 1.4em;
      line-height: 1.3;
    }
    &-name {
      display: inline-flex;
      align-items: center;
      color: $color-navy-blue;
      font-weight: bold;
    }
    &-main {
      display: inline-flex;
      align-items: baseline;
    }
    &-icon {
      position: absolute;
      top: 0.1em;
      left: 0;
      color: $color-navy-blue;
      font-size: 1.2em;
      margin-right: 0.15em;
    }
  }

  &__comment-box {
    margin-top: 8px;
    padding-top: 18px;
    border-top: 1px solid $color-gray;
    .text {
      line-height: 1.8;
    }
  }
  &__comment-edit {
    display: flex;
    justify-content: flex-end;
    &-link {
      color: $color-dark-gray;
      line-height: 1;
      font-size: 1.6rem;
      &:first-of-type {
        margin-right: 8px;
      }
      &:last-of-type {
        margin-left: 8px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
    &-pipe {
      color: $color-dark-gray;
      line-height: 1;
      font-size: 1.7rem;
    }
  }

  @include breakpoint-max(1025px) {
    width: (355 / 375) * 100vw;
    &__item {
      padding: (5 / 375) * 100vw (8 / 375) * 100vw;
      margin: 0 auto (10 / 375) * 100vw;
    }
    &__caption {
      flex-direction: column;
      .date-text {
        order: 1;
        margin-bottom: (5 / 375) * 100vw;
      }
      .text-large {
        align-self: flex-start;
        order: 2;
      }
    }
    &__comment-box {
      margin-top: (5 / 375) * 100vw;
      padding-top: (8 / 375) * 100vw;
      .text {
        line-height: 1.8;
      }
    }
    &__comment-edit {
      &-link {
        font-size: 1.3rem;
        &:first-of-type {
          margin-right: (9 / 375) * 100vw;
        }
        &:last-of-type {
          margin-left: (9 / 375) * 100vw;
        }
      }
      &-pipe {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
