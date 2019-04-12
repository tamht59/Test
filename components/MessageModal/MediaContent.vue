<template>
  <div class="media-content__container">
    <template v-if="!isLoading">
      <div
        v-if="messageHasVideo"
        class="content-media"
      >
        <video
          width="100%"
          height="100%"
          controls
          v-if="mediaSrc"
        >
          <source
            :src="mediaSrc"
            type="video/mp4"
          >
          <source
            :src="mediaSrc"
            type="video/ogg"
          >
          Your browser does not support the video tag.
        </video>
      </div>

      <div
        v-else
        class="content-media"
      >
        <div
          class="img-content"
          :style="{'background-image': 'url(' + mediaSrc + ')'}"
        />
        <button
          v-show="!edditing"
          class="icon-extend expand-btn"
          @click="onExpandBtn({ mediaSrc })"
        />
      </div>
    </template>
    <v-progress-circular
      v-else
      indeterminate
      width="3"
      color="#ffffff"
      class="loading-icon"
    />

    <v-dialog
      v-model="fullScreen"
      transition="dialog-bottom-transition"
    >
      <div class="img-fullScreen">
        <img :src="mediaSrc">
        <button class="btn-img-full--close">
          <v-icon
            dark
            @click="fullScreen=false"
          >close</v-icon>
        </button>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
import { MESSAGE_TYPE } from "~/utils/constants";

export default {
  props: {
    data: {
      type: Object
    },
    edditing: {
      type: Boolean
    },
    isLoading: {
      type: Boolean
    },
    onExpandBtn: {
      type: Function
    }
  },
  data() {
    return {
      fullScreen: false,
      carouselIndex: null,
      urlCurrentImgCarouse: null,
      dialogDeleteAlbum: false,
      idDeleteAlbumDetail: null
    };
  },
  computed: {
    messageHasVideo() {
      return (
        this.data.messageType == MESSAGE_TYPE.VIDEO ||
        this.data.messageType == MESSAGE_TYPE.VOICE
      );
    },
    mediaSrc() {
      if (this.data) {
        const { imageUrl, movieUrl } = this.data;
        if (this.messageHasVideo) {
          return movieUrl;
        }
        return imageUrl;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.media-content__container {
  width: 855px;
  height: 490px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-black;
  .content-media {
    position: relative;
    flex: 1;
    max-height: 100%;
    max-width: 100%;
    video {
      height: 100%;
    }
    .expand-btn {
      position: absolute;
      bottom: 10px;
      right: 12px;
      color: $color-white;
      font-size: 21px;
      font-weight: bold;
    }
    .img-content {
      height: 490px;
      background-size: auto 490px;
      background-position: center;
      background-color: $color-black;
    }
  }
}

@include breakpoint-max(1300px) {
  .media-content__container {
    width: 555px;
  }
}

@include breakpoint-max($break-sp) {
  .media-content__container {
    width: 92vw;
    height: calc(96vw * 490 / 855);
    .content-media {
      .img-content {
        height: calc(96vw * 490 / 855);
        background-size: auto calc(96vw * 490 / 855);
      }
      .expand-btn {
        display: none;
      }
    }
  }
}
</style>
