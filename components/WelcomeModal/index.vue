<template>
  <v-dialog
    v-model="welcomeModalStatus"
    no-click-animation
    :scrollable='false'
    attach
  >
    <v-card class="welcome-modal">
      <div>
        <img
          src='~static/images/flower.jpg'
          alt='Person image'
          class="person-image"
        />
      </div>

      <div class="triangle">
        <div class="triangle__body"></div>
        <div class="triangle__border"></div>
      </div>
      <div class="welcome-message">
        <p class="welcome-message__content text-standard">{{getWelcomeMessage()}}</p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    welcomeMessage: {
      type: String,
      default: "御来訪ありがとうございます"
    }
  },
  data() {
    return {
      welcomeModalStatus: false
    };
  },
  methods: {
    getWelcomeMessage() {
      return this.welcomeMessage;
    },
    openWelcomeModal() {
      this.welcomeModalStatus = true;
      setTimeout(() => {
        this.hideWelcomeModal();
      }, 3000);
    },
    hideWelcomeModal() {
      this.welcomeModalStatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: $color-main-background;
  border-radius: 5px;
  width: 830px;
  .triangle {
    margin-bottom: -25px;
    margin-top: 10px;
    .triangle__body {
      border-right: 22px solid transparent;
      border-bottom: 25px solid $color-light-gray;
      border-left: 22px solid transparent;
      position: relative;
      z-index: 6;
    }
    .triangle__border {
      border-right: 23px solid transparent;
      border-bottom: 26px solid $color-gray;
      border-left: 23px solid transparent;
      margin-top: -28px;
      position: relative;
      z-index: 4;
    }
  }
  .welcome-message {
    width: 100%;
    margin-top: 20px;
    position: relative;
    z-index: 5;
  }
  .welcome-message__content {
    text-align: center;
    margin: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: $color-light-gray;
    border: 1px solid $color-gray;
    border-radius: 10px;
  }
  .person-image {
    width: 100%;
    height: auto;
  }
}

@include breakpoint-max($break-sp) {
  .welcome-modal {
    width: 90vw;
    padding: 3vw;
    border-radius: 1.5vw;
    .triangle {
      margin-bottom: -2.2vw;
      margin-top: 0vw;
      .triangle__body {
        border-right: 2.4vw solid transparent;
        border-bottom: 2.7vw solid $color-light-gray;
        border-left: 2.4vw solid transparent;
      }
      .triangle__border {
        border-right: calc(2.4vw + 1px) solid transparent;
        border-bottom: calc(2.7vw + 1px) solid $color-gray;
        border-left: calc(2.4vw + 1px) solid transparent;
        margin-top: calc(-2.7vw - 2px);
      }
    }
    .welcome-message {
      margin-top: 2vw;
    }
    .welcome-message__content {
      padding-top: 0.5vw;
      padding-bottom: 0.5vw;
      border-radius: 1vw;
    }
    .person-image {
      max-width: 84vw;
    }
  }
}
</style>
