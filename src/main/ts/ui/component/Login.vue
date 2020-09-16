<template>
  <form class="form" novalidate @submit.prevent="login()">
    <h1 class="heading">Login to Twitter</h1>
    <p class="error">{{ errorMessage }}</p>
    <BaseInput v-model="credential" label="Email or username"/>
    <BaseInput v-model="password" label="Password" type="password"/>
    <button :disabled="!isFormValid">Login</button>
  </form>
</template>

<script>
import BaseInput from "./BaseInput"

export default {
  components: {BaseInput},
  inject: ["performLogin"],
  data: () => ({
    credential: null,
    password: null,
    errorMessage: null
  }),
  computed: {
    isFormValid() {
      return !!this.credential && !!this.password
    }
  },
  methods: {
    login() {
      const signedInSuccessfully = this.performLogin(this.credential, this.password)

      if (signedInSuccessfully) this.navigateOnSuccess()
      else this.showErrorMessage()
    },

    navigateOnSuccess() {
      this.$router.push("/home")
      location.reload()
    },

    showErrorMessage() {
      this.errorMessage = "Wrong credentials"
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
  color: #f03;
}
</style>