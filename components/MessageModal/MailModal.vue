<template>
  <v-dialog
    v-model="visible"
    persistent
    attach
    no-click-animation
  >
    <div class="mail-modal">
        <div class="mail-modal__header-title">
          <p class="header-3">
            {{ headerTitle }}
          </p>
        </div>

        <div class="mail-modal__body">
          <p class="text-standard" v-if="!isLoading">
            {{ messageContent }}
          </p>
          <div v-else class="loading-icon__wrap">
            <v-progress-circular
              indeterminate
              width="3"
            >
            </v-progress-circular>
          </div>
        </div>

        <div class="mail-modal__footer">
          <div class="attachment-url" v-if="!!attachmentUrl">
            <a :href="attachmentUrl" download class="btn-white attachment-url__btn">
              <span class="icon-download"></span>
              ファイルをダウンロード
            </a>
          </div>
          <button
            class="btn-gray close-btn"
            @click.prevent="onClose()"
          >
            <span>閉じる</span>
          </button>
        </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    messageData: {
      type: Object
    },
    visible: {
      type: Boolean,
      require: true
    },
    onClose: {
      type: Function
    },
    onOpen: {
      type: Function
    },
  },
  computed: {
    headerTitle() {
      return (this.messageData.result && this.messageData.result.title) || ""
    },
    messageContent() {
      return (this.messageData.result && this.messageData.result.message) || ""
    },
    isLoading() {
      return this.messageData.requesting;
    },
    isError() {
      return this.messageData.status === "fail" && this.messageData.error;
    },
    attachmentUrl() {
      return this.messageData.result && this.messageData.result.messageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.mail-modal {
  width: 960px;
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 20px;
  overflow: hidden;
  &__header-title {
    width: 100%;
    border-bottom: 2px solid $color-gray;
    padding: 10px 0;
    .header-3 {
      text-align: center;
    }
  }
  &__body {
    height: 400px;
    padding: 10px 0;
    overflow-y: auto;
  }
  &__footer {
    border-top: 2px solid $color-gray;
    text-align: center;
    padding: 15px 0;
  }
  .close-btn {
    width: 300px;
  }
  .loading-icon__wrap {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .attachment-url {
    margin-bottom: 10px;
    &__btn {
      width: 300px;
    }
    a {
      color: $color-text-blue;
    }
  }
  @include breakpoint-max($break-sp) {
    width: 92vw;
    padding: 1vw 5vw;
    &__header-title {
      border-bottom-width: 1px;
      padding: 2vw 0;
    }
    &__body {
      padding: 2vw 0;
      height: 40vh;
    }
    &__footer {
      border-top-width: 1px;
      padding: 3vw 0;
    }
    .close-btn {
      width: 82vw;
    }
    .attachment-url {
      margin-bottom: 2vw;
      &__btn {
        width: 82vw;
      }
    }
  }
  
}
</style>
