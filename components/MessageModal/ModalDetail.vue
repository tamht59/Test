<template>
  <div class="edit-form-container">
    <template v-if="!isLoading">
      <div class="top-content">
        <template v-if="edditing">
          <input
            type="text"
            id="title"
            class="text-standard input-field input-field__title"
            v-model="title"
          />
          <div class="textarea-wrap">
            <textarea
              type="text"
              id="description"
              class="text-standard input-field input-field__description"
              v-model="description"
            />
            </div>
        </template>
        <template v-if="!edditing">
          <p class="header-3 title-content">
            {{ title }}
          </p>
          <div class="description-content">
            <p class="text-standard">
              {{ description }}
            </p>
          </div>
        </template>
      </div>
      <div v-if="edditing">
        <div class="btn-line">
          <button class="btn-blue btn-line__btn" @click.prevent="onClickConfirm">
            投稿
          </button>
          <button class="btn-gray btn-line__btn" @click.prevent="onClickCloseBtn">
            閉じる
          </button>
        </div>
        <div class="add-btn__wrap">
          <label class="btn-white" for="upload-photo-edit">
            <span class="icon-camera-bk"></span>
            写真を追加
          </label>
          <input
            type="file"
            name="photo"
            multiple
            id="upload-photo-edit"
            @change="onFileChange($event, messageData.MESSAGE_TYPE)"
            style="display:none"
          />
        </div>
      </div>
      <!-- <div v-if="!edditing">
        <div class="btn-line btn-line--center">
          <button class="btn-blue btn-line__btn edit-btn" @click.prevent="onClickEditBtn">
            <span class="icon-edit"></span>編集する
          </button>
        </div>
        <div class="add-btn__wrap">
          <a download class="btn-white">
            <span class="icon-download"></span>
            この写真をダウンロード
          </a>
        </div>
      </div> -->
      <div class="add-btn__wrap" v-if="isShowDownloadBtn">
        <a :href="downloadLink" download class="btn-white">
          <span class="icon-download"></span>
          この写真をダウンロード
        </a>
      </div>
    </template>
    <div v-else class="loading-icon__wrap">
      <v-progress-circular
        indeterminate
        width="3"
      >
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MESSAGE_TYPE } from "~/utils/constants";

export default {
  props: {
    onClose: {
      type: Function
    },
    messageData: {
      type: Object
    },
    edditing: {
      type: Boolean,
      default: false
    },
    onEdit: {
      type: Function
    },
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },
  computed: {
    messageType() {
      return this.messageData && this.messageData.messageKbn
    },
    isShowDownloadBtn() {
      return this.messageData && (this.messageData.downloadFlag == 1)
    },
    downloadLink() {
      if (this.messageType == MESSAGE_TYPE.IMAGE) {
        return this.messageData && this.messageData.imageUrl
      } else if (this.messageType == MESSAGE_TYPE.VOICE || this.messageType == MESSAGE_TYPE.VIDEO) {
        return this.messageData && this.messageData.movieUrl
      }
    }
  },
  methods: {
    ...mapActions("message", []),
    onClickConfirm() {},
    onClickCloseBtn() {
      this.onClose();
    },
    onClickEditBtn() {
      this.onEdit();
    }
  },
  watch: {
    messageData(data) {
      if (data) {
        this.title = data.title;
        this.description = data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  height: 490px;
  background-color: $color-white;
  .loading-icon__wrap {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .top-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .input-field {
    border: 1px solid $color-gray;
    padding: 10px;
    width: 100%;
  }
  .textarea-wrap {
    flex: 1;
    display: flex;
  }
  .input-field__description {
    margin-top: 20px;
    z-index: 10;
    background-color: $color-white;
  }
  .btn-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 20px 20px 20px;
    .btn-line__btn {
      width: 150px;
    }
  }
  .btn-line--center {
    justify-content: center;
  }
  .add-btn__wrap {
    padding: 15px 20px;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
  }
  .btn-white {
    line-height: 0;
  }
  .title-content {
    border-bottom: 1px solid $color-gray;
    padding-bottom: 3px;
    margin-bottom: 7px;
  }
  .description-content {
    flex: 1;
    border-bottom: 1px solid $color-gray;
    overflow-y: auto;
  }

  @include breakpoint-max($break-sp) {
    display: block;
    width: 100%;
    // min-height: 30vw;
    height: unset;
    .description-content {
      max-height: 50vw;
    }
    .top-content {
      padding: 2vw;
    }
    .input-field {
      padding: 2vw;
    }
    .input-field__description {
      margin-top: 2vw;
      height: 40vw;
    }
    .btn-line {
      padding: 0 2vw 2vw 2vw;
      .btn-line__btn {
        width: 43vw;
      }
      .edit-btn {
        width: 100%;
      }
    }
    .add-btn__wrap {
      padding: 2vw;
    }
    .title-content {
      padding-bottom: 1vw;
      margin-bottom: 2.5vw;
    }
  }
}
</style>
