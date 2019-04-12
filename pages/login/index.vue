<template>
  <v-app>
    <form class="form-container">
      <div class="field-container">
      <p>Username</p>
      <input type="text" class="input-field" v-model="username">
      <p>Password</p>
      <input type="password" class="input-field" v-model="password">
      </div>
      <button class="login-btn" @click.prevent="login">{{submitBtnContent}}</button>
    </form>
    <p>{{loginStatus}}</p>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      isSubmit: false
    }
  },
  computed: {
    submitBtnContent() {
      return this.userLoginData.requesting ? 'SUBMITTING...' : 'LOGIN'
    },
    loginStatus() {
      const { status, requesting } = this.userLoginData
      if (requesting) {
        return ''
      }
      if (status === 'success') {
        return 'Login successfull!'
      }

      if (status === 'fail') {
        return 'Login fail!'
      }
    },

    ...mapGetters('user', {
      userLoginData: 'loginData'
    })
  },
  methods: {
    login() {
      this.userLogin({
        username: this.username.trim(),
        password: this.password 
      })
    },

    ...mapActions('user', {
      userLogin: 'login'
    })
  }
}
</script>


<style lang="scss" scoped>
.form-container {
  border: 1px solid $color-black;
  width: 500px;
  .field-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px
  }
  .input-field {
    border: 1px solid $color-dark-gray
  }
  .login-btn {
    background-color: $color-navy-blue;
    padding: 15px 30px;
    margin: 20px 40px;
    float: right;
    color: $color-white
  }
}
</style>

