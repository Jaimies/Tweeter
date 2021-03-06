<template>
  <BaseForm @submit="login">
    <PageTitle>Login to Tweeter</PageTitle>

    <BaseInput v-model="email" type="email" label="Email" :validation="$v.email" :error="emailError"/>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password" :validation="$v.password" :error="passwordError"/>

    <SubmitButton :isLoading="isLoading" :isValid="!$v.$invalid">Login</SubmitButton>

    <ForgotPasswordButton class="mt-4"/>
  </BaseForm>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {provideLoginUseCase} from "@/di/provideUseCases"
import {LoginResult} from "@/domain/repository/AuthRepository"
import {email, required} from "vuelidate/lib/validators"
import {Strings} from "@/ui/Strings"
import PageTitle from "@/ui/components/ui/PageTitle"
import SubmitButton from "@/ui/components/ui/SubmitButton"
import ForgotPasswordButton from "@/ui/components/ui/ForgotPasswordButton"

const login = provideLoginUseCase()

export default {
  components: {ForgotPasswordButton, SubmitButton, PageTitle, BaseForm, BaseInput},
  data: () => ({
    email: "",
    password: "",
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
  },
  computed: {
    emailError() {
      if (this.loginResult == LoginResult.UserNotFound) return Strings.userNotFound
      if (this.loginResult == LoginResult.TooManyAttempts) return Strings.tooManyAttempts
      if (!this.$v.email.$error) return null
      if (!this.$v.email.email) return Strings.emailInvalid
    },
    passwordError() {
      if (this.loginResult == LoginResult.WrongPassword) return Strings.wrongPassword
    },
  }
}
</script>
