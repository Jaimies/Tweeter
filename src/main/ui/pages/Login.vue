<template>
  <BaseForm :isValid="isFormValid" @submit="login">
    <template #heading>Login to Twitter</template>
    <template #submitBtn>Login</template>

    <p v-if="wrongCredentials" class="error">
      Seems like you've entered an incorrect email or password
    </p>

    <BaseInput v-model="credential" type="email" label="Email"/>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password"/>
  </BaseForm>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {provideLoginUseCase} from "@/di/provideUseCases"

const login = provideLoginUseCase()

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
      if (login.areCredentialsValid(this.credential, this.password)) {
        login.login(this.credential, this.password)
        this.navigateOnSuccess()
      } else this.showErrorMessage()
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
