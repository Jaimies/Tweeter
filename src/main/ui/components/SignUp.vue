<template>
  <BaseForm :isValid="!$v.$invalid" buttonText="Sign up"
            headingText="Sign up to twitter" @submit="signUp">
    <BaseInput v-model="email" label="Email" type="email"/>
    <BaseInput v-model="username" label="Username"/>
    <BaseInput v-model="name" label="Name"/>
    <BaseInput v-model="password" label="Password" type="password"/>
    <BaseInput v-model="confirmPassword" label="Confirm password" type="password"/>
  </BaseForm>
</template>

<script>
import BaseInput from "../views/BaseInput"
import BaseForm from "../views/BaseForm"
import {User} from "../../domain/model/User"
import {email, minLength, required, sameAs} from "vuelidate/lib/validators"
import {provideSignUpUseCase} from "../../di/provideUseCases"

export default {
  components: {BaseForm, BaseInput},
  data: () => ({
    email: null,
    username: null,
    name: null,
    password: null,
    confirmPassword: null
  }),

  validations: {
    email: {email, required},
    username: {required},
    password: {required, minLength: minLength(8)},
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    signUp() {
      if (!this.$v.$invalid) {
        this.createUser()
        this.navigateHome()
      }
    },

    createUser() {
      const user = new User(this.username, this.name, this.email)
      provideSignUpUseCase().run(user, this.password)
    },

    navigateHome() {
      this.$router.push("/home")
      location.reload()
    }
  }
}
</script>
