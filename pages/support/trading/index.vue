<template>
  <v-layout
    column
    align-center
  >
    <div class="commercial-law">
      <div class="commercial-law__container">
        <div class="header">
          <p class="header-1 top-header">特定商取引法に基づく表示</p>
        </div>
        <div class="main-content">
          <div
            class="line"
            v-for="(item, i) in commercialTransactionLawData"
            :key="i"
          >
            <div class="line__title">
              <p>{{ getTitle(item) }}</p>
            </div>
            <div class="line__content">
              <p class="text-standard line__content--gray">{{ getContent(item) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { commercialTransactionLawData } from '~/utils/constants/staticData'
export default {
  computed: {
    commercialTransactionLawData() {
      return commercialTransactionLawData
    }
  },
  methods: {
    getTitle(item) {
      return item.title
    },
    getContent(item) {
      return item.content
    }
  }
}
</script>

<style scoped lang="scss">
.commercial-law {
  p {
    line-height: 30px;
    margin: 0;
  }
  padding: 20px 0;
  .commercial-law__container {
    max-width: 1200px;
    padding-left: 150px;
    padding-right: 20px;
    .header {
      margin-top: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid $color-gray;
    }
    .top-header {
      color: $color-text-blue;  
      margin: 0;
    }
    .main-content {
      border-right: 2px solid $color-gray;
      .line {
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid $color-gray;
      }
    }
    .line__title {
      flex: 1;
      background-color: $color-light-gray;
      padding: 12px
    }
    .line__content {
      flex: 3;
      padding: 12px 20px;
    }
    .line__content--gray {
      color: $color-text-gray;
    }
  }
  @include breakpoint-max(1250px) {
    .commercial-law__container {
      padding-left: 100px;
      padding-right: 20px;
    }
  }

  @include breakpoint-max($break-sp) {
    padding: 3vw 0;
    p {
      line-height: 5.5vw;
    }
    .commercial-law__container {
      width: 92vw;
      padding-left: 0;
      padding-right: 0;
      .header {
        margin-top: 1vw;
        padding-bottom: 2vw;
        border-width: 1px;
        margin-bottom: 6vw;
      }
      .main-content {
        border-width: 1px;
        .line {
          &:first-child {
            border-top: 1px solid $color-gray;
          }
          border-width: 1px;
        }
      }
      .line__title {
        flex: 5;
        padding: 2.5vw;
      }
      .line__content {
        flex: 7;
        padding: 2.5vw;
      }
      .line__content--gray {
        color: $color-text-gray;
      }
    }
  }
}
</style>
