<template>
  <div class="container">
    <p class="intro">Hey there! Please login or sign up to continue to Tweeter.</p>
    <div class="links">
      <RouterLink class="link" to="/login">Login</RouterLink>
      <RouterLink class="link" to="/signup">Sign Up</RouterLink>
    </div>
  </div>
</template>

<script>
import {provideGetUserUseCase} from "@/di/provideUseCases"

const user = provideGetUserUseCase().run()

export default {
  data() {
    return {
      isSignedIn: !!user
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  margin-bottom: 10px;
}

.links {
  display: flex;
  justify-content: center;
}

.container {
  text-align: center;
}

.link {
  display: block;
  width: 200px;
  margin-right: 10px;
  padding: 9px 0;
  text-align: center;
  border: 1px solid #000;
  border-radius: 100px;
  color: #000;
  text-decoration: none;

  &:hover, &:focus {
    background: #ddd;
  }
}
</style>
