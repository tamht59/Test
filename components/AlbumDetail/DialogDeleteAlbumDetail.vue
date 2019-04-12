<template lang="html">
  <v-dialog
    persistent
    v-model="modalDeleteAlbumDetailSatus"
    no-click-animation
  >
    <v-card class="dialog-confirm-delete-album dialog-confirm-delete-album-detail">
      <v-card-title class="text-large">
        この写真を削除します。<br/>
        よろしいですか？
      </v-card-title>
      <v-card-actions class="confirm-delete-album">
        <button class="btn-blue confirm-delete-album__btn" @click="onDeleteAlbumDetail()">削除する</button>
        <button class="btn-gray confirm-delete-album__btn" @click="openCloseModalDeleteAlbumDetail">閉じる</button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    onClickClose: {
      type: Function
    }
  },
  data() {
    return {
      modalDeleteAlbumDetailSatus: false,
      idAlbumDetail: null,
      multiFlag: false
    }
  },
  computed: {
    ...mapGetters('album', {
      getDeleteAlbumDetailStatus: 'getDeleteAlbumDetailStatus'
    })
  },
  methods: {
    async onDeleteAlbumDetail() {
      await this.deleteAlbumDetail(this.idAlbumDetail)
      if (this.getDeleteAlbumDetailStatus === "success") {
        !this.multiFlag && this.onClickClose()
        this.openCloseModalDeleteAlbumDetail()
      }
    },
    openCloseModalDeleteAlbumDetail(detailId, isMultiFlag) {
      this.idAlbumDetail = detailId
      this.multiFlag = isMultiFlag || false
      this.modalDeleteAlbumDetailSatus = !this.modalDeleteAlbumDetailSatus
    },
    ...mapActions('album', {
      deleteAlbumDetail: 'deleteAlbumDetail'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
