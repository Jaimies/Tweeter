<template>
  <BaseForm :isValid="isFormValid" @submit="login" v-if="!isLoading">
    <template #heading>Login to Tweeter</template>
    <template #submitBtn>Login</template>

    <LoginErrors :result="loginResult"/>

    <BaseInput v-model="email" type="email" label="Email"/>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password"/>
  </BaseForm>

  <Spinner v-else/>
</template>

<script>
import BaseInput from "../../components/ui/Input"
import BaseForm from "../../components/ui/Form"
import {provideLoginUseCase} from "@/di/provideUseCases"
import {LoginResult} from "@/domain/repository/AuthRepository"
import Spinner from "@/ui/components/ui/Spinner"
import LoginErrors from "./Errors.vue"

const login = provideLoginUseCase()

export default {
  components: {Spinner, BaseForm, BaseInput, LoginErrors},
  data: () => ({
    email: null,
    password: null,
    loginResult: null,
    isLoading: false
  }),
  computed: {
    isFormValid() {
      return !!this.email && !!this.password
    }
  },
  methods: {
    login() {
      this.showLoader()
      this.performLogin()
    },

    navigateOnSuccess() {
      this.$router.push("/home")
      location.reload()
    },

    showErrorMessage(loginResult) {
      this.loginResult = loginResult
    },

    showLoader() {
      this.isLoading = true
    },
    hideLoader() {
      this.isLoading = false
    },

    async performLogin() {
      const loginResult = await login.login(this.email, this.password)

      if (loginResult == LoginResult.Success)
        this.navigateOnSuccess()
      else {
        this.hideLoader()
        this.showErrorMessage(loginResult)
      }
    },
  }
}
</script>
