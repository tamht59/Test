<template>
  <div class="edit-form-container">
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
    <div v-if="postAlbumErrorMessage" class="text-required warning-text">
      {{postAlbumErrorMessage}}
    </div>
    <div v-if="edditing">
      <div class="btn-line">
        <button class="btn-blue btn-line__btn" @click.prevent="onClickConfirm">
          投稿
        </button>
        <button class="btn-gray btn-line__btn" @click.prevent="onClickCloseBtn('isEdit')">
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
          @change="onFileChange($event, data.album_type)"
          style="display:none"
        />
      </div>
    </div>
    <div v-if="!edditing">
      <div v-if="data.self_flag == '1'" class="btn-line btn-line--center">
        <button class="btn-blue btn-line__btn" @click.prevent="onClickEditBtn">
          <span class="icon-edit"></span>編集する
        </button>
      </div>
      <div v-show="linkDownload" class="add-btn__wrap">
        <a :href="linkDownload" download class="btn-white">
          <span class="icon-download"></span>
          この写真をダウンロード
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ALBUM_TYPE } from "~/utils/constants";

export default {
  props: {
    room_id: {
      type: String
    },
    onClickClose: {
      type: Function
    },
    data: {
      type: Object,
      required: true
    },
    idAlbumDetail: {
      type: Number
    },
    setNullIdAlbumDetail: {
      type: Function
    },
    edditing: {
      type: Boolean,
      default: false
    },
    onClickEdit: {
      type: Function
    },
    urlCurrentImgDisplay: {
      type: String
    },
    formDataUpload: {
      type: Array
    },
    onFileChange: {
      type: Function
    }
  },
  data() {
    return {
      title: this.data.title,
      description: this.data.album_comment,
      postAlbumErrorMessage: null
    };
  },
  computed: {
    videoType() {
      return ALBUM_TYPE.VIDEO;
    },
    imageType() {
      return ALBUM_TYPE.IMAGE;
    },
    linkDownload() {
      if (this.urlCurrentImgDisplay) {
          return this.urlCurrentImgDisplay
      } else if (this.data.contents[0]) {
        return this.data.contents[0].contents_url
      }
      return false
    }
  },
  methods: {
    async onClickConfirm() {
      let formData = new FormData();

      if (this.formDataUpload.length !== 0) {
        if (this.data.album_type == "1") {
          for (var i = 0; i < this.formDataUpload.length; i++) {
            formData.append("content_file[]", this.formDataUpload[i]);
          }
        } else {
          formData.append("content_file", this.formDataUpload[0]);
        }
      }

      formData.append("title", this.title);
      formData.append("album_comment", this.description);
      formData.append("album_type", this.data.album_type);
      formData.append("user_name", "");
      formData.append("multi_flag", this.data.multi_flag);
      formData.append("self_flag", "1");

      const postData = {
        room_id: this.room_id,
        formData: formData
      };

      if (this.idAlbumDetail) {
        formData.append("album_id", this.idAlbumDetail);
        const result = await this.$store.dispatch("album/putAlbum", {
          formData,
          albumId: this.idAlbumDetail
        });
        if (result === true) {
          this.postAlbumErrorMessage = null;
        } else {
          this.postAlbumErrorMessage = result.message;
        }
      } else {
        formData.append("room_id", this.room_id);
        const result = await this.$store.dispatch("album/postAlbum", postData);
        if (result === true) {
          this.postAlbumErrorMessage = null;
        } else {
          this.postAlbumErrorMessage = result.message;
        }
      }
    },
    onClickCloseBtn(isEdit) {
      this.postAlbumErrorMessage = null;
      this.onClickClose(isEdit);
      this.setNullIdAlbumDetail();
    },
    onClickEditBtn() {
      this.onClickEdit();
    }
  },
  mounted() {
    this.title = this.data.title;
    this.description = this.data.album_comment;
  }
};
</script>

<style lang="scss" scoped>
.edit-form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .top-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .date-line {
      margin: 0;
      padding-bottom: 5px;
    }
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
  .text-required {
    padding: 0 20px 1rem;
    text-align: center;
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
    .btn-line {
      .btn-line__btn {
        width: 100%;
        &:nth-child(2) {
          margin-left: 20px;
        }
      }
    }
    .input-field__description {
      height: 198px;
    }
    .description-content {
      max-height: 220px;
    }
  }
}
</style>
