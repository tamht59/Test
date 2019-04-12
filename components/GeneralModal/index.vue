<template>
  <v-dialog
    v-model="model"
    persistent
    no-click-animation
  >
    <div class="general-modal">
      <div
        class="top-content"
      >
        <slot name="top"></slot>
      </div>
      <div class="btn-line">
        <button
          v-if="requestBtn"
          class="modal-btn request-btn btn-blue"
          :class="{ [requestBtnIcon]: requestBtnIcon }"
          @click.prevent="onRequestBtn"
        >
          {{ requestBtnText }}
        </button>
        <button
          v-if="closeBtn"
          @click.prevent="onCloseModal"
          class="modal-btn close-btn btn-gray"
        >
          閉じる
        </button>
      </div>
      <div
        class="bot-content"
      >
        <slot name="bottom"></slot>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    model: {
      type: Boolean,
      default: false
    },
    requestBtn: {
      type: Boolean,
      default: false
    },
    requestBtnText: {
      type: String,
    },
    requestBtnIcon: {
      type: String
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function
    },
    onRequest: {
      type: Function
    }
  },
  methods: {
    onCloseModal() {
      this.onClose()
    },
    onRequestBtn() {
      this.onRequest()
    }
  },
}
</script>

<style lang="scss" scoped>
.general-modal {
  background-color: $color-white;
  padding: 20px;
  max-width: 750px;
  .top-content {
    margin-bottom: 40px;
    text-align: center;
  }
  .bot-content {
    margin-top: 20px;
  }
  .btn-line {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  .modal-btn {
    line-height: 0;
    width: 42%;
    margin:0 20px;
    max-width: 200px;
  }
  @include breakpoint-max($break-sp) {
    padding: 1rem;
    max-width: 85vw;
    .modal-btn {
      max-width: none;
    }
  }
}
</style>
