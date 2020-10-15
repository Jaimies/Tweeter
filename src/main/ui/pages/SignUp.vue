<template>
  <BaseForm :isValid="!$v.$invalid" @submit="signUp">
    <template #heading>Signup to Twitter</template>
    <template #submitBtn>Sign up</template>

    <BaseInput v-model="email" label="Email" type="email">
      <p class="error" v-if="!$v.email.isUnique">Email has already been taken.</p>
      <p class="error" v-else-if="!$v.email.email">Please enter a valid email.</p>
    </BaseInput>

    <BaseInput v-model="username" label="Username">
      <p class="error" v-if="!$v.username.isUnique">Username has already been taken.</p>
    </BaseInput>

    <BaseInput v-model="name" label="Name" autocomplete="name"/>

    <BaseInput v-model="password" label="Password" type="password" autocomplete="new-password"/>
    <BaseInput v-model="confirmPassword" label="Confirm password" type="password" autocomplete="new-password">
      <p class="error" v-if="!$v.confirmPassword.sameAsPassword">Passwords do not match.</p>
    </BaseInput>
  </BaseForm>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {User} from "@/domain/model/User"
import {email, minLength, required, sameAs} from "vuelidate/lib/validators"
import {provideSignUpUseCase} from "@/di/provideUseCases"

const signUp = provideSignUpUseCase()

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
      isUnique: value => signUp.isEmailAvailable(value)
    },
    username: {
      required,
      isUnique: value => signUp.isUserIdAvailable(value)
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
      signUp.run(user, this.password)
    },

    navigateHome() {
      this.$router.push("/home")
      location.reload()
    }
  }
}
</script>
