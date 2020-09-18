<template>
  <BaseForm :isValid="isFormValid" buttonText="Login"
            headingText="Login to Twitter" @submit="login">

    <p v-if="wrongCredentials" class="error">
      Seems like you've entered an incorrect email or password
    </p>

    <BaseInput v-model="credential" label="Email or username"/>
    <BaseInput v-model="password" label="Password" type="password"/>
  </BaseForm>
</template>

<script>
import BaseInput from "./BaseInput"
import BaseForm from "./BaseForm"
import {provideLoginUseCase} from "../../di/provideLoginUseCase"

export default {
  components: {BaseForm, BaseInput},
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
.error {
  color: #e0245e;
  text-align: left;
}
</style>