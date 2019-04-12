<template>
  <div :keyCarousel="keyCarousel">
    <v-carousel
      v-model="carouselIndex"
      hide-delimiters
      :hide-controls="hideControls"
      :cycle="false"
      height="490px"
      class="img-carousel"
      :next-icon="disbleNextIcon"
      :prev-icon="disblePrevIcon"
    >
      <v-carousel-item
        v-for="item in data"
        :key="getKey(item)"
        :src="getSrc(item)"
      >
        <span
          v-show="!edditing"
          class="icon-extend text-standard button-img-fullscreen"
          dark
          @click="showDialogFullScreen()"
        />
        <button
          v-show="edditing && !upload"
          class="button-img-delete icon-delete btn-flat"
          @click="onClickDeleteAlbumDetail(item.detail_id)"
        >
          この写真を削除
        </button>
      </v-carousel-item>
    </v-carousel>
    <v-dialog v-model="fullScreen" content-class="full-screen">
      <button
        @click="fullScreen=false"
        class="full-screen__btn-close"
      >
        <span class="icon-delete"></span>
      </button>
      <div class="full-screen__img">
        <img :src="urlCurrentImgCarouse">
      </div>
    </v-dialog>

    <DialogDeleteAlbumDetail
      :onClickClose="onClickClose"
      ref="dialogDeleteAlbumDetail"
    />

  </div>
</template>

<script>
import DialogDeleteAlbumDetail from "./DialogDeleteAlbumDetail";
import _ from "lodash";
import { mapActions } from "vuex";

export default {
  components: {
    DialogDeleteAlbumDetail
  },
  props: {
    hideControls: {
      type: Boolean
    },
    data: {
      type: Array
    },
    edditing: {
      type: Boolean
    },
    setUrlCurrentImg: {
      type: Function
    },
    upload: {
      Boolean
    },
    onClickClose: {
      type: Function
    }
  },
  data() {
    return {
      fullScreen: false,
      carouselIndex: null,
      urlCurrentImgCarouse: null,
      keyCarousel: 0
    };
  },
  computed: {
    disblePrevIcon() {
      if (this.carouselIndex === 0) {
        return "";
      }
      return "$vuetify.icons.prev";
    },
    disbleNextIcon() {
      if (this.carouselIndex + 1 === this.data.length) {
        return "";
      }
      return "$vuetify.icons.next";
    }
  },
  methods: {
    getKey(item) {
      return item.detail_id;
    },
    getSrc(item) {
      return item.contents_url;
    },
    showDialogFullScreen() {
      this.fullScreen = true;
    },
    showDialogDeleteAlbumDetail(id) {
      this.idDeleteAlbumDetail = id;
      this.dialogDeleteAlbum = true;
    },
    async onClickDeleteAlbumDetail(detailId) {
      const multiFlag = this.data.length > 1 ? true : false;
      await this.$refs.dialogDeleteAlbumDetail.openCloseModalDeleteAlbumDetail(
        detailId,
        multiFlag
      );
      this.keyCarousel += 1;
    }
  },
  updated() {
    const url = _.get(this.data[this.carouselIndex], "contents_url");
    this.urlCurrentImgCarouse = url;
    this.setUrlCurrentImg(url);
  }
};
</script>

<style lang="scss" scoped>
.button-img-fullscreen {
  position: absolute;
  bottom: 10px;
  right: 12px;
  color: white;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
}
.button-img-delete {
  position: absolute;
  bottom: 10px;
  left: 50%;
  height: 40px !important;
  transform: translate(-50%, -10px);
  @include breakpoint-max($break-sp) {
    left: 25%;
    transform: translate(-3%, -10px);
    height: 56px !important;
  }
}
</style>

<style lang="scss" scoped>
.button-img-fullscreen {
  position: absolute;
  bottom: 10px;
  right: 12px;
  color: white;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
}
.button-img-delete {
  position: absolute;
  bottom: 10px;
  left: 50%;
  height: 40px !important;
  transform: translate(-50%, -10px);
  @include breakpoint-max($break-sp) {
    left: 25%;
    transform: translate(-3%, -10px);
    height: 56px !important;
  }
}
</style>

<style lang="scss">
.v-carousel .v-image .v-image__image {
  background-size: contain;
}

.img-carousel {
  @include breakpoint-max($break-sp) {
    height: 300px !important;
    .v-window__container {
      height: 300px !important;
      .v-window-item {
        .v-carousel__item {
          height: 300px !important;
        }
      }
    }
  }
}
</style>
