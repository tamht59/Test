<template>
  <footer class="main-footer">

    <ul class="main-footer-menu">
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/terms"
          class="main-footer-menu__link"
          exact
        >
          ご利用規約
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/privacy_policy"
          class="main-footer-menu__link"
          exact
        >
          プライバシーポリシー
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/trading"
          class="main-footer-menu__link"
          exact
        >
          特定商取引法に関する表示
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/faq"
          class="main-footer-menu__link"
          exact
        >
          よくあるご質問
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/contact"
          class="main-footer-menu__link"
          exact
        >
          お問い合わせ
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          to="/support/company"
          class="main-footer-menu__link"
          exact
        >
          運営会社
        </nuxt-link>
      </li>
      <li class="main-footer-menu__item">
        <nuxt-link
          :to="'/entry/' + now_account_id"
          class="main-footer-menu__link"
          exact
        >
          新規お申し込み
        </nuxt-link>
      </li>
    </ul>

    <p class="main-footer__copy-right">
      (c)XXXXXXXXXXX Co., Ltd.
    </p>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
  data() {
    return {
      now_account_id: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.main-footer {
  position: relative;
  z-index: 1000;
  padding: 24px 0;
  background-color: $color-navy-blue;
  color: $color-light-text;
  line-height: 1;
  &__copy-right {
    margin: 0;
    text-align: center;
    line-height: 1;
    font-size: 1.3rem;
    color: $color-light-text;
  }
  @include breakpoint-max(1025px) {
    display: none;
  }
}

.main-footer-menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 1000px;
  margin: 0 auto;
  &__item {
    margin-bottom: 14px;
    padding: 0 24px;
    list-style: none;
    border-left: 1px solid $color-white;
    &:last-of-type {
      border-right: 1px solid $color-white;
    }
  }
  &__link {
    color: $color-white;
    font-size: 1.6rem;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
