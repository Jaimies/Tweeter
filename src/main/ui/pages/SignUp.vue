<template>
  <BaseForm :isLoading="isLoading" :isValid="!$v.$invalid" @submit="signUp">
    <template #heading>Signup to Tweeter</template>
    <template #submitBtn>Sign up</template>

    <BaseInput v-model="email" label="Email" type="email" :validation="$v.email" :error="emailError"/>
    <BaseInput v-model="username" label="Username" :validation="$v.username" :error="usernameError" />
    <BaseInput v-model="name" label="Name" autocomplete="name"/>

    <BaseInput v-model="password"
               label="Password"
               type="password"
               autocomplete="new-password"
               :error="passwordError"
               :validation="$v.password" />
  </BaseForm>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {User} from "@/domain/model/User"
import {email, minLength, required} from "vuelidate/lib/validators"
import {provideSignUpUseCase} from "@/di/provideUseCases"

const signUp = provideSignUpUseCase()

export default {
  components: {BaseForm, BaseInput},
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
      const user = new User("", this.username, this.name, this.email, "", [])
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
      if (!this.$v.email.email) return "Please enter a valid email"
      if (!this.$v.email.isUnique) return "This email is already in use"
    },
    usernameError() {
      if (!this.$v.username.$error) return null
      if (!this.$v.username.isUnique) return "This username is already in use"
    },
    passwordError() {
      if (!this.$v.password.$error) return null
      if (!this.$v.password.minLength) return "The password must contain at least 8 characters"
    },
  },
}
</script>
