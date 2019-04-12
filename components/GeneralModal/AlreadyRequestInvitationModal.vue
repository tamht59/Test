<!-- <template lang="html">
  <GeneralModal
    :model="model"
    :onClose="onClose"
  >
    <p class="header-3 content__top" slot="top">
      {{text}}
    </p>
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
      model: false,
      text: null
    }
  },
  methods: {
    onOpen(text) {
      this.text = text;
      this.model = true;
    },
    onClose() {
      this.model = false;
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
</style> -->
