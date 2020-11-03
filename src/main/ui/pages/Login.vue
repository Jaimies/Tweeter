<template>
  <BaseForm :isValid="isFormValid" @submit="login" v-if="!isLoading">
    <template #heading>Login to Twitter</template>
    <template #submitBtn>Login</template>

    <p v-if="wrongCredentials" class="error">
      Seems like you've entered an incorrect email or password
    </p>

    <BaseInput v-model="credential" type="email" label="Email"/>
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
    credential: null,
    password: null,
    wrongCredentials: false,
    isLoading: false
  }),
  computed: {
    isFormValid() {
      return !!this.credential && !!this.password
    }
  },
  methods: {
    async login() {
      this.isLoading = true
      const loginResult = await login.login(this.credential, this.password)
      if (loginResult == LoginResult.WrongPassword)
        this.showErrorMessage()
      else
        this.navigateOnSuccess()
    },

    navigateOnSuccess() {
      this.$router.push("/home")
      location.reload()
    },

    showErrorMessage() {
      this.isLoading = false
      this.wrongCredentials = true
    }
  }
}
</script>
