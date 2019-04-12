<template>
  <v-dialog
    v-model="model"
    persistent
    no-click-animation
  >
    <v-card class="modal__container">
      <div class="modal__title">
        <img
          src="~/assets/icons/comment.svg"
          class="title__icon"
        />
        <span class="title__content header-3">コメント</span>
      </div>
      <form>
        <textarea
          class="edit-commnet-field text-standard "
          rows="6"
          :placeholder="placeholder"
          v-model="commentContentModel"
          :disabled="isDeleteComment"
        />
        <p v-if="isNewComment">このコメントの公開範囲を選択してください</p>
        <div class="type-selection" v-if="isNewComment">
          <div
            class="radios-btn"
            v-for="(type, index) in commentTypeList"
            :key="index"
          >
            <input type="radio" :id="type.id" :value="type.value" v-model="commentTypeValue">
            <label :for="type.id" class="text-standard">{{ type.label }}</label>
          </div>
        </div>
        <p class="warning-message warning-text text-standard" v-if="isDeleteComment">{{ warningMessage }}</p>
        <p
          v-if="isShowError"
          class="warning-message warning-text text-standard"
        >
          {{ errorMessage }}
        </p>
        <div class="btn-line">
          <button class="btn-blue btn-bottom submit-btn" @click.prevent="onSubmit" :disabled="isDisableSubmitBtn">
            <span class="text-standard" v-if="!isSubmitting">{{ submitBtnText }}</span>
            <v-progress-circular
              v-if="isSubmitting"
              indeterminate
              width="3"
              class="loading-icon"
            >
            </v-progress-circular>
          </button>
          <button class="btn-gray btn-bottom" @click.prevent="onClose">
            <span class="text-standard">{{ closeBtnText }}</span>
          </button>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      commentTypeValue: this.commentTypeDefault,
      commentContentModel: ""
    }
  },
  props: {
    commentType: {
      type: String,
      default: "NEW"
    },
    model: {
      type: Boolean,
      required: true
    },
    commentContent: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'こちらにコメントを入力してください'
    },
    onClickSubmitBtn: {
      type: Function,
      required: true
    },
    onClickCloseBtn: {
      type: Function,
      required: true
    },
    commentTypeList: Array,
    commentTypeDefault: String,
    warningMessage: {
      type: String,
      default:
        "このコメントを削除します。削除したコメントは戻せません。本当に削除してよろしいですか？"
    },
    isSubmitting: {
      type: Boolean
    },
    errorMessage: {
      type: String,
      default: ""
    }
  },
  computed: {
    submitBtnText() {
      if (this.isNewComment) {
        return 'コメントする'
      } else if (this.isEditComment) {
        return '編集完了'
      } else {
        return '削除する'
      }
    },
    closeBtnText() {
      return '閉じる'
    },
    isNewComment() {
      return this.commentType === 'NEW'
    },
    isDeleteComment() {
      return this.commentType === 'DELETE'
    },
    isEditComment() {
      return this.commentType === 'EDIT'
    },
    isDisableSubmitBtn() {
      if (this.isSubmitting) return true
      if (!this.isDeleteComment) {
        if (this.commentContentModel.trim() === "") return true
      }
      return false
    },
    isShowError() {
      return this.errorMessage !== ""
    }
  },
  methods: {
    onSubmit() {
      const data = {
        value: this.commentContentModel,
        type: this.commentTypeValue
      }
      this.onClickSubmitBtn(data)
    },
    onClose() {
      this.resetCommentData()
      this.onClickCloseBtn()
    },
    resetCommentData() {
      this.commentContentModel = ''
      this.commentTypeValue = this.commentTypeDefault
    },
  },
  watch: {
    model(data) {
      if (data) {
        this.commentContentModel = this.commentContent
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.modal__container {
  background-color: $color-main-background;
  border-radius: 4px;
  padding: 20px;
  width: 830px;
  .btn-line {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .btn-bottom {
      width: 190px;
      margin-left: 35px;
      margin-right: 35px;
    }
    .submit-btn:disabled {
      opacity: 0.6;
      &:hover {
        opacity: 1;
        cursor: default;
      }
    }
    .loading-icon {
      width: 20px !important;
      height: 20px !important;
    }
  }
  .modal__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
    .title__icon {
      width: 30px;
      height: 29px;
    }
    .title__content {
      padding-left: 5px;
    }
  }
  .edit-commnet-field {
    border: 1px solid $color-gray;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    background-color: $color-textarea;
    @include placeholder(#7a7979, 0.7)
  }
  .type-selection {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 8px;
    .radios-btn {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .warning-message {
    text-align: center;
    margin-bottom: 0;
    margin-top: 10px;
  }
  @include breakpoint-max($break-sp) {
    width: 95vw;
    border-radius: 1vw;
    padding: 3vw;
    .btn-line {
      clear: both;
      padding-top: 1vw;
      margin-left: -1vw;
      margin-right: -1vw;
      .btn-bottom {
        width: 44vw;
        margin-left: 1.5vw;
        margin-right: 1.5vw;
        height: 9.5vw;
      }
      .loading-icon {
        width: 5vw !important;
        height: 5vw !important;
      }
    }
    .modal__title {
      padding-bottom: 2vw;
      .title__icon {
        width: 6vw;
        height: 6vw;
      }
      .title__content {
        padding-left: 2vw;
      }
    }
    .edit-commnet-field {
      padding: 3vw;
      border-radius: 1vw;
      margin-bottom: 1vw;
    }
    .type-selection {
      display: inline-table;
      margin-top: 1.5vw;
      margin-bottom: 1.5vw;
      .radios-btn {
        float: left;
        width: 44vw;
        margin-left: 0px;
        margin-right: 0;
        padding-left: 5vw;
        margin-bottom: 2vw;
      }
    }
    .warning-message {
      margin-top: 0;
      margin-bottom: 3vw;
      text-align: left;
    }
  }
}
</style>
