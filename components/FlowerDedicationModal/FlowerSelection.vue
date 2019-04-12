<template>
  <div class="flower-selection">
    <div class="list-flower__wrap">
      <template v-if="!isLoadingListItems">

        <ListItemsSlider
          v-if="!isEmptyListItems"
          :data="items"
          :checkedItemId="checkedItemId"
          :onClickUncheckedItem="onClickUncheckedItem"
          :onClickCheckedItem="onClickCheckedItem"
          :isConfirming="isConfirming"
        />

        <div v-else class="empty-section">
          <p>Empty list</p>
        </div>
      </template>

      <div v-else class="empty-section">
        <v-progress-circular
          :size="40"
          :width="3"
          color="#024e8a"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <p class="mess-error" v-if="errorPutBg && !isConfirming">{{errorPutBg}}</p>
    <p class="mess-error" v-if="errorPostItem">{{errorPostItem}}</p>
    <div class="btn-line">
      <button
        :class="{ 'btn-red': isEnableConfirmBtn, 'btn-gray': !isEnableConfirmBtn, 'btn-disable': !isEnableConfirmBtn}"
        class="btn-line__btn"
        :disabled="!isEnableConfirmBtn"
        @click.prevent="onPurchaseBtn"
      >
        <span>{{ confirmText }}</span>
      </button>
      <button
        class="btn-gray btn-line__btn"
        @click.prevent="onCloseBtn()"
      >
        <span>{{ closeText }}</span>
      </button>
    </div>
    <div class="text-xs-center">
      <v-progress-circular
        v-show="getPostItemBuyData && getPostItemBuyData.requesting"
        :size="50"
        color="light-blue"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ListItemsSlider from './ListItemsSlider';
import _ from 'lodash';

export default {
  components: {
    ListItemsSlider
  },
  data() {
    return {
      isConfirming: false,
      errorPutBg: null,
      errorPostItem: null
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    checkedItemId: {
      type: String
    },
    onCheckItem: {
      type: Function
    },
    isEnableConfirmBtn: {
      type: Boolean
    },
    onPurchaseItem: {
      type: Function
    },
    onClose: {
      type: Function
    },
    isLoadingListItems: {
      type: Boolean
    },
    isEmptyListItems: {
      type: Boolean
    },
    onPutBgItem: {
      type: Function
    },
    setBgImgData: {
      type: Object
    },
    getPostItemBuyData: {
      type: Object
    }
  },
  computed: {
    confirmText() {
      const { purchased } = _.find(this.items, item => (item.itemId == this.checkedItemId)) || {}
      if (purchased === "1") {
        return '確認する';
      }
      return this.isConfirming ? "購入手続きへ" : "購入する";
    },
    closeText() {
      return this.isConfirming ? "キャンセル" : "閉じる";
    }
  },
  methods: {
    onClickUncheckedItem(itemId) {
      this.onCheckItem(itemId);
    },
    onClickCheckedItem() {
      this.onCheckItem();
    },
    async onPurchaseBtn() {
      const { purchased } = _.find(this.items, item => (item.itemId == this.checkedItemId)) || {}
      if (!this.isConfirming) {
         if (purchased === "1") {
           await this.onPutBgItem();
           if (this.setBgImgData.status === "success") {
             this.errorPutBg = null;
             this.onClickCheckedItem();
             this.onClose();
             return true;
           }
           this.errorPutBg = this.setBgImgData.error.message;
           return false;
         }

        this.isConfirming = true;
        return false;
      }
      await this.onPurchaseItem();

      if (this.getPostItemBuyData.status === "success") {
        await this.onPutBgItem()
        if (this.setBgImgData.status === "success") {
          this.isConfirming = false;
          this.errorPostItem = null;
          this.onClickCheckedItem();
          this.onClose();
          return true;
        }
        this.errorPostItem = this.setBgImgData.error.message;
        return false;
      }
      this.errorPostItem = this.getPostItemBuyData.error.message;
    },
    onCloseBtn() {
      this.errorPostItem = this.errorPutBg = null;
      if (this.isConfirming) {
        return this.isConfirming = false;
      }
      this.onClickCheckedItem();
      this.onClose();
    }
  }
}
</script>

<style lang='scss' scoped>
.flower-selection {
  .list-flower__wrap {
    min-height: 250px;
  }
  .mess-error {
    text-align: center;
    color: red;
  }
  .empty-section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 250px;
  }
  .btn-line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 8px;
    .btn-line__btn {
      width: 180px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 40px;
      margin: 0 15px;
    }
  }
  .flower-selection__line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
  }
  .line__btn {
    border: 2px solid $color-gray;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-navy-blue;
    font-weight: bold;
    background-color: $color-white;
  }
  .pre-btn {
    left: -50px;
    z-index: 10;
  }
  .next-btn {
    right: -50px;
    z-index: 10;
  }
  .line__item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    & > div {
      margin: 0 2vw;
    }
  }
  .text-xs-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
}
@include breakpoint-max($break-sp) {
  .flower-selection {
    .list-flower__wrap {
      min-height: 35vw;
    }
    .empty-section {
      min-height: 35vw;
    }
    .line__item {
      & > div {
        margin: 0 1.5vw;
      }
    }
    .line__btn {
      border: 1px solid $color-gray;
      border-radius: 2vw;
      width: 7vw;
      height: 7vw;
      position: absolute;
      top: 11vw;
      font-size: 4vw;
    }
    .pre-btn {
      left: 25px;
    }
    .next-btn {
      right: 25px;
    }
    .btn-line {
      margin-top: 2vw;
      .btn-line__btn {
        width: 46vw;
        height: 10.5vw;
        border-radius: 5.25vw;
        margin: 0 1.5vw;
      }
    }
  }
}
@include breakpoint-min($break-sp) {
  .flower-selection {
    .line__btn {
      font-size: 15px;
    }
  }
}
</style>
