<template>
  <v-layout
    column
    align-center
    class="bg-light-gray"
  >
    <div class="faq-page">
      <div class="faq-page__header">
        <div class="header-2">
          FAQ原稿案
        </div>
      </div>
      <div class="faq-page__content">
        <div class="faq-page__list-faq">
          <div class="faq left" v-for="(faq, key) in listFaqLeft" :class="{ active: isActive(faq.key) }">
            <div class="text-large faq__questions" v-on:click="setActive(faq.key)">
              <span class="icon-arrow-right"></span>
              {{faq.questions}}
            </div>
            <div class="faq__answers">
              <p class="text-standard" v-for="answer in faq.answers">{{answer}}</p>
            </div>
          </div>
        </div>
        <div class="faq-page__list-faq">
          <div class="faq right" v-for="(faq, key) in listFaqRight" :class="{ active: isActive(faq.key) }">
            <div class="text-large faq__questions" v-on:click="setActive(faq.key)">
              <span class="icon-arrow-right"></span>
              {{faq.questions}}
            </div>
            <div class="faq__answers">
              <p class="text-standard" v-for="answer in faq.answers">{{answer}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { DATA_FAQ } from '~/utils/constants/dataFAQ'
export default {
  data() {
    return {
      activeItem: "",
      faqs: DATA_FAQ
    }
  },
  computed: {
    listFaqLeft() {
      const data = []
      this.faqs.map((faq, key) => {
        faq.key = key
        if (key%2 === 0) {
          data.push(faq)
        }
      })
      return data
    },
    listFaqRight() {
      const data = []
      this.faqs.map((faq, key) => {
        faq.key = key
        if (key%2 !== 0) {
          data.push(faq)
        }
      })
      return data
    }
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      if (this.activeItem === menuItem) {
        this.activeItem = ""
      } else {
        this.activeItem = menuItem
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.faq-page {
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .faq-page__header {
    width: 90%;
    border-bottom: 1px solid $color-gray;
    .header-2 {
      color: $color-text-blue;
    }
  }
  .faq-page__content {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .faq-page__list-faq {
      width: 45%;
      .faq {
        border: 1px solid $color-gray;
        border-bottom: none;
        padding-top: 12px;
        padding-bottom: 12px;
        &:first-child {
          border-top: none;
        }
        .faq__questions {
          color: $color-text-blue;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          span {
            padding-top: 7px;
            padding-right: 12px;
            color: black;
            font-size: 10px;
            font-weight: bold;
          }
        }
        .faq__answers {
          padding-left: 30px;
          height: 25px;
          overflow: hidden;
          p {
            margin-bottom: 0px;
          }
        }
      }
    }
    @include breakpoint-max($break-sp) {
      margin: 3vw 5vw 0;
      flex-direction: column;
      .faq-page__list-faq {
        width: 100%;
        .faq {
          width: 100%;
          padding: 2.2vw 0 1.2vw!important;
          .faq__answers {
            height: 2rem;
            padding-left: 6vw;
          }
          .faq__questions {
            span {
              padding-top: 2vw;
              padding-right: 2vw;
              font-size: 0.8rem;
            }
          }
        }
        .left {
          border-right: none!important;
        }
        .right {
          border-left: none!important;
        }
      }
    }
  }
}

.left {
  padding-right: 25px;
  transform: translateX(1px);
  border-left: none!important;
}
.right {
  padding-left: 25px;
  border-right: none!important;
}

.active{
  .faq__questions {
    span {
      &:before{
        content: '\e901';
      }
    }
  }
  .faq__answers {
    height: auto!important;
  }
}

</style>
