<template>
  <BaseForm @submit="signUp">
    <PageTitle>Signup to Tweeter</PageTitle>

    <BaseInput v-model="email" label="Email" type="email" :validation="$v.email" :error="emailError"/>
    <BaseInput v-model="username" label="Username" :validation="$v.username" :error="usernameError"/>
    <BaseInput v-model="name" label="Name" autocomplete="name"/>

    <BaseInput v-model="password"
               label="Password"
               type="password"
               autocomplete="new-password"
               :error="passwordError"
               :validation="$v.password"/>
    <SubmitButton :isLoading="isLoading" :isValid="!$v.$invalid">Sign up</SubmitButton>
  </BaseForm>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {User} from "@/domain/model/User"
import {email, minLength, required} from "vuelidate/lib/validators"
import {provideSignUpUseCase} from "@/di/provideUseCases"
import {Strings} from "@/ui/Strings"
import PageTitle from "@/ui/components/ui/PageTitle"
import SubmitButton from "@/ui/components/ui/SubmitButton"

const signUp = provideSignUpUseCase()

export default {
  components: {SubmitButton, PageTitle, BaseForm, BaseInput},
  data: () => ({
    email: "",
    username: "",
    name: "",
    password: "",
    isLoading: false
  }),

  validations: {
    email: {
      email,
      required,
      isUnique(value) {
        if (!this.$v.email.$dirty) return true
        return signUp.isEmailAvailable(value)
      }
    },
    username: {
      required,
      isUnique(value) {
        if (!this.$v.username.$dirty) return true
        return signUp.isUsernameAvailable(value)
      }
    },
    password: {required, minLength: minLength(8)}
  },
  methods: {
    async signUp() {
      if (!this.$v.$invalid) {
        this.isLoading = true
        await this.createUser()
        this.navigateHome()
      }
    },

    createUser() {
      const user = new User("", this.username, this.name, this.email)
      return signUp.run(user, this.password)
    },

    navigateHome() {
      this.$router.push("/home")
      location.reload()
    }
  },
  computed: {
    emailError() {
      if (!this.$v.email.$error) return null
      if (!this.$v.email.email) return Strings.emailInvalid
      if (!this.$v.email.isUnique) return Strings.emailTaken
    },
    usernameError() {
      if (!this.$v.username.$error) return null
      if (!this.$v.username.isUnique) return Strings.usernameTaken
    },
    passwordError() {
      if (!this.$v.password.$error) return null
      if (!this.$v.password.minLength) return Strings.passwordTooShort
    },
  },
}
</script>
