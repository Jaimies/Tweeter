<template>
  <BaseForm :isValid="!$v.$invalid" @submit="signUp" v-if="!isLoading">
    <template #heading>Signup to Tweeter</template>
    <template #submitBtn>Sign up</template>

    <BaseInput v-model="email" label="Email" type="email" :validation="$v.email">
      <p class="error" v-if="!$v.email.email">Please enter a valid email.</p>
      <p class="error" v-else-if="!$v.email.isUnique">Email has already been taken.</p>
    </BaseInput>

    <BaseInput v-model="username" label="Username" :validation="$v.username">
      <p class="error" v-if="!$v.username.isUnique">Username has already been taken.</p>
    </BaseInput>

    <BaseInput v-model="name" label="Name" autocomplete="name"/>

    <BaseInput v-model="password"
               label="Password"
               type="password"
               autocomplete="new-password"
               :validation="$v.password">
      <p class="error" v-if="!$v.password.minLength">Password must be at least 8 characters long</p>
    </BaseInput>
  </BaseForm>

  <Spinner v-else/>
</template>

<script>
import BaseInput from "../components/ui/Input"
import BaseForm from "../components/ui/Form"
import {User} from "@/domain/model/User"
import {email, minLength, required} from "vuelidate/lib/validators"
import {provideSignUpUseCase} from "@/di/provideUseCases"
import Spinner from "@/ui/components/ui/Spinner"

const signUp = provideSignUpUseCase()

export default {
  components: {Spinner, BaseForm, BaseInput},
  data: () => ({
    email: null,
    username: null,
    name: null,
    password: null,
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
  }
}
</script>
