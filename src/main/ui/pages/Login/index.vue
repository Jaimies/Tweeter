<template>
  <BaseForm :isValid="!$v.$invalid" @submit="login" v-if="!isLoading">
    <template #heading>Login to Tweeter</template>
    <template #submitBtn>Login</template>

    <LoginErrors :result="loginResult"/>

    <BaseInput v-model="email" type="email" label="Email" :validation="$v.email">
      <p class="error" v-if="!$v.email.email">Please enter a valid email.</p>
    </BaseInput>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password"/>

    <RouterLink tag="button" :to="{name: 'reset-password'}" class="forgot-your-password" type="button">
      Forgot your password?
    </RouterLink>
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
import {email, required} from "vuelidate/lib/validators"

const login = provideLoginUseCase()

export default {
  components: {Spinner, BaseForm, BaseInput, LoginErrors},
  data: () => ({
    email: null,
    password: null,
    loginResult: null,
    isLoading: false
  }),
  validations: {
    email: {email, required},
    password: {required}
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

<style>
.forgot-your-password {
  display: block;
  margin: 16px auto;
  color: #1a73e8;
  font-weight: 500;
  background: transparent;
  border: none;
}
</style>