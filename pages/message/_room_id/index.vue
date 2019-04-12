<template>
  <v-layout
    column
    align-center
  >
    <div class="mail-section-container">
      <div class="mail-section">
        <p class="header-1 mail-section__title">
          メッセージ一覧
        </p>
        <div v-if="isEmpty">
          <p class="header-2 empty_text">メッセージ情報が存在しません。</p>
        </div>
        <div
          v-else
          class="mail-section__content"
        >
          <MessageInLine
            v-for="(message, key) in messageListData"
            :key="key"
            :messageData="message"
            :onClickMessage="openMessageModel"
          />

          <v-progress-circular
            v-if="isShowLoading"
            indeterminate
            width="3"
            class="loading-icon"
          >
          </v-progress-circular>
          
        </div>
        <!-- <div
          class="load-more"
          v-if="isShowLoadMore"
        >
          <button class="btn-white load-more-btn">
            もっと見る
          </button>
        </div> -->
      </div>
      <MessageModal
        :messageData="messageData"
        :visible="visibleModal"
        :onClose="onCloseMessageModal"
        :onOpen="openModal"
        :messageType="messageType"
      />
      <MailModal
        :messageData="messageData"
        :visible="visibleMailModal"
        :onClose="onCloseMailModal"
      />
    </div>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MessageInLine from "~/components/MessageInLine";
import MessageModal from "@/components/MessageModal";
import MailModal from "~/components/MessageModal/MailModal";
import { MESSAGE_TYPE } from "~/utils/constants";

export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.room_id);
  },
  components: {
    MessageInLine,
    MessageModal,
    MailModal
  },
  data() {
    return {
      room_id: this.$route.params.room_id,
      visibleModal: false,
      messageData: {},
      messageType: MESSAGE_TYPE.IMAGE,
      visibleMailModal: false,
      isLoadMore: false
    };
  },
  computed: {
    messageListData() {
      return this.listMessagesData.result && this.listMessagesData.result.items || [];
    },
    // isShowLoadMore() {
    //   return this.listMessagesData.result && this.listMessagesData.result.nextPage;
    // },
    isEmpty() {
      const { result, status } = this.listMessagesData;
      return status !== "" && (!result || !result.items)
    },
    isShowLoading() {
      const { requesting } = this.listMessagesData;
      return requesting
    },

    ...mapGetters("message", {
      listMessagesData: "listMessagesData",
      messageDetail: "messageDetail"
    })
  },
  methods: {
    onCloseMessageModal() {
      this.visibleModal = false;
    },
    openModal() {
      this.visibleModal = true;
    },
    openMessageModel(data) {
      const { messageId, type } = data;
      this.messageType = type;
      this.getMessageDetail({ messageId });
      // this.messageData = this.getMessageData(data)
      if (type == MESSAGE_TYPE.TEXT) {
        this.visibleMailModal = true;
        return
      }
      this.visibleModal = true;
    },
    getMessageData(data) {
      return messageFakeData;
    },
    handleScroll(e) {
      let bottomOfWindow =
        (document.body.scrollTop + (window.innerHeight * 1.4)) >=
        document.body.offsetHeight;

      if (bottomOfWindow && !this.isLoadMore && this.listMessagesData.result.nextPage) {
        this.isLoadMore = true;
        this.getListMessages({ page: this.listMessagesData.result.nextPage, roomId: this.room_id });
      }
    },
    onCloseMailModal() {
      this.visibleMailModal = false
    },

    ...mapActions("message", {
      getListMessages: "getListMessages",
      getMessageDetail: "getMessageDetail",
      getMessageUnread: "getMessageUnread"
    })
  },
  mounted() {
    //ルームデータ取得APIを叩く
    this.$store.dispatch("room/getRoomData", {
      room_id: this.room_id
    });
    this.getListMessages({ page: "1", roomId: this.room_id });
    this.getMessageUnread({ roomId: this.room_id });
     document.body.addEventListener('scroll', this.handleScroll);
  },
  watch: {
    messageDetail(data) {
      this.messageData = data;
    },
    listMessagesData(data, oldData) {
      if (data.status !== oldData.status && data.status !== '') {
        this.isLoadMore = false
      }
    },
  },
  destroyed () {
     document.body.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.mail-section-container {
  max-width: 95%;
  width: 830px;
  .mail-section {
    max-width: 830px;
    padding: 25px 0;
    &__title {
      color: $color-text-blue;
      border-bottom: 1px solid $color-gray;
    }
    .empty_text {
      text-align: center;
      margin: 20px 0;
    }
  }
  .mail-section__title {
    color: $color-text-blue;
  }
  .mail-section__content {
    border-top: 1px solid $color-gray;
    display: flex;
    flex-direction: column;
  }
  .loading-icon {
    width: 100%;
    color: $color-navy-blue;
    align-self: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @include breakpoint-max($break-sp) {
    max-width: 100%;
    width: 100vw;
    .mail-section {
      padding: 2vw 0;
      &__title {
        margin-bottom: 1vw;
        padding-left: 2vw;
      }
      .empty_text {
        margin: 5vw 0;
      }
    }
    .loading-icon {
      margin-top: 5vw;
      margin-bottom: 5vw;
    }
  }
}
</style>
