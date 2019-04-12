<!-- <template lang="html">
  <GeneralModal
    :model="model"
    requestBtn
    :onClose="onOpenClose"
    :onRequest="onRequestInvitation"
    requestBtnText="招待申請"
  >
    <template>
      <p class="header-3 content__top" slot="top">
        ご利用には、親族・管理者からの招待が必要です。<br />
        「招待申請」ボタンを押すと親族・管理者に申請できます。
      </p>
      <p class="text-standard content__bottom" slot="bottom">
        申請を親族・管理者が承認した場合、招待メールが送られますので、それまでお待ちください。
      </p>
    </template>
  </GeneralModal>
</template>

<script>
import GeneralModal from './index'
export default {
  components: {
    GeneralModal
  },
  data() {
    return {
      model: false
    }
  },
  methods: {
    onRequestInvitation() {
    },
    onOpenClose() {
      this.model = !this.model;
    },
  }
}
</script>

<style lang="scss" scoped>
.content__top {
  margin: 0;
  font-weight: bold;
  color: $color-text-blue;
}
.content__bottom {
  margin: 0;
}
</style> -->
