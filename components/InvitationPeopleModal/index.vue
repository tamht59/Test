<template lang="html">
  <v-dialog
    v-model="invitationPeopleModalStatus"
    persistent
    no-click-animation
  >
    <div class="invitation-people-modal">
      <v-card v-if="!invitationSuccess && invitationPeopleModalStatus">
        <p class="header-3 header__title">
          招待したい相手の情報を入力し「送信」ボタンを押してください。相手先に招待メールをお送りします。
        </p>
        <div class="">
          <div class="input-filed">
            <label class="text-standard">招待したい相手の氏名</label>
            <input
              v-model="$v.form.name.$model"
              :class="status($v.form.name)"
              class="text-standard gn-modal-input-field"
           />
          </div>
          <div :class="activeClass($v.form.name.$error)" class="error-message">
            <span v-if="!$v.form.name.required">必ず入力してください。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">招待したい相手のメールアドレス</label>
            <input
              v-model="$v.form.mail.$model"
              :class="status($v.form.mail)"
              class="text-standard gn-modal-input-field"
           />
          </div>
          <div :class="activeClass($v.form.mail.$error)" class="error-message" >
            <span v-if="!$v.form.mail.required">必ず入力してください。</span>
            <span v-if="!$v.form.mail.email">有効なメールアドレスを入力して下さい。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">招待したい相手のメールアドレス（確認用にもう一度入力してください）</label>
            <input
              v-model="$v.form.confirmMail.$model"
              :class="status($v.form.confirmMail)"
              class="text-standard gn-modal-input-field"
           />
          </div>
          <div :class="activeClass($v.form.confirmMail.$error)" class="error-message">
            <span v-if="!$v.form.confirmMail.sameAsEmail">メールアドレスが一致しません。入力内容をご確認ください。</span>
          </div>
        </div>

        <div class="invited-status">
          <v-progress-circular
            v-show="invitationPeopleRequest"
            indeterminate
            color="light-blue"
          />
          <div v-if="invitationErrorMessage && !invitationPeopleRequest" class="text-standard">
            ※{{invitationErrorMessage}}
          </div>
        </div>

        <v-card-actions>
          <button class="btn-blue btn-bottom submit-btn" @click="onInvitation">招待申請</button>
          <button class="btn-gray btn-bottom" @click="openCloseInvitationPeopleModal">閉じる</button>
        </v-card-actions>

      </v-card>

      <v-card v-if="invitationSuccess" class="invitation-success">
        <p class="header-3 header__title">
          招待メールの送信が<br />
          完了しました。
        </p>
        <v-card-actions>
          <button class="btn-gray btn-bottom" @click="openCloseInvitationPeopleModal">閉じる</button>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      invitationPeopleModalStatus: false,
      invitationErrorMessage: null,
      invitationSuccess: false,
      form: {
        name: '',
        mail: '',
        confirmMail: ''
      }
    }
  },
  validations() {
    return {
      form: {
        name: {
          required
        },
        mail: {
          required,
          email
        },
        confirmMail: {
          sameAsEmail: sameAs('mail')
        },
      }
    }
  },
  computed: {
    nowRoomId() {
      if (this.$route.params.room_id) {
        return this.$route.params.room_id;
      } else {
        return this.roomData.id;
      }
    },
    ...mapGetters("room", {
      roomData: "roomData",
      invitationPeopleRequest: "getInvitationPeopleRequest"
    })
  },
  methods: {
    async onInvitation() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const data = {
          room_id: this.nowRoomId,
          name: this.form.name,
          mail: this.form.mail
        }
        const result = await this.$store.dispatch('room/postInvitationPeople', data)
        if (result === true) {
          this.invitationSuccess = true
        } else {
          this.invitationErrorMessage = result.message
        }
      }
    },
    clear() {
      this.$v.form.$reset()
      this.form.name = this.form.mail = this.form.confirmMail = ""
    },
    activeClass(value) {
      if (value) {
        return 'error-text'
      }
      return null
    },
    async openCloseInvitationPeopleModal() {
      this.invitationPeopleModalStatus = await !this.invitationPeopleModalStatus
      this.clear()
      this.invitationErrorMessage = null
      this.invitationSuccess = false
    },
    status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  border: 1px solid red!important;
  background-color: white!important;
}
.invitation-people-modal {
  .v-card {
    border-radius: 8px;
    padding: 20px 30px;
    text-align: center;
    width: 600px;
    .header__title {
      margin-bottom: 20px;
      color: $color-navy-blue;
    }
    .input-filed {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 5px;
      }
    }
    .error-message {
      opacity: 0;
      text-align: right;
      font-size: 12px;
      height: 20px;
      transition: 0.3s;
      span {
        color: red;
      }
      &.error-text {
        height: 30px!important;
        opacity: 1;
      }
    }
    .v-card__actions {
      display: flex;
      justify-content: space-around;
      button {
        width: 40%;
      }
    }
    .invited-status {
      color: red;
      font-weight: bold;
      >div {
        height: 2rem!important;
      }
    }
  }
  .invitation-success {
    width: auto!important;
    max-width: 90vw;
    padding: 2rem!important;
    .v-card__actions {
      button {
        width: auto;
      }
    }
  }
  @include breakpoint-max($break-sp) {
    .v-card {
      width: 90vw;
      padding: 1.5rem 1rem 1rem;
    }
  }
}
</style>
