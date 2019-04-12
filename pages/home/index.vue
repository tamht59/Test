<template>
  <v-app>
    <v-container class="home-container">
      <v-dialog
        v-model="welcomeModal"
        persistent
        max-width="830px"
        no-click-animation
      >
        <v-card class="modal-container welcome-modal">
          <div>
            <img
              src='~static/images/flower.jpg'
              alt='Person image'
              class="person-image"
            />
          </div>

          <div class="triangle">
            <div class="triangle-body"></div>
            <div class="triangle-border"></div>
          </div>
          <div class="welcome-message-container">
            <p class="title-large welcome-message">{{getWelcomeMessage()}}</p>
          </div>
        </v-card>
      </v-dialog>

      <CommentModal
        :commentType="modalCommentType"
        :model="commentModal"
        :commentContent="getCommentContent()"
        :onClickSubmitBtn="onClickSubmitComment"
        :onClickCloseBtn="onClickCloseCommentModal"
        :commentTypeList="getCommentTypeList()"
        commentTypeDefault="11"
      />

      <div>
        <button @click="onClickNewComment">
          LN7-3-1 - new comment
        </button>
      </div>
      <div>
        <button @click="onClickEditComment">
          LN7-3-1 - edit comment
        </button>
      </div>
    </v-container>
  </v-app>
</template>

<script>
const welcomeMessage = 'きてくれて、ありがとよ'
const commentContent = `こちらでは寒い日が続いていますが、僕は風邪もひかずにやってます。
おととしの今頃、大雪の日に酒を飲んだのが昨日のことのようです。
今年も雪が降ったら、一緒に雪見酒でもしたいね。`
const commentTypes = [
  { id: 1, label: "公開", value: '11' },
  { id: 2, label: "ログイン済のみ", value: '22' },
  { id: 3, label: "招待者のみ", value: '33' },
  { id: 4, label: "遺族にだけ公開", value: '44' }
]


import CommentModal from '~/components/CommentModal'

export default {
  components: {
    CommentModal
  },
  data () {
    return {
      welcomeModal: true,
      commentModal: false,
      modalCommentType: 'NEW',
      commentType: ''
    }
  },
  methods: {
    getWelcomeMessage() {
      return welcomeMessage
    },
    hideWelcomeModal() {
      this.welcomeModal = false
    },

    onClickEditComment() {
      this.commentModal = true
      this.modalCommentType = 'EDIT'
    },
    onClickNewComment() {
      this.commentModal = true
      this.modalCommentType = 'NEW'
    },
    onClickCloseCommentModal() {
      this.commentModal = false
    },
    onClickSubmitComment() {
      console.log('Submit comment!!')
    },
    getCommentContent() {
      return commentContent
    },
    getCommentTypeList() {
      return commentTypes
    }
  },
  mounted() {
    setTimeout(() => {
      this.hideWelcomeModal()
    },3000)
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  background-color: $color-main-background;
  border-radius: 4px;
}
.welcome-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
.person-image {
  width: 100%;
  height: auto;
}
.triangle {
  margin-bottom: -25px;
  margin-top: 15px;
  .triangle-body {
  border-right: 22px solid transparent;
  border-bottom: 25px solid $color-light-gray;
  border-left: 22px solid transparent;
  position: relative;
  z-index: 6;
  }
  .triangle-border {
    border-right: 23px solid transparent;
    border-bottom: 26px solid $color-gray;
    border-left: 23px solid transparent;
    margin-top: -28px;
    position: relative;
    z-index: 4;
  }
}
.welcome-message-container {
  width: 100%;
  margin-top: 20px;
  position: relative;
  z-index: 5;
}
.welcome-message {
  text-align: center;
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: $color-light-gray;
  border: 1px solid $color-gray;
  border-radius: 10px;
}
</style>
