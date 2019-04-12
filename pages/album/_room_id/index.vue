<template lang="html">

  <v-layout>
    <div class="album">
      <div class="album__header">
        <p>アルバム</p>
        <div class="header__upload">
          <div class="btn-white">
            <label v-if="isShowUpload" for="upload-photo">
              <span class="icon-camera-bk"></span>
              写真投稿
            </label>

            <label v-if="!isShowUpload" @click="checkRolesToUpload">
              <span class="icon-camera-bk"></span>
              写真投稿
            </label>
            <input
              type="file"
              name="photo"
              multiple
              id="upload-photo"
              @change="onFileChange($event, imageType)"
            />
          </div>
          <div class="btn-white">
            <label v-if="isShowUpload" for="upload-video">
              <span class="icon-video"></span>
              動画投稿
            </label>
            <label v-if="!isShowUpload" @click="checkRolesToUpload">
              <span class="icon-video"></span>
              動画投稿
            </label>
            <input
              type="file"
              name="video"
              id="upload-video"
              @change="onFileChange($event, videoType)"
            />
          </div>
        </div>
      </div>

      <div class="album__content">
        <div
          v-if="!checkNullListAlbum"
          v-for="itemAlbum in listAlbumResult"
          :key="itemAlbum.albumId"
          class="img-album"
        >
          <div class="content-img" @click.self="loadDataAlbumDetail(itemAlbum.albumId)">
              <img
                :src="itemAlbum.thumbnailImage || ''"
                alt=""
                @click.self="loadDataAlbumDetail(itemAlbum.albumId)"
              >
              <div
                v-if="itemAlbum.albumType == '2'"
                class="content-img__play-video"
                @click="loadDataAlbumDetail(itemAlbum.albumId)"
              >
                <span class="icon-play-circle" />
              </div>

              <div v-if="itemAlbum.selfFlag == '1'" class="dropdown-menu-edit">
                <v-menu offset-y nudge-bottom="20" nudge-left="68" attach open-on-hover>
                  <span slot="activator" class="icon-edit dropdown-menu-edit__button"></span>
                  <div class="dropdown-menu-edit__content">

                    <p class="text-standard" @click="loadDataAlbumDetail(itemAlbum.albumId, 'isEdit')">編集する</p>

                    <p class="text-standard" @click="setIdAlbumDelete(itemAlbum.albumId)">削除する</p>

                  </div>
                </v-menu>
              </div>

              <div v-show="itemAlbum.multiFlag" class="multiple-img">
                <span class="icon-multi"></span>
              </div>
            </div>

          <div class="title-img-album">
            <p class="text-standard">{{itemAlbum.title}}</p>
            <p class="text-standard">{{itemAlbum.userName}}</p>
          </div>
        </div>
      </div>
      <div v-if="checkNullListAlbum" class="album__empty-content">
        <div class="header-2">
           {{ errorLoadListAlbumText }}
        </div>
      </div>

      <div class="text-xs-center">
        <v-progress-circular
          v-show="this.requestlistAlbum"
          :size="50"
          color="light-blue"
          indeterminate
        ></v-progress-circular>
      </div>

      <AlbumDetail
        v-if="showAlbumDetail"
        :room_id="room_id"
        :urlDataUpload="urlDataUpload"
        :uploadType="uploadType"
        :isUploading="isUploading"
        :idAlbumDetail="idAlbumDetail"
        :showAlbumDetail="showAlbumDetail"
        :onCloseDialog="onCloseDialog"
        :closeUpload="closeUpload"
        :setNullIdAlbumDetail="setNullIdAlbumDetail"
        :albumDetailResult="albumDetailResult"
        :isEditing="isEditing"
        :formDataUpload="formDataUpload"
        :onFileChange="onFileChange"
        :keyOfCarousel="keyOfCarousel"
      />

      <DialogDeleteAlbum :controlDialogDelete="controlDialogDelete" :dialogDeleteAlbum="dialogDeleteAlbum" :idDeleteAlbum="idDeleteAlbum"/>


    <!-- notification check validate upload -->
      <v-dialog v-model="showNotification" persistent max-width="550" attach no-click-animation>
          <v-card>
            <v-card-text class="text-standard">
              {{notification}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="showNotification = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <LoginModal
          :model="loginModal"
          :onClose="onCloseLoginModal"
          :onLogin="userLogin"
          :userData="userLoginData"
          :message="loginModalMessage"
        />
        <RequestInviteModal
          :model="requestInviteModal"
          :onClose="onCloseRequestInviteModal"
        />
        <WaitForApproveModal
          :model="waitForApprovePopup"
          :onClose="hideWaitForApprovePopup"
        >
          <p class="header-3" slot="top">
            {{ waitForApprovePopupContent }}
          </p>
        </WaitForApproveModal>
    </div>
  </v-layout>

</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import AlbumDetail from "@/components/AlbumDetail";
import DialogDeleteAlbum from "@/components/AlbumDetail/DialogDeleteAlbum";
import { ALBUM_TYPE } from "~/utils/constants";
import RequestInviteModal from "~/components/GeneralModal/RequestInvite";
import WaitForApproveModal from "~/components/GeneralModal";
import { checkLogin } from "~/utils/helper";
import LoginModal from "~/components/LoginModal";
import { ALERT_WAIT_FOR_APROVE, ALERT_REQUEST_LOGIN } from "~/utils/constants"

export default {
  components: {
    AlbumDetail,
    DialogDeleteAlbum,
    LoginModal,
    RequestInviteModal,
    WaitForApproveModal
  },
  data() {
    return {
      room_id: this.$route.params.room_id,
      urlDataUpload: [],
      uploadType: "",
      isUploading: false,
      dialogDeleteAlbum: false,
      showAlbumDetail: false,
      idDeleteAlbum: null,
      showNotification: false,
      notification: "",
      idAlbumDetail: null,
      isEditing: false,
      formDataUpload: [],
      keyOfCarousel: 0,
      isShowUpload: false,
      loginModal: false,
      loginModalMessage: "",
      requestInviteModal: false,
      waitForApprovePopup: false,
      waitForApprovePopupContent: "",
      errorLoadListAlbumText: null
    };
  },
  computed: {
    videoType() {
      return ALBUM_TYPE.VIDEO;
    },
    imageType() {
      return ALBUM_TYPE.IMAGE;
    },
    checkNullListAlbum() {
      if (this.statuslistAlbum === "fail") {
        this.errorLoadListAlbumText = this.listAlbum.error.message;
        return true;
      }
      return false;
    },

    ...mapGetters("album", {
      albumDetailResult: "albumDetailResult",
      listAlbumResult: "listAlbumResult",
      statuslistAlbum: "statuslistAlbum",
      requestlistAlbum: "requestlistAlbum"
    }),
    ...mapState("album", {
      listAlbum: state => state.listAlbum
    }),
    ...mapGetters("room", {
      roles: "getRolesResult",
      roomData: "roomData"
    }),
    ...mapGetters("user", {
      userLoginData: "loginData"
    })
  },
  methods: {
    checkRolesToUpload(e, type) {
      const isLogin = checkLogin(this.$store);
      const { albumPost } = this.roles || {};
      const { invitations } = this.roomData || {};
      if (albumPost !== "1") {
        if (!isLogin) {
          this.onOpenLoginModal("albumPost");
          return;
        }
        if (invitations == 0) {
          this.requestInviteModal = true;
          return;
        }
        if (invitations == 1) {
          this.showWaitForApprovePopup('albumPost')
          return;
        }
      }
    },
    onFileChange(e, type) {
      let files = e.target.files || e.dataTransfer.files;
      this.uploadType = type;
      let validateUploadFile = true;
      if (type === this.imageType) {
        const data = Object.values(files).map((file, key) => {
          if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            this.notification =
              "拡張子は「jpg」「jpeg」「png」が使用可能です。";
            this.showNotification = true;
            e.target.value = null;
            validateUploadFile = false;
            return;
          }
          if (file.size > 1048576) {
            this.notification = "ファイルサイズは『1MB』までです";
            this.showNotification = true;
            e.target.value = null;
            validateUploadFile = false;
            return;
          }
        });
        if (validateUploadFile) {
          this.createImage([...files]);
          this.formDataUpload = [...files];
        } else {
          return;
        }
      } else {
        if (!files[0].name.match(/\.(mp4|mov)$/)) {
          this.notification = "拡張子は「mp4」「mov」が使用可能です。";
          this.showNotification = true;
          e.target.value = null;
          validateUploadFile = false;
          return;
        }
        if (files[0].size > 104857600) {
          this.notification = "ファイルサイズは『100MB』までです。";
          this.showNotification = true;
          e.target.value = null;
          validateUploadFile = false;
          return;
        }
        if (validateUploadFile) {
          this.createImage([...files]);
          this.formDataUpload = [...files];
        }
      }
      this.keyOfCarousel += 1;
      this.showAlbumDetail = true;
      this.isUploading = true;
      e.target.value = null;
    },
    createImage(files) {
      let upload = [];
      for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        let file = files[i];
        reader.onload = e => {
          upload.push(e.target.result);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
      this.urlDataUpload = upload;
    },
    setIdAlbumDelete(id) {
      (this.idDeleteAlbum = id), (this.dialogDeleteAlbum = true);
    },
    scroll() {
      if (!this.requestlistAlbum) {
        let bottomOfWindow =
        document.body.scrollTop + window.innerHeight >
        document.body.scrollHeight - 100;
        if (bottomOfWindow && this.listAlbum.result.nextPage !== null) {
          const roomId = this.room_id;
          this.getListAlbum({ roomId, page: this.listAlbum.result.nextPage });
        }
      }
    },
    onCloseDialog() {
      this.showAlbumDetail = false;
      this.formDataUpload = [];
      this.isEditing = false;
    },
    controlDialogDelete() {
      this.dialogDeleteAlbum = !this.dialogDeleteAlbum;
    },
    loadDataAlbumDetail(id, edit) {
      this.showAlbumDetail = true;
      this.idAlbumDetail = id;
      if (edit) {
        this.isEditing = true;
      }
      this.getAlbumDetail(id);
    },
    closeUpload() {
      this.urlDataUpload = [];
      this.isUploading = false;
    },
    setNullIdAlbumDetail() {
      this.idAlbumDetail = null;
    },
    onCloseLoginModal() {
      this.loginModal = false;
    },
    openLoginModal(type) {
      this.loginModalMessage = ""
      if (type) {
        this.loginModalMessage = ALERT_REQUEST_LOGIN[type]
      }
      this.loginModal = true;
    },
    onCloseRequestInviteModal() {
      this.requestInviteModal = false;
    },
    onOpenRequestInviteModal() {
      this.requestInviteModal = true;
    },
    showWaitForApprovePopup(type) {
      this.waitForApprovePopupContent = ALERT_WAIT_FOR_APROVE[type]
      this.waitForApprovePopup = true;
    },
    hideWaitForApprovePopup() {
      this.waitForApprovePopup = false;
    },
    userLogin() {
      return this.userLogin;
    },
    setUpload() {
      const { albumPost } = this.roles || {};
      const { invitations } = this.roomData || {};

      if (albumPost == "0") {
        if (invitations === 2) {
          this.isShowUpload = true
        }
      }
      if (albumPost == "1") {
        this.isShowUpload = true
      }
    },
    ...mapActions("album", {
      getListAlbum: "getListAlbum",
      getAlbumDetail: "getAlbumDetail"
    }),
    ...mapActions("room", {
      getRoomData: "getRoomData",
      getRoles: "getRoles"
    }),
    ...mapActions("user", {
      userLogin: "login"
    })
  },
  watch: {
    showAlbumDetail(value) {
      if (value == false) {
        this.$store.commit("album/clearDataAlbumDetail");
      }
    },
    userLoginData(data, oldData) {
      if (data.status !== oldData.status && data.status === "success") {
        this.getRoomData({
          room_id: this.room_id
        });
        this.getRoles("1");
      }
    },
    roles() {
      this.setUpload()
    },
    roomData() {
      this.setUpload()
    }
  },
  mounted() {
    document.body.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    document.body.removeEventListener('scroll', this.scroll);
  },
  beforeMount() {
    //ルームデータ取得APIを叩く
    this.getRoomData({
      room_id: this.room_id
    });
    this.getRoles("1");
    const page = this.listAlbum.result.nextPage;
    const roomId = this.room_id;
    this.getListAlbum({ roomId, page });
  }
};
</script>

<style lang="scss" scoped>
.album {
  width: 830px;
  margin: 40px auto;
  .album__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $color-gray;
    align-items: center;
    padding-bottom: 5px;
    p {
      font-size: 30px;
      line-height: 40px;
      margin-bottom: 0;
      color: $color-navy-blue;
    }
    .header__upload {
      display: flex;
      flex-direction: row;
      .btn-white {
        padding: 0;
        label {
          padding: 0 30px;
          width: 100%;
          cursor: pointer;
          color: $color-navy-blue;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-right: 1rem;
            margin-top: .1rem;
          }
          &:hover {
            color: white;
          }
        }
        input {
          display: none;
        }
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  .album__content {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .img-album {
      width: 200px;
      &:not(:nth-of-type(4n)) {
        margin-right: 10px;
      }
      &:not(:nth-of-type(-n + 4)) {
        margin-top: 25px;
      }
      .title-img-album {
        text-align: center;
        margin: 5px 0 0;
        p {
          margin-bottom: 0px;
          line-height: 1.3;
        }
      }
      .content-img {
        position: relative;
        width: 200px;
        height: 200px;
        overflow: hidden;
        background-color: black;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          display: block;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
        .content-img__play-video {
          position: absolute;
          color: white;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          span {
            font-size: 74px;
          }
        }
        .dropdown-menu-edit {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          >div {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
          }
          .dropdown-menu-edit__button {
            background-color: white;
            border-radius: 6px;
            padding: 5px;
            font-size: 16px;
            color: $color-navy-blue;
            font-weight: bold;
          }
          .v-menu__content {
            position: static;
            &:before {
              content: '';
              position: absolute;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 8px solid white;
              top: 2px;
              right: 8px;
              z-index: 3;
            }
            .dropdown-menu-edit__content {
              background-color: white;
              height: 100%;
              margin-top: 10px;
              border-radius: 4px;
              p {
                padding: 4px 14px;
                margin-bottom: 0;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                  background-color: $color-light-gray;
                }
              }
            }
          }
        }
        .multiple-img {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 2;
          span {
            color: white;
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
  }
  .album__empty-content {
    width: 100%;
    text-align: center;
  }
  @include breakpoint-max($break-sp) {
    width: 100%;
    padding: 0 2.6vw;
    .album__header {
      flex-direction: column;
      border-bottom: none;
      p {
        width: 100%;
        border-bottom: 1px solid $color-gray;
        margin-bottom: 16px;
      }
      .header__upload {
        width: 100%;
        justify-content: space-evenly;
        .btn-white {
          width: 45%;
          label {
            padding: 0 1rem;
            span {
              margin-top: .2rem;
            }
          }
          &:first-child {
            margin-right: 0;
          }
        }
      }
    }
    .album__content {
      margin-top: 5vw;
      .img-album {
        width: 30.25vw;
        &:not(:nth-of-type(4n)) {
          margin-right: 0;
        }
        &:not(:nth-of-type(-n + 4)) {
          margin-top: 0;
        }
        &:not(:nth-of-type(3n)) {
          margin-right: 0.9vw;
        }
        &:not(:nth-of-type(-n + 3)) {
          margin-top: 3.4vw;
        }
        .content-img {
          width: 30.25vw;
          height: 30.25vw;
        }
      }
    }
  }
  @include breakpoint-max(767px) {
    .album__content {
      justify-content: space-between;
      .img-album {
        &:not(:nth-of-type(3n)) {
          margin-right: 0;
        }
        &:not(:nth-of-type(-n + 2)) {
          margin-top: 3.4vw;
        }
        .content-img {
          width: 44vw;
          height: 44vw;
        }
      }
    }
  }
}
</style>
