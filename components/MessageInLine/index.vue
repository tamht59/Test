<template>
  <div
    class="message-line__container"
    @click.prevent="onClickMessageLine"
  >
    <div class="message__icon">
      <span :class="getIconName()"></span>
    </div>
    <div class="message__wrap">
      <div class="message__time">
        <p class="text-standard">{{ timeLabel }}</p>
      </div>
      <div class="message__title">
        <p class="text-standard">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    messageData: {
      type: Object,
      required: true
    },
    onClickMessage: {
      type: Function
    }
  },
  computed: {
    timeLabel() {
      if (this.messageData && this.messageData.fromDate) {
        return moment(this.messageData.fromDate).format('YYYY年MM月DD日')
      }
      return ""
    },
    title() {
      return this.messageData.title || 'No title'
    },
    messageId() {
      return this.messageData.messageId
    },
    messageType() {
      return this.messageData.messageKbn
    }
  },
  methods: {
    getIconName() {
      const { messageKbn = 0 } = this.messageData
      let iconName
      switch (messageKbn) {
        case 1:
          iconName = 'icon-camera-w'
          break;
        case 2:
          iconName = 'icon-volume'
          break;
        case 3:
          iconName = 'icon-movie'
          break;
        default:
          iconName = 'icon-message'
          break;
      }
      return iconName
    },
    onClickMessageLine() {
      this.onClickMessage({ messageId: this.messageId, type: this.messageType })
    },
  },
}
</script>

<style lang='scss' scoped>
.message-line__container {
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid $color-gray;
  p {
    margin: 0;
    padding: 0 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: $color-light-gray;
    cursor: pointer;
  }
  .message__wrap {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .message__icon {
    width: 30px;
    display: flex;
    align-items: center;
    span {
      font-size: 25px;
      color: $color-text-blue;
    }
  }
  .message__time {
    width: 170px;
    p {
      margin-left: 5px;
    }
  }
  .message__title {
    width: 610px;
  }

  @include breakpoint-max($break-sp) {
    // flex-direction: column;
    width: 100vw;
    height: 16vw;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    p {
      padding: 0;
    }
    .message__icon {
      width: 10vw;
      margin-top: -1vw;
      span {
        font-size: 7.5vw;
        color: $color-text-blue;
      }
    }
    .message__wrap {
      display: block;
      width: 82vw;
    }
    .message__time {
      width: unset;
      p {
        margin-left: unset;
      }
    }
    .message__title {
      width: unset;
    }
  }
}
</style>
