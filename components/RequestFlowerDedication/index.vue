<template lang="html">
  <v-dialog v-model="RequestFDModalStatus" attach class="request-flower-dedication-modal">
    <!-- Not request -->
    <v-card v-if="isRequest === 0">
      <v-card-text class="text-standard">
        ご利用には、親族・管理者からの招待が必要です。<br />
        「招待申請」ボタンを押すと親族・管理者に申請できます。
      </v-card-text>
      <v-card-actions>
        <button class="btn-blue btn-bottom submit-btn" @click="requestFlowerDedication">招待申請</button>
        <button class="btn-gray btn-bottom" @click="openCloseRequestFDModal">閉じる</button>
      </v-card-actions>
      <v-card-text class="text-standard v-card__text-2">
        申請を親族・管理者が承認した場合、招待メールが送られますので、それまでお待ちください。
      </v-card-text>
    </v-card>

    <!-- Request pending -->
    <v-card v-if="isRequest === 1">
      <v-card-text class="text-standard">
        供花を行うには招待申請の承認が必要です
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <button class="btn-gray btn-bottom" @click="openCloseRequestFDModal">閉じる</button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    onInvitations: {
      type: Function
    }
  },
  data() {
    return {
        RequestFDModalStatus: false,
        isRequest: null
    }
  },
  methods: {
    openCloseRequestFDModal(isRequest) {
      this.isRequest = isRequest
      this.RequestFDModalStatus = !this.RequestFDModalStatus
    },
    requestFlowerDedication() {
      this.onInvitations()
      this.RequestFDModalStatus = !this.RequestFDModalStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.request-flower-dedication-modal {
  .v-card {
    max-width: 85vw;
    padding: 2rem;
    text-align: center;
    .v-card__text {
      padding: 0 0 2rem;
    }
    .v-card__text-2 {
      padding: 2rem 0 0;
    }
    .v-card__actions {
      padding: 0;
      justify-content: space-evenly;
      button {
        width: 42%;
      }
    }
  }
  @include breakpoint-min($break-sp) {
    .v-card {
      .v-card__actions {
        button {
          max-width: 180px;
        }
      }
    }
  }
}
</style>
