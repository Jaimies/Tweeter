<template>
  <BaseForm @submit="sendPasswordResetEmail">
    <PageTitle>Reset your password</PageTitle>
    <BaseInput label="Email" type="email" v-model="email" :validation="$v.email" :error="emailError"/>
    <SubmitButton :isLoading="isLoading" :isValid="!$v.$invalid">Email me a recovery link</SubmitButton>
  </BaseForm>
</template>

<script>
import BaseForm from "@/ui/components/ui/Form"
import BaseInput from "@/ui/components/ui/Input"
import {email, required} from "vuelidate/lib/validators"
import {provideSendPasswordResetEmailUseCase} from "@/di/provideUseCases"
import {PasswordResetResult} from "@/domain/repository/AuthRepository"
import {Strings} from "@/ui/Strings"
import PageTitle from "@/ui/components/ui/PageTitle"
import SubmitButton from "@/ui/components/ui/SubmitButton"

const sendPasswordResetEmail = provideSendPasswordResetEmailUseCase()

export default {
  components: {SubmitButton, PageTitle, BaseForm, BaseInput},
  data() {
    return {
      email: "",
      isLoading: false,
      result: null,
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
      this.result = result
      if (result == PasswordResetResult.Success)
        this.navigateOnSuccess()
      else
        this.hideLoader()
    },

    navigateOnSuccess() {
      this.$router.push({name: "password-reset-email-sent"})
    },

    showLoader() {
      this.isLoading = true
    },

    hideLoader() {
      this.isLoading = false
    },
  },
  computed: {
    emailError() {
      if (this.result == PasswordResetResult.InternalError) return Strings.internalError
      if (!this.$v.email.$error) return null
      if (!this.$v.email.email) return Strings.emailInvalid
    }
  }
}
</script>
