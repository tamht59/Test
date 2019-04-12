<template lang="html">
  <div class="modal-album-detail">
    <v-dialog
      v-model="isShowAlbumDetail"
      persistent
      attach
      no-click-animation
    >
      <div class="btn-close-modal-detail">
        <v-btn @click="closeDialog" round flat>閉じる</v-btn>
      </div>
      <v-card flat>
        <div class="album-detail">
          <div class="album-detail__content-left">
            <div class="content-video" v-if="isOpeningWithVideo">
              <video width="100%" height="100%" controls v-if="itemVideoUrl">
                <source :src="itemVideoUrl" type="video/mp4">
                <source :src="itemVideoUrl" type="video/ogg">
                Your browser does not support the video tag.
              </video>

              <button
                v-show="edditing"
                class="btn-flat icon-delete"
                @click.prevent="onClickDeleteAlbumDetail()"
              >
                この写真を削除
              </button>
            </div>

            <AlbumCarousel
              v-if="!isOpeningWithVideo && isShowAlbumDetail"
              :key="keyOfCarousel"
              :hideControls="hiddenControlFlag"
              :data="listImagesContent"
              :edditing="edditing || isUploading"
              :upload="isUploading"
              :setUrlCurrentImg="setUrlCurrentImg"
              :onClickClose="closeDialog"
            />

          </div>
          <div class="album-detail__content-right">
            <AlbumDetailContent
              v-if="dataAlbumDetail"
              :room_id="room_id"
              :edditing="edditing || isUploading"
              :data="dataAlbumDetail"
              :onClickClose="closeDialog"
              :onClickEdit="onClickEditBtn"
              :idAlbumDetail="idAlbumDetail"
              :setNullIdAlbumDetail="setNullIdAlbumDetail"
              :urlCurrentImgDisplay="urlCurrentImgDisplay"
              :formDataUpload="formDataUpload"
              :onFileChange="onFileChange"
            />

          </div>

          <div class="text-xs-center loading-upload">
            <v-progress-circular
              v-show="this.requestPutAlbum || this.requestPostAlbum"
              :size="50"
              color="light-blue"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>

      </v-card>
    </v-dialog>

    <DialogDeleteAlbumDetail :onClickClose="closeDialog" ref="dialogDeleteAlbumDetail" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AlbumDetailContent from "./AlbumDetailContent";

import AlbumCarousel from "./AlbumCarousel";
import { ALBUM_TYPE } from "~/utils/constants";
import _ from "lodash";
import DialogDeleteAlbumDetail from './DialogDeleteAlbumDetail';

export default {
  components: {
    AlbumDetailContent,
    AlbumCarousel,
    DialogDeleteAlbumDetail
  },
  props: {
    room_id: {
      type: String
    },
    showAlbumDetail: {
      type: Boolean
    },
    onCloseDialog: {
      type: Function
    },
    closeUpload: {
      type: Function
    },
    urlDataUpload: {
      type: Array
    },
    uploadType: {
      type: String
    },
    isUploading: {
      type: Boolean
    },
    idAlbumDetail: {
      type: Number
    },
    setNullIdAlbumDetail: {
      type: Function
    },
    albumDetailResult: {
      type: Object
    },
    isEditing: {
      type: Boolean
    },
    formDataUpload: {
      type: Array
    },
    onFileChange: {
      type: Function
    },
    keyOfCarousel: {
      type: Number
    }
  },
  data() {
    return {
      edditing: this.isEditing,
      urlCurrentImgDisplay: ""
    };
  },
  methods: {
    closeDialog(isEdit) {
      this.edditing = false;
      this.setNullIdAlbumDetail();
      if (isEdit !== "isEdit" || this.isUploading) {
        this.onCloseDialog();
        this.closeUpload && this.closeUpload();
      }
    },
    onClickEditBtn() {
      this.edditing = true;
    },
    setUrlCurrentImg(url) {
      this.urlCurrentImgDisplay = url;
    },
    reloadListAlbum(status) {
      if (status === 'success') {
        const roomId = this.room_id
        this.closeDialog()
        this.getListAlbum({ roomId, page: 1 })
      }
    },
    onClickDeleteAlbumDetail() {
      const { detail_id } = this.dataAlbumDetail.contents[0]
      this.$refs.dialogDeleteAlbumDetail.openCloseModalDeleteAlbumDetail(detail_id)
    },
    ...mapActions("album", {
      getListAlbum: "getListAlbum"
    })
  },
  computed: {
    isShowAlbumDetail() {
      return this.showAlbumDetail;
    },
    hiddenControlFlag() {
      const multiImgUpload = _.get(this.dataAlbumDetail, "multi_flag", "");

      if (multiImgUpload == "") {
        return true;
      }
      return false;
    },
    itemVideoUrl() {
      const data = this.dataAlbumDetail;
      return _.get(data, "contents[0].contents_url");
    },
    dataAlbumDetail() {
      if (this.isUploading) {
        let contents = [];
        let title = null;
        let album_comment = null;
        if (this.idAlbumDetail) {
          title = this.albumDetailResult.title;
          album_comment = this.albumDetailResult.album_comment;
        }
        this.urlDataUpload.map((url, key) => {
          contents.push({
            detail_id: key,
            contents_url: url
          });
        });

        const multi_flag = contents.length > 1 ? "1" : "";

        return {
          album_type: this.uploadType,
          multi_flag,
          title,
          album_comment,
          contents
        };
      }
      return this.albumDetailResult;
    },
    isOpeningWithVideo() {
      return (
        this.dataAlbumDetail &&
        this.dataAlbumDetail.album_type == ALBUM_TYPE.VIDEO
      );
    },
    listImagesContent() {
      return (this.dataAlbumDetail && this.dataAlbumDetail.contents) || [];
    },

    ...mapGetters("album", {
      statusPostAlbum: "statusPostAlbum",
      statusPutAlbum: "statusPutAlbum",
      requestPostAlbum: "requestPostAlbum",
      requestPutAlbum: "requestPutAlbum"
    })
  },
  watch: {
    statusPostAlbum(status) {
      this.reloadListAlbum(status)
    },
    statusPutAlbum(status) {
      this.reloadListAlbum(status)
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-album-detail {
  .btn-close-modal-detail {
    text-align: right;
    button {
      color: white;
      border: 2px solid white;
    }
  }
  .album-detail {
    display: flex;
    flex-direction: row;
    height: 490px;
    .album-detail__content-left {
      background-color: black;
      width: 60vw;
      height: auto;
      position: relative;
      .img-carousel {
      }
      .content-video {
        min-height: 470px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        video {
          max-width: 100%;
          max-height: 100%
        }
        button {
          position: absolute;
          height: 40px;
          bottom: 37px;
          left: 50%;
          transform: translate(-50%, 0px);
        }
      }
    }
    .album-detail__content-right {
      display: flex;
      width: 360px;
      p {
        margin-bottom: 8px;
      }
      .content__wrap {
        flex: 1;
        padding: 20px 20px 12px;
        position: relative;
        span {
          font-size: 13px;
        }
        .descreption {
          overflow-x: hidden;
          font-size: 16px;
          position: absolute;
          top: 80px;
          bottom: 140px;
          left: 20px;
          right: 20px;
        }
        .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          bottom: 12px;
          left: 20px;
          right: 20px;
          hr {
            width: 100%;
          }
          .edit {
            background-color: $color-navy-blue;
            color: white;
            margin-bottom: 20px;
            margin-top: 15px;
            height: 40px;
          }
          .download {
            border: 1px solid $color-navy-blue;
            color: $color-navy-blue;
            width: 100%;
            height: 40px;
          }
        }
      }
    }
    .loading-upload {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @include breakpoint-max($break-sp) {
    .album-detail {
      flex-direction: column;
      align-items: center;
      background-color: black;
      height: auto;
      .album-detail__content-left {
        width: 100%;
        .content-video {
          min-height: auto;
          align-items: flex-start;
          video {
            max-height: 300px
          }
          button {
            height: 60px;
            left: 40%;
            transform: translate(-32%, 0px);
          }
        }
      }
      .album-detail__content-right {
        width: 100%;
        background-color: white;
        display: initial;
      }
    }
  }
}
</style>

<style lang="scss">
.modal-album-detail {
  .v-dialog__container {
    .v-dialog__content {
      z-index: 1901 !important;
      .v-dialog {
        // position: absolute;
        box-shadow: none;
      }
    }
  }
  @include breakpoint-max($break-sp) {
    .v-dialog__container .v-dialog {
      width: 90% !important;
      height: 90%;
      max-height: 90% !important;
      overflow: hidden;
      margin-top: 0!important;
      .v-card {
        overflow-y: auto;
        height: auto;
        max-height: calc(100% - 48px);
      }
      .album-detail {
        .album-detail__content-right {
          height: 100%;
        }
      }
    }
  }
}
</style>
