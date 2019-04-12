<template lang="html">
  <div class="layout-container">
    <nuxt />
    <div class="footer-container">
    </div>
  </div>
</template>

<script>
const listFooterBtn = [
  { content: 'ご利用規約', action: null },
  { content: 'プライバシーポリシー', action: null },
  { content: '特定商取引法に関する表示', action: null },
  { content: 'よくあるご質問', action: null },
  { content: 'お問い合わせ', action: null },
  { content: '運営会社', action: null },
  { content: '(c)XXXXXXXXXXX Co., Ltd.', action: null }
]

export default {
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;
}
.footer-container {
  width: 100%;
  height: 50px;
  background-color: gray;
  position: fixed;
  bottom: 0;
}
</style>
