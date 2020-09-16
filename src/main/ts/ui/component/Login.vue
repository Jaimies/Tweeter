<template>
  <form class="form" novalidate @submit.prevent="login()">
    <h1 class="heading">Login to Twitter</h1>
    <p v-if="wrongCredentials" class="error">
      Seems like you've entered an incorrect email or password
    </p>
    <BaseInput v-model="credential" label="Email or username"/>
    <BaseInput v-model="password" label="Password" type="password"/>

    <button :disabled="!isFormValid">Login</button>
  </form>
</template>

<script>
import BaseInput from "./BaseInput"
import {provideLoginUseCase} from "../../di/provideLoginUseCase"

export default {
  components: {BaseInput},
  data: () => ({
    credential: null,
    password: null,
    wrongCredentials: false
  }),
  computed: {
    isFormValid() {
      return !!this.credential && !!this.password
    }
  },
  methods: {
    login() {
      const loggedInSuccessfully = provideLoginUseCase().run(this.credential, this.password)
      if (loggedInSuccessfully) this.navigateOnSuccess()
      else this.showErrorMessage()
    },

    navigateOnSuccess() {
      this.$router.push("/home")
      location.reload()
    },

    showErrorMessage() {
      this.wrongCredentials = true
    }
  }
}
</script>

<style scoped>
.form {
  margin: auto;
  text-align: center;
  width: 320px;
}

.heading {
  font-size: 23px;
}

.error {
  color: #e0245e;
  text-align: left;
}
</style>