<template>
  <BaseForm :isValid="!$v.$invalid" @submit="sendPasswordResetEmail" v-if="!isLoading">
    <p class="error" v-if="showError">Something went wrong. Please try again.</p>

    <BaseInput label="Email" type="email" v-model="email" :validation="$v.email">
      <p class="error" v-if="!$v.email.email">Please enter a valid email.</p>
    </BaseInput>

    <template #submitBtn>Reset your password</template>
  </BaseForm>
  <Spinner v-else/>
</template>

<script>
import BaseForm from "@/ui/components/ui/Form"
import BaseInput from "@/ui/components/ui/Input"
import Spinner from "@/ui/components/ui/Spinner"
import {email, required} from "vuelidate/lib/validators"
import {provideSendPasswordResetEmailUseCase} from "@/di/provideUseCases"
import {PasswordResetResult} from "@/domain/repository/AuthRepository"

const sendPasswordResetEmail = provideSendPasswordResetEmailUseCase()

export default {
  components: {BaseForm, BaseInput, Spinner},
  data() {
    return {
      email: "",
      showError: false,
      isLoading: false,
    }
  },
  validations: {
    email: {email, required}
  },
  methods: {
    async sendPasswordResetEmail() {
      this.showLoader()
      const result = await sendPasswordResetEmail.run(this.email)
      this.handlePasswordResetResult(result)
    },

    handlePasswordResetResult(result) {
      if (result == PasswordResetResult.Success)
        this.navigateOnSuccess()
      else
        this.showErrorMessage()
    },

    navigateOnSuccess() {
      this.$router.push({name: "password-reset-email-sent"})
    },

    showErrorMessage() {
      this.hideLoader()
      this.showError = true
    },

    showLoader() {
      this.isLoading = true
    },

    hideLoader() {
      this.isLoading = false
    },
  }
}
</script>
