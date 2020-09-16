<template>
  <div v-else class="container">
    <p>Hey there! Please log in to continue to Twitter.</p>
    <button @click="goToLogin()">Login</button>
  </div>
</template>

<script>
import {provideGetUserUseCase} from "../../di/provideGetUserUseCase"

export default {
  data() {
    return {
      isSignedIn: provideGetUserUseCase().run() != null
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/login")
    }
  }
}
</script>