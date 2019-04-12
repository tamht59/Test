<template>
  <v-dialog
    v-model="FlowerDedicationModalStatus"
    no-click-animation
    persistent
    attach
    :fullscreen="true"
    class="FlowerDedicationModal__wrap"
  >
    <v-card class="flower-dedication-modal">
      <div class="flower-dedication__container">
        <div
          class="header-container"
          :style="{ 'background-image': 'url(' + getHeaderBgSrc + ')' }"
        >
          <div class="shadow-wrap">
            <div class="header-avatar-wrap">
              <div
                class="header-avatar"
                :style="portraitImage"
              />
            </div>
          </div>
          <div class="header-label__container">
            <p class="header-3">生津 洋平</p>
            <div class="label-wrap">
              <span class="icon-compass label-header__icon"></span>
              <p class="text-standard">お参りする方角 南南西</p>
            </div>
          </div>
        </div>
        <div class="main-content">
          <div class="main-content__container">
            <FlowerSelection
              :items="getListItem()"
              :checkedItemId="checkedItemId"
              :onCheckItem="onCheckFlower"
              :onClickNextItems="onClickNextItems"
              :onClickPreItems="onClickPreItems"
              :disablePreItemBtn="disablePreItemBtn"
              :disableNextItemBtn="disableNextItemBtn"
              :isEnableConfirmBtn="isEnableConfirmBtn"
              :onPurchaseItem="onPurchaseItem"
              :onClose="openCloseFlowerDedicationModal"
              :isLoadingListItems="isLoadingListItems"
              :isEmptyListItems="isEmptyListItems"
              :onPutBgItem="onPutBgItem"
              :setBgImgData="setBgImgData"
              :getPostItemBuyData="getPostItemBuyData"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FlowerSelection from "./FlowerSelection";
import _ from "lodash";
import moment from "moment";
const defaultSrc = "/images/main/main_img/main_bg_secondary_sample.jpg";
export default {
  props: {
    roomId: {
      type: String
    },
    userLoginData: {
      type: Object
    }
  },
  data() {
    return {
      numberOfItem: 3,
      currentItemPage: 0,
      checkedItemId: "",
      isEmptyListItems: false,
      FlowerDedicationModalStatus: false
    };
  },
  components: {
    FlowerSelection
  },
  computed: {
    itemList() {
      return this.flowerItems.result || [];
    },
    disablePreItemBtn() {
      if (this.currentItemPage > 0) {
        return false;
      }
      return true;
    },
    disableNextItemBtn() {
      const leng = this.flowerItems.result && this.flowerItems.result.length;
      if (leng <= 0) return true;
      const numberOfPageItem = Math.floor(leng / this.numberOfItem);
      if (
        this.currentItemPage > numberOfPageItem - 1 &&
        leng % this.numberOfItem !== 0
      ) {
        return true;
      }
      return false;
    },
    getHeaderBgSrc() {
      let src = defaultSrc || "";
      if (this.isEnableConfirmBtn)
        src = _.chain(this.flowerItems.result)
          .find(item => item.itemId == this.checkedItemId)
          .get("itemImagePath")
          .value();
      return src;
    },
    isEnableConfirmBtn() {
      if (this.checkedItemId && this.checkedItemId !== "") return true;
      return false;
    },
    isLoadingListItems() {
      return this.flowerItems.requesting;
    },
    portraitImage() {
      const { deceasedImage } = this.roomData
      if (deceasedImage) {
        return 'background-image: url(' + deceasedImage + ')'
      }
      return null
    },
    ...mapGetters("room", {
      flowerItems: "flowerItemsData",
      setBgImgData: "setBgImgData",
      getPostItemBuyData: "getPostItemBuyData",
      roomData: "roomData"
    })
  },
  methods: {
    getListItem() {
      if (_.isEmpty(this.flowerItems.result)) return [];
      return this.flowerItems.result;
    },
    onClickNextItems() {
      return (this.currentItemPage = this.currentItemPage + 1);
    },
    onClickPreItems() {
      return (this.currentItemPage = this.currentItemPage - 1);
    },
    onCheckFlower(itemId = "") {
      this.checkedItemId = itemId;
    },
    getCheckedItem() {
      return _.find(this.flowerItems.result, { itemId: this.checkedItemId });
    },
    openCloseFlowerDedicationModal() {
      this.FlowerDedicationModalStatus = !this.FlowerDedicationModalStatus;
    },
    async onPutBgItem() {
      const checkedItem = this.getCheckedItem();

      const data = {
        roomId: this.roomId,
        urlImg: {
          bgImage: checkedItem.itemImagePath
        }
      };
      await this.setBgImg(data);
    },
    async onPurchaseItem() {
      const checkedItem = this.getCheckedItem();
      const validityPeriod = moment()
        .add(7, "d")
        .format("YYYY-MM-DD h:mm:ss");
      const data = {
        roomId: this.roomId,
        itemId: checkedItem.itemId,
        price: checkedItem.price,
        validityPeriod,
        payMethod: "1",
        userId: this.userLoginData.result.userId
      };
      await this.postItemBuy(data);
    },
    ...mapActions("room", {
      getFlowerItems: "getFlowerItems",
      setBgImg: "setBgImg",
      postItemBuy: "postItemBuy"
    })
  },
  mounted() {
    this.getFlowerItems({ room_id: this.roomId });
  },
  watch: {
    flowerItems(data, oldData) {
      if (data.status !== oldData.status) {
        if (data.status === "success") {
          if (_.isEmpty(data.result)) this.isEmptyListItems = true;
        } else if (data.status === "fail") {
          if (data.error.code == 404) this.isEmptyListItems = true;
        } else {
          return (this.isEmptyListItems = false);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flower-dedication-modal {
  min-height: auto;
}
.flower-dedication__container {
  height: 100vh;
  overflow: scroll;
  .header-container {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.2s ease-in-out;
    .header-avatar-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .header-label__container {
      display: none;
    }
  }
  .header-avatar {
    width: 370px;
    height: 445px;
    border-radius: 20px;
    box-shadow: 0 0 25px $color-dark-gray;
    background-repeat: no-repeat;
    background-position: center;
  }
  .flower-selection-section {
    width: 100%;
    .btn-bottom-line {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .btn-bottom {
        width: 180px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 40px;
        margin: 0 15px;
      }
      .confirm-btn {
        background-color: $color-red;
      }
    }
  }
  .line-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
  }
  .item-line-btn {
    border: 2px solid $color-gray;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-line-btn-icon {
    width: 10px;
    height: 15px;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 10px;
    width: 100%;
  }
}
@include breakpoint-max($break-sp) {
  .flower-dedication__container {
    .header-container {
      align-items: flex-start;
      height: 70vw;
      position: relative;
      .shadow-wrap {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 70%,
          rgba(19, 19, 19, 0.5) 100%
        );
        .icon-compass {
          font-size: 10vw;
        }
      }
      .header-label__container {
        display: block;
        position: absolute;
        bottom: 1.5vw;
        left: 3vw;
        & p {
          color: $color-white;
          margin-bottom: 1vw;
        }
        .label-header__icon {
          font-size: 5vw;
          color: $color-white;
          margin-right: 1vw;
        }
        .label-wrap {
          display: flex;
          flex-direction: row;
        }
      }
    }
    .header-avatar {
      margin-top: 3vw;
      border-radius: 4vw;
      box-shadow: 0 0.5vw 1vw $color-dark-gray;
      width: 40vw;
      height: 51vw;
      background-size: 40vw auto;
    }
    .main-content {
      padding-top: 5vw;
      padding-bottom: 5vw;
      .main-content__container {
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
<style lang="scss">
.FlowerDedicationModal__wrap {
  .v-dialog__content {
    .v-dialog {
      background-color: rgba(0, 0, 0, 0.8);
      width: 100%!important;
      margin-top: 0px!important;
      bottom: 0;
      overflow-y: auto;
      height: 100%;
    }
  }
  // @include breakpoint-max($break-sp) {
  //   .v-dialog__content {
  //     .v-dialog {
  //       margin-top: (50 / 375) * 100vw!important;
  //     }
  //   }
  // }
}
</style>
