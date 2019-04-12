<template>
  <div class="selectable-item__container">
    <div
      :style="{ 'background-image': 'url(' + item.itemTmbImagePath + ')' }"
      class="item-image"
      @click.prevent="onClickItem"
    >
    </div>
    <div
      class="checked-bg icon-check"
      v-if="!isConfirming && showCheckedBg(item.itemId)"
      @click.prevent="onClickCheckedBg"
    >
    </div>
    <div class="bottom-content">
      <template v-if="this.isConfirming">
        <p class="header-3">商品名 {{ item.itemName}}</p>
        <p class="header-3">価格 ￥{{ item.price }}</p>
        <p class="header-3">有効期間30日間</p>
      </template>

      <template v-if="!this.isConfirming">
        <p v-if="item.purchased == 0" class="header-3">{{ item.itemName}}<br>￥{{ item.price }}</p>
        <p
          class="header-3 item-purchased"
          v-if="item.purchased == 1"
        >購入済　有効期間{{ validityDate }}日間</p>
      </template>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    showCheckedBg: {
      type: Function
    },
    onClickCheckedItem: {
      type: Function
    },
    onClickUncheckedItem: {
      type: Function
    },
    isConfirming: {
      type: Boolean
    }
  },
  computed: {
    validityDate() {
      const validityPeriod = _.get(this.item, "validityPeriod", "");
      return moment().get("date") - moment(validityPeriod).get("date");
    }
  },
  methods: {
    onClickCheckedBg() {
      !this.isConfirming && this.onClickCheckedItem();
    },
    onClickItem() {
      !this.isConfirming && this.onClickUncheckedItem(this.item.itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
.selectable-item__container {
  width: 320px;
  min-height: 295px;
  .item-image {
    width: 100%;
    height: 210px;
    border-radius: 20px;
    margin-bottom: 15px;
    background-color: $color-black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      cursor: pointer;
    }
  }
  .checked-bg {
    width: 320px;
    height: 210px;
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 20px;
    margin-top: -225px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    font-weight: bold;
    color: white;
    &:hover {
      cursor: pointer;
    }
    & > img {
      width: 65px;
      height: 45px;
    }
  }
  .item-purchased {
    color: $color-text-gray;
  }
  .bottom-content {
    padding: 0 10px;
    text-align: center;
    margin-bottom: 8px;
    margin-top: 15px;
    p {
      margin-bottom: 0;
    }
  }
}
@include breakpoint-max(1220px) {
  .selectable-item__container {
    width: 250px;
    .item-image {
      width: 250px;
    }
    .checked-bg {
      width: 250px;
    }
  }
}
@include breakpoint-max($break-sp) {
  .selectable-item__container {
    width: 50vw;
    min-height: unset;
    height: unset;
    .item-image {
      background-size: 45vw auto;
      height: calc(45vw * 0.65);
      width: 45vw;
      margin-left: 2.5vw;
      border-radius: 3vw;
      margin-bottom: 2vw;
    }
    .checked-bg {
      position: absolute;
      top: 0;
      margin-top: 0;
      width: 45vw;
      height: calc(45vw * 0.65);
      border-radius: 3vw;
      margin-left: 2.5vw;
      &:hover {
        cursor: pointer;
      }
      & > img {
        width: 10vw;
        height: auto;
      }
    }
    .bottom-content {
      margin-top: 0;
      margin-bottom: 5vw;
    }
  }
}
</style>
