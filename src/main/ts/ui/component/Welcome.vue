<template>
  <div class="container">
    <p>Hey there! Please login or sign up to continue to Twitter.</p>
    <div>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </div>
  </div>
</template>

<script>
import {provideGetUserUseCase} from "../../di/provideGetUserUseCase"

export default {
  data() {
    return {
      isSignedIn: provideGetUserUseCase().run() != null
    }
  }
}
</script>