<template>
  <v-app>
    <v-layout
      column
      align-center
      class="bg-light-gray"
    >
      <TopMainScreen
        :main_img_status="main_img_status"
        @main_img_change="main_img_toggle"
        :openLoginModal="openLoginModal"
        :onOpenRequestInvitePopup="onOpenRequestInviteModal"
        :showWaitForApprovePopup="showWaitForApprovePopup"
      />
      <div class="main-menu">
        <div class="dialog__wrap">
          <WelcomeModal ref="welcomeModal" />
        </div>
        <FlowerDedicationModal
          :roomId="room_id"
          :userLoginData="userLoginData"
          ref="flowerDedicationModal"
        />
        <ul class="main-menu__list">
          <li class="main-menu__item">
            <button
              type="button"
              class="btn-blue"
              @click="welcomeModalOpen()"
            >
              <span class="icon-pray"></span>
              お参り</button>
          </li>
          <li class="main-menu__item">
            <button
              type="button"
              class="btn-blue"
              @click="openFlowerDedicationModal()"
            >
              <span class="icon-flower"></span>
              供花・供物</button>
          </li>
          <li class="main-menu__item">
            <button
              type="button"
              class="btn-blue"
              @click="onClickNewComment()"
            >
              <span class="icon-comment"></span>
              コメント</button>
          </li>
        </ul>
      </div>

      <ActionTimeline
        @timeline_onClickEditComment="onClickEditComment"
        @timeline_onClickDeleteComment="onClickDeleteComment"
      ></ActionTimeline>
      <CommentModal
        :commentType="modalCommentType"
        :model="commentModal"
        :commentContent="commentContent"
        :onClickSubmitBtn="onClickSubmitComment"
        :onClickCloseBtn="onClickCloseCommentModal"
        :commentTypeList="getCommentTypeList()"
        commentTypeDefault="0"
        :isSubmitting="isSubmitComment"
        :errorMessage="commentErrorMessage"
      />
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
    </v-layout>
  </v-app>
</template>

<script>
const commentTypesData = [
  { id: 1, label: "全員に公開", value: "0" },
  { id: 2, label: "ログイン済のみ", value: "1" },
  { id: 3, label: "招待者のみ", value: "2" },
  { id: 4, label: "親族・管理者のみに公開", value: "3" }
];

import { mapActions, mapGetters } from "vuex";
import TopMainScreen from "~/components/TopMainScreen";
import ActionTimeline from "~/components/ActionTimeline";
import WelcomeModal from "~/components/WelcomeModal";
import CommentModal from "~/components/CommentModal";
import FlowerDedicationModal from "~/components/FlowerDedicationModal";
import LoginModal from "~/components/LoginModal";
import RequestInviteModal from "~/components/GeneralModal/RequestInvite";
import WaitForApproveModal from "~/components/GeneralModal";
import { checkLogin } from "~/utils/helper";
import { ALERT_WAIT_FOR_APROVE, ALERT_REQUEST_LOGIN } from "~/utils/constants"

export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.room_id);
  },
  components: {
    TopMainScreen,
    ActionTimeline,
    WelcomeModal,
    CommentModal,
    FlowerDedicationModal,
    LoginModal,
    RequestInviteModal,
    WaitForApproveModal,
  },
  data: function() {
    return {
      room_id: this.$route.params.room_id,
      main_img_status: "primary",
      modalCommentType: "NEW",
      commentModal: false,
      commentContent: "",
      isSubmitComment: false,
      commentErrorMessage: "",
      loginModal: false,
      loginModalMessage: "",
      requestInviteModal: false,
      waitForApprovePopup: false,
      waitForApprovePopupContent: ""
    };
  },
  computed: {
    ...mapGetters("room", {
      postCommentData: "postCommentData",
      updateCommentData: "updateCommentData",
      deleteCommentData: "deleteCommentData",
      getCommentData: "getCommentData",
      roles: "getRolesResult",
      roomData: "roomData"
    }),
    ...mapGetters("user", {
      userLoginData: "loginData"
    })
  },

  methods: {
    welcomeModalOpen() {
      this.$refs.welcomeModal.openWelcomeModal();
      let login_user_id = "";
      if (this.userLoginData.result) {
        login_user_id = this.userLoginData.result.userId;
      }
      const prayData = {
        user_id: login_user_id,
        room_id: this.room_id,
        action_kbn: 5
      };

      this.$store.dispatch("room/postPray", prayData);
    },
    async onClickSubmitComment(data) {
      const { value, type } = data;
      const idMyComment = this.getCommentData && this.getCommentData.id;

      if (this.modalCommentType === "NEW") {
        await this.postComment({
          roomId: this.room_id,
          roomComment: value,
          displayFlag: type
        });
      }

      if (this.modalCommentType === "EDIT") {
        await this.updateComment({
          id: idMyComment,
          roomId: this.room_id,
          roomComment: value,
          displayFlag: "0"
        });
      }
      if (this.modalCommentType === "DELETE") {
        await this.deleteComment({
          id: idMyComment,
          roomId: this.room_id
        });
      }
      // this.getTimeline({ roomID: 1 });
    },
    onClickCloseCommentModal() {
      this.commentErrorMessage = "";
      this.commentModal = false;
    },
    getCommentTypeList() {
      return commentTypesData;
    },
    onClickNewComment() {
      const { comment } = this.roles || {};
      const isLogin = checkLogin(this.$store);
      if (comment != 1) {
        if (!isLogin) {
          this.openLoginModal("comment");
          return;
        }
        const { invitations } = this.roomData || {};
        if (invitations == 0) {
          this.requestInviteModal = true;
          return;
        } else if (invitations == 1) {
          this.showWaitForApprovePopup('comment')
          return;
        }
      } else {
        this.commentContent = "";
        this.commentModal = true;
        this.modalCommentType = "NEW";
      }
    },
    async onClickEditComment(value) {
      await this.getComment({ id: value });
      this.commentContent = this.getCommentData.roomComment;
      this.commentModal = true;
      this.modalCommentType = "EDIT";
    },
    async onClickDeleteComment(value) {
      await this.getComment({ id: value });
      this.commentContent = this.getCommentData.roomComment;
      this.commentModal = true;
      this.modalCommentType = "DELETE";
    },
    main_img_toggle: function() {
      if (this.main_img_status == "primary") {
        this.main_img_status = "secondary";
      } else {
        this.main_img_status = "primary";
      }
    },
    watcherComment(data, oldData) {
      const requesting = data.requesting;
      const oRequesting = oldData.requesting;

      if (requesting !== oRequesting) {
        this.isSubmitComment = requesting;
        if (!requesting) {
          if (data.status === "success") {
            this.commentModal = false;
            this.commentErrorMessage = "";
          }
          if (data.status === "fail") {
            this.commentErrorMessage = data.error.message || data.error;
          }
        }
      }
    },
    openFlowerDedicationModal() {
      const isLogin = checkLogin(this.$store);
      const { flower } = this.roles || {};
      const { invitations } = this.roomData || {};
      if (flower !== "1") {
        if (!isLogin) {
          this.openLoginModal("flower");
          return null;
        }
        if (invitations === 0) {
          this.requestInviteModal = true;
          return null;
        }
        if (invitations === 1) {
          this.showWaitForApprovePopup('flower')
          return null;
        }
      }
      this.$refs.flowerDedicationModal.openCloseFlowerDedicationModal();
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
    userLogin() {
      return this.userLogin;
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

    onInvitations() {
      // const roomId = 1
      // this.invitations({ roomID })
      console.log("coming soon");
    },

    ...mapActions("room", {
      postComment: "postComment",
      getComment: "getComment",
      updateComment: "updateComment",
      deleteComment: "deleteComment",
      getTimeline: "getTimeline",
      getRoles: "getRoles"
    }),
    ...mapActions("user", {
      userLogin: "login"
    }),

    //メッセージAPIを叩く
    updateMessage: function() {
      this.$store.dispatch("message/getMessageUnread", {
        roomID: this.room_id
      });
    }
  },
  watch: {
    postCommentData(data, oldData) {
      if (this.modalCommentType === "NEW" && this.commentModal) {
        this.watcherComment(data, oldData);
      }
    },
    updateCommentData(data, oldData) {
      if (this.modalCommentType === "EDIT" && this.commentModal) {
        this.watcherComment(data, oldData);
      }
    },
    deleteCommentData(data, oldData) {
      if (this.modalCommentType === "DELETE" && this.commentModal) {
        this.watcherComment(data, oldData);
      }
    },
    userLoginData(data, oldData) {
      if (data.status !== oldData.status && data.status === "success") {
        this.$router.go();
      }
    }
  },
  beforeMount() {
    //ルームデータ取得APIを叩く
    this.$store.dispatch("room/getRoomData", {
      room_id: this.room_id
    });

    if (checkLogin(this.$store)) {
      this.getRoles("1");
    }
  },
  mounted() {
    //メッセージAPIを叩く
    this.updateMessage();

    //メッセージAPIを定期的に叩かせる
    window.addEventListener("popstate", this.updateMessage, false);
    this.updateMessageTimer = setInterval(this.updateMessage, 60000);
  },
  destroyed: function() {
    //メッセージAPIを定期的に叩くのをやめさせる
    window.removeEventListener("popstate", this.updateMessage, false);
    clearInterval(this.updateMessageTimer);
  }
};
</script>

<style lang="scss" scoped>
.main-menu {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  margin-bottom: 31px;
  padding: 16px 0;
  background: $color-white;
  @include box-shadow(0px, 3px, 6px, rgba(0, 0, 0, 0.2));
  &-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  &__item {
    display: inline-block;
    &:not(:last-of-type) {
      margin-right: 45px;
    }
  }

  @include breakpoint-max(1025px) {
    height: (80 / 375) * 100vw;
    margin-bottom: (10 / 375) * 100vw;
    padding: (14 / 375) * 100vw 0;
    @include box-shadow(0px, 0.53vw, 0.53vw, rgba(0, 0, 0, 0.2));
    &__item {
      &:not(:last-of-type) {
        margin-right: (7 / 375) * 100vw;
      }
      .btn-blue {
        flex-direction: column;
        height: (50 / 375) * 100vw;
      }
    }
    .dialog__wrap .v-dialog__content {
      align-items: flex-start;
    }
  }
}
</style>

<style lang="scss">
@include breakpoint-max(1025px) {
  .main-menu .dialog__wrap .v-dialog__content {
    align-items: flex-start;
  }
}
</style>
