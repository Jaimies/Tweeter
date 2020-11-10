<template>
  <BaseForm :isValid="isFormValid" @submit="login" v-if="!isLoading">
    <template #heading>Login to Tweeter</template>
    <template #submitBtn>Login</template>

    <p v-if="userNotFound" class="error">
      The user with this email was not found. Please double check and try again.
    </p>

    <p v-else-if="wrongCredentials" class="error">
      Seems like you've entered an incorrect email or password.
    </p>

    <p v-else-if="tooManyAttempts" class="error">
      Access to this account has been temporarily disabled due to many failed
      login attempts. Please try again later.
    </p>

    <BaseInput v-model="email" type="email" label="Email"/>
    <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password"/>
  </BaseForm>

  <Spinner v-else/>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {provideLoginUseCase} from "@/di/provideUseCases"
import {LoginResult} from "@/domain/repository/AuthRepository"
import Spinner from "@/ui/components/ui/Spinner"

const login = provideLoginUseCase()

export default {
  components: {Spinner, BaseForm, BaseInput},
  data: () => ({
    email: null,
    password: null,
    userNotFound: false,
    wrongCredentials: false,
    tooManyAttempts: false,
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
      this.hideErrors()
      this.performLogin()
    },

    navigateOnSuccess() {
      this.$router.push("/home")
      location.reload()
    },

    showErrorMessage(loginResult) {
      if (loginResult == LoginResult.UserNotFound)
        this.userNotFound = true
      else if (loginResult == LoginResult.WrongPassword)
        this.wrongCredentials = true
      else
        this.tooManyAttempts = true
    },

    showLoader() {
      this.isLoading = true
    },
    hideLoader() {
      this.isLoading = false
    },
    hideErrors() {
      this.userNotFound = false
      this.wrongCredentials = false
      this.tooManyAttempts = false
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
