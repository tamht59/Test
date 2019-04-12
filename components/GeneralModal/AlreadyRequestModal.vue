<template>
  <GeneralModal
    :model="model"
    :closeBtn="false"
    requestBtn
    requestBtnText="OK"
    :onRequest="onRequest"
  >
    <p class="header-3 content__top" slot="top">
      コメントを行うには招待申請の承認が必要です
    </p>
  </GeneralModal>
</template>

<script>
import GeneralModal from './index'
export default {
  props: {
    model: {
      type: Boolean
    },
    onClose: {
      type: Function
    }
  },
  components: {
    GeneralModal
  },
  methods: {
    onRequest() {
      // Submit request comment
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.content__top {
  margin: 0;
  font-weight: bold;
  color: $color-text-blue;
}

</style>
