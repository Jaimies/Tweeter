<template>
  <BaseForm :isLoading="isLoading" :isValid="!$v.$invalid" @submit="login">
    <template #heading>Login to Tweeter</template>
    <template #submitBtn>Login</template>

    <BaseInput v-model="email" type="email" label="Email" :validation="$v.email" :error="emailError"/>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password" :validation="$v.password" :error="passwordError"/>

    <RouterLink tag="button" :to="{name: 'reset-password'}" class="forgot-your-password" type="button">
      Forgot your password?
    </RouterLink>
  </BaseForm>
</template>

<script>
import BaseInput from "../../components/ui/Input"
import BaseForm from "../../components/ui/Form"
import {provideLoginUseCase} from "@/di/provideUseCases"
import {LoginResult} from "@/domain/repository/AuthRepository"
import {email, required} from "vuelidate/lib/validators"

const login = provideLoginUseCase()

export default {
  components: {BaseForm, BaseInput},
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
      if (this.loginResult == LoginResult.UserNotFound) return "Couldn't find an account with that email address."
      if(this.loginResult == LoginResult.TooManyAttempts) return "Too many failed login attempts. Please wait and try again."
      if (!this.$v.email.$error) return null
      if (!this.$v.email.email) return "Please enter a valid email"
    },
    passwordError() {
      if (this.loginResult == LoginResult.WrongPassword) return "Wrong password. Try again or click Forgot password to reset it."
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