<template lang="html">
    <v-dialog
      v-model="showDialog"
      persistent
      attach
      no-click-animation
      class="dialog-confirm-delete-album-container"
    >
      <v-card class="dialog-confirm-delete-album">
        <v-card-title class="text-large">
          このアルバムを削除します。<br/>
          ※アルバムに登録している全ての写真を削除します<br/>
          よろしいですか？
        </v-card-title>
        <v-card-actions class="confirm-delete-album">
          <button class="btn-blue confirm-delete-album__btn" @click="deleteAlbum">削除する</button>
          <button class="btn-gray confirm-delete-album__btn" @click="controlDialogDelete">閉じる</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    controlDialogDelete: {
      type: Function
    },
    dialogDeleteAlbum: {
      type: Boolean
    },
    idDeleteAlbum: {
      type: Number
    }
  },
  methods: {
    deleteAlbum() {
      this.$store.dispatch("album/deleteAlbum", this.idDeleteAlbum);
      this.showDialogDelete();
    },
    showDialogDelete() {
      this.controlDialogDelete();
    }
  },
  computed: {
    showDialog() {
      return this.dialogDeleteAlbum;
    }
  }
};
</script>

<style lang="scss">
.dialog-confirm-delete-album-container {
  @include breakpoint-max($break-sp) {
    min-width: 90vw;
  }
}

.dialog-confirm-delete-album {
  padding: 15px;
  .confirm-delete-album {
    justify-content: center;
    .confirm-delete-album__btn {
      width: 40%;
      &:first-of-type {
        margin-right: 10%;
      }
    }
  }
  @include breakpoint-max($break-sp) {
    max-width: 80vw;
    padding: 0;
    .confirm-delete-album {
      flex-wrap: wrap;
      .confirm-delete-album__btn {
        width: 45%;
        margin-bottom: 12px;
      }
    }
  }
  &.dialog-confirm-delete-album-detail {
    min-width: 380px;
    @include breakpoint-max($break-sp) {
      min-width: 74vw;
    }
  }
}
</style>
