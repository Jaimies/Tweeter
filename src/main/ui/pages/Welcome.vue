<template>
  <div class="text-center pt-6">
    <h1>Welcome to Tweeter</h1>
    <p class="intro">Please login or sign up to continue.</p>
    <div class="links">
      <v-btn class="link" to="/login" block rounded>Login</v-btn>
      <v-btn class="link" to="/signup" block rounded>Sign Up</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  margin-bottom: 10px;
}

.links {
  width: 320px;
  margin: 5px auto 0;
}

.container {
  text-align: center;
}

.link {
  margin-top: 15px;
}
</style>
