<template>
  <button
    type="button"
    class="btn-white"
    @click.prevent="onClickBtn"
  >
    <span v-if="icon" :class="icon"></span>
    {{textContent}}
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      type: Number
    },
    action: {
      type: Function
    }
  },
  computed: {
    icon() {
      if (this.btnType === 0) {
        return 'icon-login'
      }
      return null
    },
    textContent() {
      switch (this.btnType) {
        case 0:
          return 'ログイン'
          break;
        case 1:
          return '招待申請'
          break;
        case 2:
          return '知人を招待'
          break;
        default:
          return 'ログイン'
          break;
      }
    },
  },
  methods: {
    onClickBtn() {
      this.action(this.btnType)
    }
  },
}
</script>

<style scoped lang="scss">

</style>
