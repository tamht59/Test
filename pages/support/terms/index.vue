<template>
  <v-layout
    column
    align-center
  >
    <div class="terms-section">
      <div class="terms-container">
        <div class="header-container">
          <p class="header-1 top-header">利用規約</p>
        </div>
        <div class="terms__main">
          <div class="terms__intro">
            <p class="text-standard">{{ introContent }}</p>
          </div>
          <div class="terms__list">
            <div
              class="terms-item"
              v-for="(term, i) in listTerms"
              :key="i"
            >
              <p class="header-3 item-label">{{ getLabel(term) }}</p>
              <div
                class="terms-item__section"
                v-for="(section, index) in getSections(term)"
                :key="index"
              >
                <p>{{ getTitle(section) }}</p>
                <template
                  v-if="isHasItem(section)"
                >
                  <div
                    v-for="(item, key) in section.items"
                    :key="key"
                    class="terms-item__section__item"
                  >
                    <p class="item-title">{{ getTitle(item)}}</p>
                    <p>{{ getContent(item) }}</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="terms__footer">
          <p class="text-standard">{{ footerContent }}</p>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { termsContent } from '~/utils/constants/staticData'
import _ from 'lodash'
export default {
  computed: {
    introContent() {
      return termsContent.intro
    },
    listTerms() {
      return termsContent.terms
    },
    footerContent() {
      return termsContent.footer
    }
  },
  methods: {
    getLabel(item) {
      return item.label
    },
    getSections(item) {
      return item.sections
    },
    getTitle(item) {
      return item.title
    },
    isHasItem(data) {
      return data && !_.isEmpty(data.items)
    },
    getContent(item) {
      return item.content
    }
  }
}
</script>

<style scoped lang="scss">
.terms-section {
  p {
    line-height: 30px;
    margin: 0;
    text-align: justify;
  }
  padding: 20px 0;
  .terms-container {
    width: 830px;
    .header-container {
      margin: 20px -50px 25px 0;
      padding-bottom: 15px;
      border-bottom: 2px solid $color-gray;
    }
    .top-header {
      color: $color-text-blue;  
      margin: 0;
    }
    .terms__main {
      overflow-y: scroll;
      padding-right: 50px;
      height: calc(100vh - 390px);
      .terms__intro {
        margin-bottom: 20px;
      }
      .terms-item {
        padding: 10px 0;
      }
      .item-label {
        margin-bottom: 10px;
      }
      .terms-item__section {
        margin-bottom: 10px;
      }
      .item-title {
        padding-left: 10px;
      }
    }
    .terms__footer {
      padding: 30px 0px;
      p {
        text-align: right;
        margin-right: 60px;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
      background: $color-gray;
  }

  @include breakpoint-max($break-sp) {
    padding: 3vw 0 0 0;
    p {
      line-height: 7vw;
    }
    .terms-container {
      width: 92vw;
      .header-container {
        margin: 1vw 0;
        padding-bottom: 2vw;
        border-bottom: 1px solid $color-gray;
        margin-bottom: 5vw;
      }
      .terms__main {
        padding-right: 2vw;
        height: calc(100vh - 60vw);
        margin-right: -3.5vw;
        .terms__intro {
          margin-bottom: 5vw;
        }
        .terms-item {
          padding: 2vw 0;
        }
        .item-label {
          margin-bottom: 3vw;
        }
        .terms-item__section {
          margin-bottom: 3vw;
        }
        .item-title {
          padding-left: 3vw;
        }
      }
      .terms__footer {
        padding: 3vw 0 0 0;
        p {
          margin-right: 10vw;
        }
      }
    }
      ::-webkit-scrollbar {
        width: 2vw;
      }
  }
}
</style>
