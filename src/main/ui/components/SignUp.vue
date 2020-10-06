<template>
  <BaseForm :isValid="!$v.$invalid"
            buttonText="Sign up"
            headingText="Sign up to twitter"
            @submit="signUp">

    <BaseInput v-model="email" label="Email" type="email"/>
    <p class="error" v-if="!$v.email.isUnique">Email has already been taken.</p>
    <p class="error" v-else-if="!$v.email.email">Please enter a valid email.</p>

    <BaseInput v-model="username" label="Username"/>
    <p class="error" v-if="!$v.username.isUnique">Username has already been taken.</p>

    <BaseInput v-model="name" label="Name"/>

    <BaseInput v-model="password" label="Password" type="password"/>
    <BaseInput v-model="confirmPassword" label="Confirm password" type="password"/>
    <p class="error" v-if="!$v.confirmPassword.sameAsPassword">Passwords do not match.</p>
  </BaseForm>
</template>

<script>
import BaseInput from "../views/BaseInput"
import BaseForm from "../views/BaseForm"
import {User} from "../../domain/model/User"
import {email, minLength, required, sameAs} from "vuelidate/lib/validators"
import {provideCheckCredentialAvailabilityUseCase, provideSignUpUseCase} from "../../di/provideUseCases"

const checkAvailability = provideCheckCredentialAvailabilityUseCase()

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
    email: {
      email,
      required,
      isUnique: value => checkAvailability.isEmailAvailable(value)
    },
    username: {
      required,
      isUnique: value => checkAvailability.isUserIdAvailable(value)
    },
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
      const user = new User(this.username, this.name, this.email, "", [])
      provideSignUpUseCase().run(user, this.password)
    },

    navigateHome() {
      this.$router.push("/home")
      location.reload()
    }
  }
}
</script>
