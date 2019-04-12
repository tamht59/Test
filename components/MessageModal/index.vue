<template lang="html">
  <div class="message-modal__container">
    <v-dialog
      v-model="visible"
      persistent
      attach
      no-click-animation
    >
      <div class="close-btn-top">
        <button
          @click.prevent="onCloseModal(true)"
          class="btn-flat"
        >
          閉じる
        </button>
      </div>
      <div>
        <div v-if="!isError || isLoading" class="message-modal">
          <MediaContent
            v-if="isShowMedia"
            :data="mediaData"
            :edditing="false"
            :isLoading="isLoading"
            :onExpandBtn="setCurrentImgUrl"
          />
          <ModalDetail
            :messageData="messageData.result"
            :edditing="edditing"
            :onClose="onCloseModal"
            :onEdit="onClickEditBtn"
            :isLoading="isLoading"
          />
        </div>
        <div v-else class="error-message__container">
          <p class="text-standard">Error! Cannot get this message</p>
        </div>
      </div>
    </v-dialog>


    <v-dialog
      v-model="viewFullSize"
      persistent
      attach
    >
      <div class="fullsize-img">
        <div class="close-btn__wrap">
          <button class="btn-flat icon-delete" @click.prevent="onCloseFullSizeMode">
          </button>
        </div>
        <img :src="currentImgUrl" class="fullsize-img__img">
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalDetail from "./ModalDetail";

import MediaContent from "./MediaContent";
import { MESSAGE_TYPE } from "~/utils/constants";
import _ from "lodash";

export default {
  components: {
    ModalDetail,
    MediaContent
  },
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
    messageType: {
      default: MESSAGE_TYPE.VIDEO
    }
  },
  data() {
    return {
      edditing: false,
      viewFullSize: false,
      currentImgUrl: ""
    };
  },
  computed: {
    isShowMedia() {
      return this.messageType != MESSAGE_TYPE.TEXT;
    },
    mediaData() {
      if (this.messageData) {
        const { imageUrl, movieUrl } = this.messageData.result || {};
        return { imageUrl, movieUrl, messageType: this.messageType };
      }
    },
    listImagesContent() {
      return (this.dataAlbumDetail && this.dataAlbumDetail.contents) || [];
    },
    isLoading() {
      return this.messageData.requesting;
    },
    isError() {
      return this.messageData.status === "fail" && this.messageData.error;
    }
  },
  methods: {
    onCloseModal(isForce) {
      if (this.edditing) {
        this.edditing = false;
        if (isForce) this.onClose();
      } else {
        this.onClose();
      }
    },
    onClickEditBtn() {
      this.edditing = true;
    },
    setCurrentImgUrl({ mediaSrc }) {
      this.currentImgUrl = mediaSrc;
      this.onClose();
      this.viewFullSize = true;
    },
    onCloseFullSizeMode() {
      this.viewFullSize = false;
      this.onOpen();
    }
  }
};
</script>

<style lang="scss" scoped>
.close-btn-top {
  text-align: right;
  margin-bottom: 20px;
  button {
    line-height: unset;
  }
}
.message-modal {
  max-width: 1200px;
  max-height: 490px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .error-message__container {
    width: 250px;
    height: 100px;
  }
}
.fullsize-img {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  .close-btn__wrap {
    text-align: right;
  }
  &__img {
    display: block;
    width: auto;
    height: auto;
    max-width: 90vw;
    max-height: 80vh;
  }
}

@include breakpoint-max(1300px) {
  .message-modal {
    max-width: 1000px;
  }
}

@include breakpoint-max($break-sp) {
  .close-btn-top {
    margin-bottom: 2vw;
  }
  .message-modal {
    display: block;
    max-width: unset;
    width: 92vw;
    overflow-y: auto;
    max-height: 80vh;
    .error-message__container {
      width: 50vw;
      height: 30vw;
    }
  }
}
</style>

<style lang="scss">
// Remove dialog box shadow
.message-modal__container {
  .v-dialog__content {
    align-items: flex-start;
    .v-dialog {
      box-shadow: unset;
    }
  }
}
@include breakpoint-max($break-sp) {
  .message-modal__container {
    .v-dialog__content {
      .v-dialog {
        overflow-y: hidden;
      }
    }
  }
}
</style>
