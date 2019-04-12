<template>
  <div class="slider__container">
    <button
      v-if="!isHidePrevBtn"
      class="icon-arrow-left slider__btn"
      @click="onPrevItems"
    >
    </button>

    <div class="slider__wrap">
      <div v-if="!isConfirming" class="transition-slide slider-full" :style="sliderFullStyle"></div>
      <div v-if="!isConfirming" class="transition-slide slider-1220" :style="slider1220Style"></div>
      <div v-if="!isConfirming" class="transition-slide slider-1024" :style="slider1024Style"></div>
      <div
        class="slider__content"
        :class="{ 'slider__content--confirm' : isConfirming}"
      >
        <template v-if="!isConfirming">
          <div
            v-for="(item, key) in data"
            :key="key"
            class="slider__item"
          >
            <SelectableItem
              :item="item"
              :showCheckedBg="showCheckedBg"
              :onClickUncheckedItem="onClickUncheckedItem"
              :onClickCheckedItem="onClickCheckedItem"
              :isConfirming="isConfirming"
            />
          </div>
        </template>
        <template v-else>
          <div
            class="slider__item"
          >
            <SelectableItem
              :item="checkedItem"
              :showCheckedBg="showCheckedBg"
              :onClickUncheckedItem="onClickUncheckedItem"
              :onClickCheckedItem="onClickCheckedItem"
              :isConfirming="isConfirming"
            />
          </div>
        </template>
      </div>
    </div>

    <button
      v-if="!isHideNextBtn"
      class="icon-arrow-right slider__btn"
      @click="onNextItems"
    >
    </button>
  </div>
</template>

<script>
import _ from 'lodash'
import SelectableItem from './SelectableItem'

export default {
  components: {
    SelectableItem
  },
  props: {
    data: {
      type: Array
    },
    checkedItemId: {
      type: String
    },
    onClickUncheckedItem: {
      type: Function
    },
    onClickCheckedItem: {
      type: Function
    },
    isConfirming: {
      type: Boolean
    }
  },
  data() {
    return {
      currentItemKey: 0,
    }
  },
  computed: {
    sliderFullStyle() {
      return {
        "margin-left": `calc(0vw - (1100px / 3 * ${this.currentItemKey}))`
      }
    },
    slider1220Style() {
      return {
        "margin-left": `calc(0vw - (900px / 3 * ${this.currentItemKey}))`
      }
    },
    slider1024Style() {
      return {
        "margin-left": `calc(0vw - (50vw* ${this.currentItemKey}))`
      }
    },
    checkedItem() {
      return _.find(this.data, item => (item.itemId == this.checkedItemId))
    },
    isHidePrevBtn() {
      if (this.isConfirming || this.currentItemKey <= 0) {
        return true
      }
      return false
    },
    isHideNextBtn() {
      if (this.isConfirming || this.currentItemKey >= (this.data.length - 1)) {
        return true
      }
      return false
    },
  },
  methods: {
    onPrevItems() {
      if (this.currentItemKey > 0) this.currentItemKey -= 1
    },
    onNextItems() {
      if (this.currentItemKey < (this.data.length - 1)) this.currentItemKey += 1
    },
    showCheckedBg(itemId) {
      return this.checkedItemId == itemId
    },
  }
}
</script>

<style lang="scss" scoped>
.slider__container {
  width: 1200px;
  position: relative;
  display: flex;
  justify-content: center;
  .slider__wrap {
    width: 1100px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .slider__content {
    display: inline-flex;
    flex-direction: row;
    overflow: hidden;
    transition: margin 0.5s ease-in-out;
  }
  .slider__content--confirm {
    display: flex;
    justify-content: center;
    margin-left: 0;
  }
  .slider__btn {
    z-index: 2;
    position: absolute;
    border: 2px solid $color-gray;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    top: 60px;
    font-size: 15px;
    font-weight: 900;
    color: $color-navy-blue;
    background-color: $color-white;
  }
  .icon-arrow-left {
    left: 0vw;
  }
  .icon-arrow-right {
    right: 0vw;
  }
  .slider__item {
    min-width: calc(1100px/3);
    display: flex;
    justify-content: center;
  }
  .slider-1220 {
    display: none;
  }
  .slider-1024 {
    display: none;
  }
  .slider-full {
    display: block;
  }
  .transition-slide {
    transition: margin 0.5s ease-in-out;
  }
}
@include breakpoint-max(1220px) {
  .slider__container {
    width: 96vw;
    .slider__wrap {
      width: 900px;
    }
    .slider__content--confirm {
      margin-left: 0;
    }
    .slider__item {
      min-width: calc(900px/3);
    }
    .slider-full {
      display: none;
    }
    .slider-1024 {
      display: none;
    }
    .slider-1220 {
      display: block;
    }
  }
}
@include breakpoint-max($break-sp) {
  .slider__container {
    width: 100%;
    .slider__wrap {
      width: 100%;
    }
    .slider__content {
      padding-left: 25vw;
    }
    .slider__content--confirm {
      padding-left: 0;
      margin-left: 0;
    }
    .slider__btn {
      border-width: 1px;
      border-radius: 2vw;
      width: 7vw;
      height: 7vw;
      top: 11vw;
      font-size: 4vw;
    }
    .icon-arrow-left {
      left: 4vw;
    }
    .icon-arrow-right {
      right: 4vw;
    }
    .slider__item {
      min-width: 50vw;
    }
    .slider-full {
      display: none;
    }
    .slider-1220 {
      display: none;
    }
    .slider-1024 {
      display: block;
    }
  }
}
</style>
